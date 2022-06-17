// core modules
// npm modules
import axios from "axios";
// internal modules
import sequelize from "../db";
import { Application, File, Movie, Task } from "../models";

/**
 * Extacts movie poster from movie Images array
 * Returns full address as string
 * @param {string} address
 * @param {Array} movieImages
 * @returns {string}
 */
const getMoviePoster = (address, movieImages) => {
  let poster = "";
  const posterImage = movieImages.filter(
    (image) => image.coverType === "poster"
  );
  if (posterImage[0] && posterImage[0].url) {
    poster = `${address}${posterImage[0].url}`;
  }
  return poster;
};

/**
 * Syncs Movies from Radarr instance in to Reseedarrs database
 * @param {object} radarr - Radarr instance from Application model
 * @param {object} task - Task instance to log details to
 * @returns {Array}
 */
const syncMoviesWithRadarrInstance = async (radarr, task) => {
  task.logger("add", {
    message: `Syncing Radarr Instance at address ${radarr.address}`,
  });

  const radarrMovies = await axios.get(`${radarr.address}/api/v3/movie`, {
    params: { apikey: radarr.apikey },
  });

  task.logger("add", {
    message: `Found ${radarrMovies.length} movies`,
  });

  // Rather than use bulkCreate() we save each movie individually.
  // bulkCreate() doesn't reliably return the actual state of the
  // rows that are trying to be upserted.
  // eslint-disable-next-line no-unused-vars
  const result = await sequelize.transaction(async (t) =>
    Promise.all(
      radarrMovies.data.map(async (radarrMovie) => {
        // Create new, or update existing movie
        const [movie] = await Movie.findOrCreate({
          where: {
            tmdbId: radarrMovie.tmdbId,
          },
        });
        movie.title = radarrMovie.title;
        movie.poster = getMoviePoster(radarr.address, radarrMovie.images);
        await movie.save();

        // Link this movie with this radarr instance through the file model.
        const [file] = await File.findOrCreate({
          where: {
            radarrMovieId: radarrMovie.id,
            MovieId: movie.id,
            ApplicationId: radarr.id,
          },
        });
        file.hasFile = radarrMovie.hasFile;
        await file.save();

        // Add the files data to the movie data
        // movie.dataValues.File = [file.dataValues];
        return movie;
      })
    )
  );

  return result;
};

/**
 * Syncs Movies from Radarr instances in to Reseedarrs database
 * Will either sync all radarr instances or one specified by radarrId param
 * @param {Object} options - Options Object
 * @param {string} radarrId
 * @param {Object} task
 * @returns {Array}
 */
const syncMovies = async (options = {}) => {
  const task = !options.task
    ? await Task.create({ description: "Sync movies" })
    : options.task;

  const findOptions = { raw: true };

  if (options.radarrId) {
    findOptions.where = { id: options.radarrId };
  }

  task.logger("add", {
    message: `Finding Radarr instances with ${JSON.stringify(findOptions)}`,
  });

  const radarrInstances = await Application.findAll(findOptions);

  task.logger("add", {
    message: `Found ${radarrInstances.length} Radarr Instances`,
  });

  return Promise.all(
    radarrInstances.map(async (radarrInstance) => {
      await syncMoviesWithRadarrInstance(radarrInstance, task);
    })
  );
};

const MovieService = {
  syncMovies,
};

export default MovieService;

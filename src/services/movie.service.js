// core modules
// npm modules
import axios from "axios";
// internal modules
import sequelize from "../db";
import { Application, File, Movie } from "../models";

const syncMoviesWithRadarrInstance = async (radarr) => {
  const radarrMovies = await axios.get(`${radarr.address}/movie`, {
    params: { apikey: radarr.apikey },
  });

  // Rather than use bulkCreate() we save each movie individually.
  // bulkCreate() doesn't reliably return the actual state of the
  // rows that are trying to be upserted.
  // eslint-disable-next-line no-unused-vars
  const result = await sequelize.transaction(async (t) =>
    Promise.all(
      radarrMovies.map(async (radarrMovie) => {
        // Create new, or update existing movie
        const [movie] = await Movie.findOrCreate({
          where: {
            tmdbId: radarrMovie.tmdbId,
          },
        });
        movie.title = radarrMovie.title;
        movie.poster = radarr.address;
        movie.poster += radarrMovie.images.filter(
          (image) => image.coverType === "poster"
        )[0].url;
        await movie.save();

        // Link this movie with this radarr instance through the file model.
        const [file] = await File.findOrCreate({
          where: {
            MovieId: movie.id,
            ApplicationId: radarr.id,
          },
        });
        file.hasFile = radarrMovie.hasFile;
        await file.save();

        // Add the files data to the movie data
        movie.dataValues.File = [file.dataValues];
        return movie;
      })
    )
  );

  return result;
};

/**
 * Syncs Movies from Radarr instances in to Reseedarrs database
 * @returns Array
 */
const syncMovies = async (radarrId = null) => {
  const options = { raw: true };

  if (radarrId) {
    options.where = { id: radarrId };
  }

  const radarrInstances = await Application.findAll(options);

  return Promise.all(
    radarrInstances.map(async (radarrInstance) => {
      await syncMoviesWithRadarrInstance(radarrInstance);
    })
  );
};

const MovieService = {
  syncMovies,
  syncMoviesWithRadarrInstance,
};

export default MovieService;

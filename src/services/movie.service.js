// core modules
// npm modules
import axios from "axios";
// internal modules
import { Movie, Application } from "../models";

/**
 * Syncs Movies from Radarr instances in to Reseedarrs database
 * @returns Array
 */
const syncMovies = async () => {
  const radarrInstances = await Application.findAll({
    raw: true,
  });

  const movies = [];

  await Promise.all(
    radarrInstances.map(async (radarrInstance) => {
      const radarrInstanceMovies = await axios.get(
        `${radarrInstance.address}/movie`,
        { params: { apikey: radarrInstance.apikey } }
      );
      movies.push(
        ...radarrInstanceMovies.map((radarrInstanceMovie) => ({
          title: radarrInstanceMovie.title,
          tmdbId: radarrInstanceMovie.tmdbId,
        }))
      );
    })
  );

  return Movie.bulkCreate(movies);
};

const MovieService = {
  syncMovies,
};

export default MovieService;
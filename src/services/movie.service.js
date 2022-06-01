// core modules
// npm modules
import axios from "axios";
// internal modules
import { Movie, Radarr } from "../models";

const syncMovies = async () => {
  const radarrInstances = await Radarr.findAll({
    where: { type: "radarr" },
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

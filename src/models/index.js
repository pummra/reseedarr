import File from "./file.model";
import Movie from "./movie.model";
import Radarr from "./radarr.model";
import Torrent from "./torrent.model";

File.belongsTo(Movie);
File.hasMany(Torrent);

Movie.hasMany(File);
Movie.belongsTo(Radarr);

Radarr.hasMany(Movie);

Torrent.belongsTo(File);

export { File, Movie, Radarr, Torrent };

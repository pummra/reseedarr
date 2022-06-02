import File from "./file.model";
import Movie from "./movie.model";
import Application from "./application.model";
import Torrent from "./torrent.model";

Application.hasMany(Movie);

File.belongsTo(Movie);
File.hasMany(Torrent);

Movie.hasMany(File);
Movie.belongsTo(Application);

Torrent.belongsTo(File);

export { Application, File, Movie, Torrent };

import Application from "./application.model";
import File from "./file.model";
import Movie from "./movie.model";
import Torrent from "./torrent.model";

Application.belongsToMany(Movie, { through: File });
Application.hasMany(File);

File.belongsTo(Application);
File.belongsTo(Movie);
File.hasMany(Torrent);

Movie.belongsToMany(Application, { through: File });
Movie.hasMany(File);

Torrent.belongsTo(File);

export { Application, File, Movie, Torrent };

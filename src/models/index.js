import App from "./app.model";
import File from "./file.model";
import Movie from "./movie.model";
import Torrent from "./torrent.model";

App.hasMany(File);

File.belongsTo(App);
File.belongsTo(Movie);
File.hasMany(Torrent);

Movie.hasMany(File);

Torrent.belongsTo(File);

export { App, File, Movie, Torrent };

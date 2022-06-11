// core modules

// npm modules
import { defineFeature, loadFeature } from "jest-cucumber";
import axios from "axios";

// internal modules
import { Application, File, Movie } from "../../../src/models";
import MovieService from "../../../src/services/movie.service";
import radarrGetMovieResponse from "../../fixtures/radarr_responses/get_movie.json";

jest.mock("axios");
jest.mock("../../../src/db");
jest.spyOn(Movie, "findOrCreate");
jest.spyOn(File, "findOrCreate");
jest.spyOn(Application, "findAll");

const feature = loadFeature("./specs/features/services/movie.service.feature");

afterEach(() => {
  jest.clearAllMocks();
});

defineFeature(feature, (test) => {
  test("Movie data is collected from single Radarr instance", ({
    given,
    and,
    when,
    then,
  }) => {
    given(
      "there is at least one Radarr instance saved to the App model",
      () => {
        Application.$queueResult([
          {
            id: "111",
            type: "radarr",
            address: "http://127.0.0.1",
            apiKey: "123",
          },
        ]);
      }
    );

    and("the Radarr instance is available", () => {
      axios.get.mockResolvedValueOnce(radarrGetMovieResponse);
    });

    when("the movie data is synced with Reseedar", async () => {
      await MovieService.syncMovies();
    });

    then("the data is saved to the model", () => {
      expect(Movie.findOrCreate).toHaveBeenCalledTimes(5);
      expect(Movie.findOrCreate.mock.calls).toEqual([
        [{ where: { tmdbId: 19913 } }],
        [{ where: { tmdbId: 8329 } }],
        [{ where: { tmdbId: 10664 } }],
        [{ where: { tmdbId: 333371 } }],
        [{ where: { tmdbId: 76203 } }],
      ]);
    });

    and("a file is saved to the database for each movie", () => {
      expect(File.findOrCreate).toHaveBeenCalledTimes(5);
    });
  });

  test("Movie data is collected from multiple Radarr instances", ({
    given,
    and,
    when,
    then,
  }) => {
    given("there is two Radarr instances saved to the App model", () => {
      Application.$queueResult([
        {
          id: "111",
          type: "radarr",
          address: "http://127.0.0.1",
          apiKey: "123",
        },
        {
          id: "222",
          type: "radarr",
          address: "http://127.0.0.1",
          apiKey: "123",
        },
      ]);
    });

    and("the Radarr instances are available", () => {
      axios.get.mockResolvedValueOnce(radarrGetMovieResponse);
      axios.get.mockResolvedValueOnce(radarrGetMovieResponse);
    });

    when("the movie data is synced with Reseedar", async () => {
      await MovieService.syncMovies();
    });

    then("the data is saved to the model", () => {
      expect(Movie.findOrCreate).toHaveBeenCalledTimes(10);
      expect(Movie.findOrCreate.mock.calls).toEqual([
        [{ where: { tmdbId: 19913 } }],
        [{ where: { tmdbId: 8329 } }],
        [{ where: { tmdbId: 10664 } }],
        [{ where: { tmdbId: 333371 } }],
        [{ where: { tmdbId: 76203 } }],
        [{ where: { tmdbId: 19913 } }],
        [{ where: { tmdbId: 8329 } }],
        [{ where: { tmdbId: 10664 } }],
        [{ where: { tmdbId: 333371 } }],
        [{ where: { tmdbId: 76203 } }],
      ]);
    });

    and("a file is saved to the database for each movie", () => {
      expect(File.findOrCreate).toHaveBeenCalledTimes(10);
    });
  });

  test("Movie data is collected from a specific Radarr instances", ({
    given,
    and,
    when,
    then,
  }) => {
    given("there is a Radarr instance saved to the App model", () => {
      Application.$queueResult([
        {
          id: "111",
          type: "radarr",
          address: "http://127.0.0.1",
          apiKey: "123",
        },
      ]);
    });

    and("the Radarr instance is available", () => {
      axios.get.mockResolvedValueOnce(radarrGetMovieResponse);
    });

    when("the movie data is synced with Reseedar", async () => {
      await MovieService.syncMovies(111);
    });

    then("the data is saved to the model", () => {
      expect(Movie.findOrCreate).toHaveBeenCalledTimes(5);
      expect(Movie.findOrCreate.mock.calls).toEqual([
        [{ where: { tmdbId: 19913 } }],
        [{ where: { tmdbId: 8329 } }],
        [{ where: { tmdbId: 10664 } }],
        [{ where: { tmdbId: 333371 } }],
        [{ where: { tmdbId: 76203 } }],
      ]);
    });

    and("a file is saved to the database for each movie", () => {
      expect(File.findOrCreate).toHaveBeenCalledTimes(5);
    });

    and("the right Radarr instance was found in the database", () => {
      expect(Application.findAll).toHaveBeenCalledWith(
        expect.objectContaining({ where: { id: 111 } })
      );
    });
  });
});

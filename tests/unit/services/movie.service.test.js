// core modules

// npm modules
import { defineFeature, loadFeature } from "jest-cucumber";
import axios from "axios";

// internal modules
import { Movie, Radarr } from "../../../src/models";
import MovieService from "../../../src/services/movie.service";
import radarrGetMovieResponse from "../../fixtures/radarr_responses/get_movie.json";

jest.mock("axios");
jest.mock("../../../src/models");
jest.spyOn(Movie, "bulkCreate");

const feature = loadFeature("./specs/features/services/movie.service.feature");

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
        Radarr.findAll.mockResolvedValueOnce([
          {
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

    then("the relevant data will be extracted from the Radarr API", () => {
      expect(Movie.bulkCreate).toBeCalledWith([
        { title: "(500) Days of Summer", tmdbId: 19913 },
        { title: "[REC]", tmdbId: 8329 },
        { title: "[REC]²", tmdbId: 10664 },
        { title: "10 Cloverfield Lane", tmdbId: 333371 },
        { title: "12 Years a Slave", tmdbId: 76203 },
      ]);
    });

    and("saved to the movie model", () => {});
  });
});

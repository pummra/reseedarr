Feature: Movie Services

Scenario: Movie data is collected from single Radarr instance
    Given there is at least one Radarr instance saved to the App model
    And the Radarr instance is available
    When the movie data is synced with Reseedar
    Then the data is saved to the model
    And a file is saved to the database for each movie

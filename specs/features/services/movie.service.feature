Feature: Movie Services

Scenario: Movie data is collected from single Radarr instance
    Given there is at least one Radarr instance saved to the App model
    And the Radarr instance is available
    When the movie data is synced with Reseedar
    Then the data is saved to the model
    And a file is saved to the database for each movie

Scenario: Movie data is collected from multiple Radarr instances
    Given there is two Radarr instances saved to the App model
    And the Radarr instances are available
    When the movie data is synced with Reseedar
    Then the data is saved to the model
    And a file is saved to the database for each movie

Scenario: Movie data is collected from a specific Radarr instances
    Given there is a Radarr instance saved to the App model
    And the Radarr instance is available
    When the movie data is synced with Reseedar
    Then the data is saved to the model
    And a file is saved to the database for each movie
    And the right Radarr instance was found in the database

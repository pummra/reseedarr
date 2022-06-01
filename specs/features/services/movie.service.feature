Feature: Movie Services

Scenario: Movie data is collected from single Radarr instance
    Given there is at least one Radarr instance saved to the App model
    And the Radarr instance is available
    When the movie data is synced with Reseedar
    Then the relevant data will be extracted from the Radarr API
    And saved to the movie model

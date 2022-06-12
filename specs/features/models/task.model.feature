Feature: Task Modek

Scenario: Adding a new log message
    Given there is a task instance
    When I add a log message
    Then it should be added the instance
    And if I add another message
    Then it should also be added
    
Scenario: Getting the last log message
    Given there is a task instance
    And there is messages on the task
    When I get the latest message
    Then it should be returned

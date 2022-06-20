// core modules

// npm modules
import { defineFeature, loadFeature } from "jest-cucumber";
import sequelize from "../../../api/db";

// internal modules
import { Task } from "../../../api/models";

const feature = loadFeature("./specs/features/models/task.model.feature");

beforeEach(async () => {
  await sequelize.sync({ force: true });
});

defineFeature(feature, (test) => {
  test("Adding a new log message", ({ given, when, then, and }) => {
    let task;
    given("there is a task instance", async () => {
      task = await Task.create({ description: "New task" });
    });

    when("I add a log message", async () => {
      await task.logger("add", "This is my first log");
    });

    then("it should be added the instance", () => {
      expect(task.log.length).toBe(1);
      expect(task.log).toMatchObject([
        {
          message: "This is my first log",
        },
      ]);
    });

    and("if I add another message", async () => {
      await task.logger("add", { message: "This is my second log" });
    });

    then("it should also be added", () => {
      expect(task.log.length).toBe(2);
      expect(task.log).toMatchObject([
        {
          message: "This is my first log",
        },
        {
          message: "This is my second log",
        },
      ]);
    });
  });

  test("Getting the last log message", ({ given, and, when, then }) => {
    let task;
    let message;
    given("there is a task instance", async () => {
      task = await Task.create({ description: "New task" });
    });

    and("there is messages on the task", async () => {
      await task.logger("add", "This is my first log");
      await task.logger("add", "This is my second log");
      await task.logger("add", "This is my third log");
    });

    when("I get the latest message", async () => {
      message = await task.logger("get");
    });

    then("it should be returned", () => {
      expect(message).toMatchObject({ message: "This is my third log" });
    });
  });
});

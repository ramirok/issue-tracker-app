import bugModel from "../Models/bugModel";
import { Bug } from "../utils/types";

export const retrieveBugs = () => {
  let data: Bug[] = [];
  data.push(
    bugModel({
      _id: 23456789,
      name: "Crash on load",
      details: "Crashes after 3 seconds",
      steps: "Open application and it will crash",
      version: "V2.0",
      assigned: "Ramiro Krupoviesa",
      creator: "John Doe",
      priority: 1,
      time: "23:38",
    })!,
    bugModel({
      _id: 23456789,
      name: "Wont load",
      details: "Crashes after 3 seconds",
      steps: "Open application and it will crash",
      version: "V2.0",
      assigned: "Ramiro Krupoviesa",
      creator: "John Doe",
      priority: 3,
      time: "23:38",
    })!
  );

  let sorted = data.sort((a, b) => a.priority - b.priority);
  return sorted;
};

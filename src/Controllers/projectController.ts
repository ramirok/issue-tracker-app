import projectModel from "../Models/projectModel";
import { Project } from "../utils/types";

export const retrieveProjects = () => {
  let data: Project[] = [];
  data.push(
    projectModel({
      _id: "234567891",
      projectName: "Google Messages App",
      createdAt: "1613484855555",
      companyName: "Google Inc.",
      tags: ["WEB", "PWA", "REACT"],
      members: [],
      completed: false,
    })!,
    projectModel({
      _id: "234567892",
      projectName: "Snap Filters",
      createdAt: "1614953645000",
      companyName: "Snapchat Co.",
      tags: ["IOS", "UI/UX"],
      members: [],
      completed: false,
    })!,
    projectModel({
      _id: "234567893",
      projectName: "Coinz Trading APIs",
      createdAt: "1614743645000",
      companyName: "Coinz Company",
      tags: ["NODE", "JS", "BACKEND", "MONGO"],
      members: [],
      completed: false,
    })!
  );

  return data;
};

export const createNewProject = (project: Project): Project => {
  return projectModel(project)!;
};

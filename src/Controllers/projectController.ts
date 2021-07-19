import projectModel from "../Models/projectModel";
import { Project } from "../utils/types";

export const retrieveProjects = () => {
  let data: Project[] = [];
  data.push(
    projectModel({
      _id: 234567891,
      name: "Google Messages App",
      time: "1613484845000",
      companyName: "Google Inc.",
      tags: ["WEB", "PWA", "REACT"],
    })!,
    projectModel({
      _id: 234567892,
      name: "Snap Filters",
      time: "1614953645000",
      companyName: "Snapchat Co.",
      tags: ["IOS", "UI/UX"],
    })!,
    projectModel({
      _id: 234567893,
      name: "Coinz Trading APIs",
      time: "1614743645000",
      companyName: "Coinz Company",
      tags: ["NODE", "JS", "BACKEND", "MONGO"],
    })!
  );

  return data;
};

export const createNewProject = (project: Project): Project => {
  return projectModel(project)!;
};

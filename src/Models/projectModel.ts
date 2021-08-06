import { Project } from "../utils/types";

function project(project: Project | null): Project | null {
  if (project === undefined || project === null) {
    return null;
  }
  return {
    _id: project._id,
    projectName: project.projectName,
    createdAt: project.createdAt,
    companyName: project.companyName,
    tags: project.tags,
    members: [],
    completed: false,
  };
}

export default project;

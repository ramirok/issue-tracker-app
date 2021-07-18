import { Project } from "../utils/types";

function project(project: Project | null): Project | null {
  if (project === undefined || project === null) {
    return null;
  }
  return {
    _id: project._id,
    name: project.name,
    time: project.time,
    companyName: project.companyName,
    tags: project.tags,
  };
}

export default project;

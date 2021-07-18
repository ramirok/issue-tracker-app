import { Bug } from "../utils/types";

function bug(bug: Bug | null): Bug | null {
  if (bug === undefined || bug === null) {
    return null;
  }
  return {
    _id: bug._id,
    name: bug.name,
    details: bug.details,
    steps: bug.steps,
    version: bug.version,
    priority: bug.priority,
    assigned: bug.assigned,
    creator: bug.creator,
    time: bug.time,
  };
}

export default bug;

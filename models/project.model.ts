import * as mongoose from "mongoose";

export interface Project {
  projectName: string;
  companyName: string;
  tags: string[];
  owner: string;
  membersId: string[];
  members?: any;
  completed: boolean;
}

const projectSchema = new mongoose.Schema<Project>(
  {
    projectName: { type: String, required: true },
    companyName: { type: String, required: true },
    tags: { type: [String], required: true },
    owner: { type: String, required: true },
    membersId: [{ type: String }],
    completed: { type: Boolean, required: true, default: false },
  },
  { timestamps: true, toObject: { virtuals: true } }
);

projectSchema.virtual("members", {
  ref: "User",
  localField: "membersId",
  foreignField: "user_id",
  justOne: false,
});

projectSchema.set("toJSON", { virtuals: true });

// const ProjectModel = mongoose.model<Project>("Project", projectSchema);

// export default ProjectModel;

export default mongoose.models.Project ||
  mongoose.model<Project>("Project", projectSchema);

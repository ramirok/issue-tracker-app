import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Project } from "../../utils/types";
import { retrieveProjects } from "../projectController";

const slice = createSlice({
  name: "project",
  initialState: [] as Project[],
  reducers: {
    getProjects: (_state: Project[]) => retrieveProjects(),
    createProject: (_state, _action: PayloadAction<Project>) => {},
    updateProject: (_state, _action: PayloadAction<Project>) => {},
    markProjectComplete: (state, action: PayloadAction<Project>) => {
      return (state = state.filter(
        (project) => project._id !== action.payload._id
      ));
    },
  },
});

export default slice.reducer;
export const {
  getProjects,
  createProject,
  updateProject,
  markProjectComplete,
} = slice.actions;

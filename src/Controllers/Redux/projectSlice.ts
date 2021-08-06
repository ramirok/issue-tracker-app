import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { Project, User } from "../../utils/types";

const slice = createSlice({
  name: "project",
  initialState: { loading: true, projects: [] as Project[] },
  reducers: {
    projectsLoading: (state, _action: PayloadAction) => {
      if (state.loading === false) {
        state.loading = true;
      }
    },
    projectsReceived: (state, action: PayloadAction<Project[]>) => {
      if (state.loading === true) {
        state.loading = false;
        state.projects = [...state.projects, ...action.payload];
        state.projects.sort((x, y) => {
          return x.completed === y.completed ? 0 : x.completed ? 1 : -1;
        });
      }
    },
    projectCreating: (state, _action: PayloadAction) => {
      if (state.loading === false) {
        state.loading = true;
      }
    },
    projectCreated: (state, action: PayloadAction<Project>) => {
      if (state.loading === true) {
        state.loading = false;
        state.projects.push(action.payload);
      }
    },
    projectUpdated: (state, action: PayloadAction<Project>) => {
      if (state.loading) {
        state.loading = false;
        const updatedProjectIndex = state.projects.findIndex(
          (project) => project._id === action.payload._id
        );
        state.projects[updatedProjectIndex] = action.payload;
        state.projects.sort((x, y) => {
          return x.completed === y.completed ? 0 : x.completed ? 1 : -1;
        });
      }
    },
    projectDeleted: (state, action: PayloadAction<Project>) => {
      if (state.loading) {
        state.loading = false;
        state.projects = state.projects.filter(
          (project) => project._id !== action.payload._id
        );
      }
    },
  },
});

export default slice.reducer;

const fetchProjects = (token: string) => async (dispatch: Dispatch) => {
  dispatch(slice.actions.projectsLoading());
  const response = await fetch("http://localhost:3001/projects", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const parsedResponse = await response.json();
  dispatch(slice.actions.projectsReceived(parsedResponse.projects));
};

const createProject = async (
  dispatch: Dispatch,
  token: string,
  data: {
    projectName: string;
    companyName: string;
    tags: string[];
    members: User[];
  }
) => {
  const members = data.members.map((member) => member.user_id);
  dispatch(slice.actions.projectCreating());
  const response = await fetch("http://localhost:3001/projects", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      projectName: data.projectName,
      companyName: data.companyName,
      tags: data.tags,
      members: members,
    }),
  });
  const parsedResponse = await response.json();
  dispatch(slice.actions.projectCreated(parsedResponse.data));
};

const completeProject = async (
  dispatch: Dispatch,
  token: string,
  data: { completed: boolean; _id: string }
) => {
  dispatch(slice.actions.projectCreating());
  const response = await fetch("http://localhost:3001/projects", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      completed: data.completed,
      _id: data._id,
    }),
  });
  const parsedResponse = await response.json();
  dispatch(slice.actions.projectUpdated(parsedResponse.data));
};

const editProject = async (
  dispatch: Dispatch,
  token: string,
  data: {
    _id: string;
    members: User[];
    projectName: string;
    companyName: string;
    tags: string[];
  }
) => {
  const members = data.members.map((member) => member.user_id);
  dispatch(slice.actions.projectCreating());
  const response = await fetch("http://localhost:3001/projects", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _id: data._id,
      members,
      projectName: data.projectName,
      companyName: data.companyName,
      tags: data.tags,
    }),
  });
  const parsedResponse = await response.json();
  dispatch(slice.actions.projectUpdated(parsedResponse.data));
};

const deleteProject = async (
  dispatch: Dispatch,
  token: string,
  data: { _id: string }
) => {
  dispatch(slice.actions.projectsLoading());
  const response = await fetch("http://localhost:3001/projects", {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _id: data._id,
    }),
  });
  const parsedResponse = await response.json();
  dispatch(slice.actions.projectDeleted(parsedResponse.data));
};

export {
  fetchProjects,
  createProject,
  completeProject,
  editProject,
  deleteProject,
};

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { retrieveBugs } from "../bugController";
import { Bug } from "../../utils/types";

const slice = createSlice({
  name: "bug",
  initialState: [] as Bug[],
  reducers: {
    getBugs: (_state: Bug[]) => retrieveBugs(),
    createBugs: (_state, _action: PayloadAction<Bug>) => {},
    updateBugs: (_state, _action: PayloadAction<Bug>) => {},
    markComplete: (_state, _action: PayloadAction<Bug>) => {},
  },
});

export default slice.reducer;
export const { getBugs, createBugs, updateBugs, markComplete } = slice.actions;

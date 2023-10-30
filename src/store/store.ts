import { createReducer, configureStore } from "@reduxjs/toolkit";

import { TrackElement } from "../models/TrackElement";
import { gridSizes } from "../consts";
import { Option } from "../components/shared/Option";
import { setGridSize } from "./actions";

const reducer = {
  gridSize: createReducer(gridSizes[1], (builder) => {
    builder.addCase(setGridSize, (_, action) => action.payload);
  }),
};

export interface IRootState {
  gridSize: Option;
  items: TrackElement[];
}

const preloadedState: IRootState = {
  gridSize: gridSizes[1],
  items: [],
};

export const store = configureStore({
  reducer,
  preloadedState,
});

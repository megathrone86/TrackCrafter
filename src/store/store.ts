import { createReducer, configureStore } from "@reduxjs/toolkit";

import { TrackElementModel } from "../models/TrackElementModel";
import { gridSizes } from "../consts";
import { Option } from "../components/shared/Option";
import { setGridSize } from "./actions";
import { ConeColor, ConeModel } from "../models/ConeModel";

//TODO: debug
const defaultItems = [new ConeModel(ConeColor.Red)];

const reducer = {
  gridSize: createReducer(gridSizes[1], (builder) => {
    builder.addCase(setGridSize, (_, action) => action.payload);
  }),
  items: createReducer<TrackElementModel[]>(defaultItems, () => {}),
};

export interface IRootState {
  gridSize: Option;
  items: TrackElementModel[];
}

const preloadedState: IRootState = {
  gridSize: gridSizes[1],
  items: defaultItems,
};

export const store = configureStore({
  reducer,
  preloadedState,
});

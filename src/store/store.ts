import { createReducer, configureStore } from "@reduxjs/toolkit";

import { TrackElementModel } from "../models/TrackElementModel";
import { gridSizes } from "../consts";
import { Option } from "../components/shared/Option";
import {
  setAddingItem,
  setAddingItemMapPosition,
  setAddingItemScreenPosition,
  setCamPos,
  setGridSize,
} from "./actions";
import { ConeColor, createConeModel } from "../models/ConeModel";
import { Point } from "../components/shared/Point";

export interface AddingItem {
  model: TrackElementModel;
  screenPos?: Point;
  mapPos?: Point;
}

export interface CamPosition extends Point {}

export interface IRootState {
  gridSize: Option<number>;
  items: TrackElementModel[];
  addingItem: AddingItem | null;
  camPos: CamPosition;
}

const preloadedState: IRootState = {
  gridSize: gridSizes[3],
  items: [createConeModel(ConeColor.Red)], //TODO: debug
  addingItem: null,
  camPos: { x: 0, y: 0 },
};

const reducer = {
  gridSize: createReducer(preloadedState.gridSize, (builder) => {
    builder.addCase(setGridSize, (_, action) => action.payload);
  }),
  items: createReducer<TrackElementModel[]>(preloadedState.items, () => {}),
  addingItem: createReducer(preloadedState.addingItem, (builder) => {
    builder.addCase(setAddingItem, (_, action) => action.payload);
    builder.addCase(setAddingItemScreenPosition, (prevValue, action) =>
      prevValue ? { ...prevValue, screenPos: action.payload } : prevValue
    );
    builder.addCase(setAddingItemMapPosition, (prevValue, action) =>
      prevValue
        ? {
            ...prevValue,
            model: { ...prevValue.model, ...action.payload },
            screenPos: undefined,
          }
        : prevValue
    );
  }),
  camPos: createReducer(preloadedState.camPos, (builder) => {
    builder.addCase(setCamPos, (_, action) => action.payload);
  }),
};

export const store = configureStore({
  reducer,
});

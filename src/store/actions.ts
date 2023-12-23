import { createAction } from "@reduxjs/toolkit";
import { Option } from "../components/shared/Option";
import { Point } from "../components/shared/Point";
import { AddingItem, CamPosition } from "./store";
import { TrackElementModel } from "../models/TrackElementModel";

export const setCamPos = createAction<CamPosition>("setCamPos");
export const setGridSize = createAction<Option<number>>("setGridSize");
export const setAddingItem = createAction<AddingItem | null>("setAddingItem");
export const setAddingItemScreenPosition = createAction<Point>(
  "setAddingItemScreenPosition"
);
export const setAddingItemMapPosition = createAction<Point>(
  "setAddingItemMapPosition"
);
export const addItem = createAction<TrackElementModel>("addItem");
export const setSelection = createAction<TrackElementModel>("setSelection");

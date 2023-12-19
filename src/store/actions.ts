import { createAction } from "@reduxjs/toolkit";
import { Option } from "../components/shared/Option";
import { Point } from "../components/shared/Point";
import { AddingItem, CamPosition } from "./store";

export const setCamPos = createAction<CamPosition>("setCamPos");
export const setGridSize = createAction<Option<number>>("setGridSize");
export const setAddingItem = createAction<AddingItem | null>("setAddingItem");
export const setAddingItemScreenPosition = createAction<Point>(
  "setAddingItemScreenPosition"
);
export const setAddingItemMapPosition = createAction<Point>(
  "setAddingItemMapPosition"
);
export const addItem = createAction("addItem");

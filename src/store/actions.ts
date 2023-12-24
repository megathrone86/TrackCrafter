import { createAction } from "@reduxjs/toolkit";
import { Option } from "../components/shared/Option";
import { Point } from "../components/shared/Point";
import { AddingItem, CamPosition, MapBaseItem } from "./store";

export const setCamPos = createAction<CamPosition>("setCamPos");
export const setGridSize = createAction<Option<number>>("setGridSize");
export const setAddingItem = createAction<AddingItem | null>("setAddingItem");
export const setAddingItemScreenPosition = createAction<Point>(
  "setAddingItemScreenPosition"
);
export const setAddingItemMapPosition = createAction<Point>(
  "setAddingItemMapPosition"
);
export const addItem = createAction<MapBaseItem>("addItem");
export const setSelection = createAction<{
  item: MapBaseItem;
  isAdditive: boolean;
}>("setSelection");
export const moveItems =
  createAction<{ item: MapBaseItem; newPos: Point }[]>("moveItems");

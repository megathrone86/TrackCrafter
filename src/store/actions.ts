import { createAction } from "@reduxjs/toolkit";
import { IOption } from "../components/shared/IOption";
import { IPoint } from "../components/shared/IPoint";
import { IAddingItem, ICamPosition, IMapBaseItem } from "./store";

export const setCamPos = createAction<ICamPosition>("setCamPos");
export const setGridSize = createAction<IOption<number>>("setGridSize");
export const setAddingItem = createAction<IAddingItem | null>("setAddingItem");
export const setAddingItemScreenPosition = createAction<IPoint>(
  "setAddingItemScreenPosition"
);
export const setAddingItemMapPosition = createAction<IPoint>(
  "setAddingItemMapPosition"
);
export const addItem = createAction<IMapBaseItem>("addItem");
export const setSelection = createAction<{
  item: IMapBaseItem;
  switchMode: boolean;
  additiveMode: boolean;
}>("setSelection");
export const setSelectedAll = createAction("setSelectedAll");
export const moveItems =
  createAction<{ item: IMapBaseItem; newPos: IPoint }[]>("moveItems");
export const deleteItems = createAction<IMapBaseItem[]>("deleteItems");

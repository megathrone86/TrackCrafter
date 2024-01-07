import { createAction } from "@reduxjs/toolkit";
import { IOption } from "../components/shared/IOption";
import { IPoint } from "../components/shared/IPoint";
import { IAddingItem, ICamPosition, IMapBaseItem } from "./store";

export interface ISetSelectionPayload {
  item: IMapBaseItem;
  switchMode: boolean;
  additiveMode: boolean;
}
export interface IMoveItemsPayload {
  item: IMapBaseItem;
  newPos: IPoint;
}

export interface IUpdateItemFieldPayload {
  item: IMapBaseItem;
  propName: string;
  propValue: unknown;
}

export const setCamPos = createAction<ICamPosition>("setCamPos");
export const setGridSize = createAction<IOption<number>>("setGridSize");
export const setFileName = createAction<string>("setFileName");
export const setAddingItem = createAction<IAddingItem | null>("setAddingItem");
export const setAddingItemScreenPosition = createAction<IPoint>(
  "setAddingItemScreenPosition"
);
export const setAddingItemHidden = createAction<boolean>("setAddingItemHidden");
export const setAddingItemMapPosition = createAction<IPoint>(
  "setAddingItemMapPosition"
);
export const addItem = createAction<IMapBaseItem>("addItem");
export const setSelection = createAction<ISetSelectionPayload>("setSelection");
export const setSelectedAll = createAction("setSelectedAll");
export const moveItems = createAction<IMoveItemsPayload[]>("moveItems");
export const deleteItems = createAction<IMapBaseItem[]>("deleteItems");
export const replaceItems = createAction<IMapBaseItem[]>("replaceItems");
export const updateItemModelField = createAction<IUpdateItemFieldPayload>(
  "updateItemModelField"
);

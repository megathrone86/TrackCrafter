import { createAction } from "@reduxjs/toolkit";
import { Option } from "../components/shared/Option";
import { Point } from "../components/shared/Point";
import { AddingItem } from "./store";

export const setGridSize = createAction<Option>("setGridSize");
export const setAddingItem = createAction<AddingItem | null>("setAddingItem");
export const setAddingItemPosition = createAction<Point>(
  "setAddingItemPosition"
);

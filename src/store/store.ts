import {
  createReducer,
  configureStore,
  combineReducers,
} from "@reduxjs/toolkit";

import { TrackElementModel } from "../models/TrackElementModel";
import { gridSizes } from "../consts";
import { Option } from "../components/shared/Option";
import {
  addItem,
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
  camPos: CamPosition;
  track: {
    items: TrackElementModel[];
    addingItem: AddingItem | null;
  };
}

const preloadedState: IRootState = {
  camPos: { x: 0, y: 0 },
  gridSize: gridSizes[3],
  track: {
    items: [createConeModel(ConeColor.Red)], //TODO: debug
    addingItem: null,
  },
};

createReducer(preloadedState, (builder) => {});

const reducer = combineReducers({
  camPos: createReducer(preloadedState.camPos, (builder) => {
    builder.addCase(setCamPos, (_, action) => action.payload);
  }),
  gridSize: createReducer(preloadedState.gridSize, (builder) => {
    builder.addCase(setGridSize, (_, action) => action.payload);
  }),
  //TODO: пришлось объединить в один редьюсер, чтобы можно было добавлять addingItem в items по окончанию перетаскивания. Нужно как-то переделать по-человечески, а то читаемость нулевая
  track: createReducer(preloadedState.track, (builder) => {
    builder.addCase(addItem, (prevValue, action) => ({
      ...prevValue,
      items: prevValue.addingItem
        ? prevValue.items.concat([prevValue.addingItem.model])
        : prevValue.items,
    }));
    builder.addCase(setAddingItem, (prevValue, action) => ({
      ...prevValue,
      addingItem: action.payload,
    }));
    builder.addCase(setAddingItemScreenPosition, (prevValue, action) =>
      prevValue
        ? {
            ...prevValue,
            addingItem: prevValue.addingItem
              ? {
                  model: { ...prevValue.addingItem?.model, x: 0, y: 0 },
                  screenPos: action.payload,
                }
              : null,
          }
        : prevValue
    );
    builder.addCase(setAddingItemMapPosition, (prevValue, action) =>
      prevValue
        ? {
            ...prevValue,
            addingItem: prevValue.addingItem
              ? {
                  model: { ...prevValue.addingItem.model, ...action.payload },
                  screenPos: undefined,
                }
              : null,
          }
        : prevValue
    );
  }),
});

export const store = configureStore({
  reducer,
});

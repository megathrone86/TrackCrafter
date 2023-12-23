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
  setSelection,
} from "./actions";
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
    selection: TrackElementModel[];
    addingItem: AddingItem | null;
  };
}

const preloadedState: IRootState = {
  camPos: { x: 0, y: 0 },
  gridSize: gridSizes[3],
  track: {
    items: [],
    selection: [],
    addingItem: null,
  },
};

const reducer = combineReducers({
  camPos: createReducer(preloadedState.camPos, (builder) => {
    builder.addCase(setCamPos, (_, action) => action.payload);
  }),
  gridSize: createReducer(preloadedState.gridSize, (builder) => {
    builder.addCase(setGridSize, (_, action) => action.payload);
  }),
  track: combineReducers({
    items: createReducer(preloadedState.track.items, (builder) => {
      builder.addCase(addItem, (prevValue, action) =>
        prevValue.concat([action.payload])
      );
    }),
    selection: createReducer(preloadedState.track.selection, (builder) => {
      builder.addCase(setSelection, (_, action) => {
        const selection = [action.payload];

        //TODO: добавить поддержку выделения по ctrl и shift
        // if (prevValue.includes(this.element))

        //TODO: добавить поддержку выделения рамкой (на далекое будущее)
        return selection;
      });
    }),
    addingItem: createReducer(preloadedState.track.addingItem, (builder) => {
      builder.addCase(setAddingItem, (_, action) => action.payload);
      builder.addCase(setAddingItemScreenPosition, (prevValue, action) =>
        prevValue
          ? {
              model: { ...prevValue.model, x: 0, y: 0 },
              screenPos: action.payload,
            }
          : null
      );
      builder.addCase(setAddingItemMapPosition, (prevValue, action) =>
        prevValue
          ? {
              model: { ...prevValue.model, ...action.payload },
              screenPos: undefined,
            }
          : null
      );
    }),
  }),
});

export const store = configureStore({
  reducer,
});

export function newItemIdSelector(state: IRootState): string {
  const itemNumber = state.track.items.length + 1;
  return itemNumber.toString();
}

import {
  createReducer,
  configureStore,
  combineReducers,
  current,
} from "@reduxjs/toolkit";

import { TrackElementModel } from "../models/TrackElementModel";
import { gridSizes } from "../consts";
import { Option } from "../components/shared/Option";
import {
  addItem,
  moveItems,
  setAddingItem,
  setAddingItemMapPosition,
  setAddingItemScreenPosition,
  setCamPos,
  setGridSize,
  setSelection,
} from "./actions";
import { Point } from "../components/shared/Point";

export interface AddingItem extends MapItem<TrackElementModel> {
  screenPos?: Point;
  mapPos?: Point;
}

export interface MapItem<T> {
  //модель, которая сохраняется в файл
  model: T;

  //временные свойства, используемые для работы
  uid: string;
  selected: boolean;
}

export interface MapBaseItem extends MapItem<TrackElementModel> {}

export interface CamPosition extends Point {}

export interface IRootState {
  gridSize: Option<number>;
  camPos: CamPosition;
  track: {
    items: MapBaseItem[];
    addingItem: AddingItem | null;
  };
}

const preloadedState: IRootState = {
  camPos: { x: 0, y: 0 },
  gridSize: gridSizes[3],
  track: {
    items: [],
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
        current(prevValue)
          .map((t) => ({ ...t, selected: false }))
          .concat([{ ...action.payload, selected: true }])
      );
      builder.addCase(setSelection, (prevValue, action) => {
        const items = current(prevValue);
        if (action.payload.additiveMode) {
          return items.map((t) => {
            if (action.payload.item.model === t.model) {
              return { ...t, selected: true };
            } else {
              return t;
            }
          });
        } else if (action.payload.switchMode) {
          return items.map((t) => {
            if (action.payload.item.model === t.model) {
              return { ...t, selected: !t.selected };
            } else {
              return t;
            }
          });
        } else {
          return items.map((t) => {
            return { ...t, selected: action.payload.item.model === t.model };
          });
        }
      });
      builder.addCase(moveItems, (prevValue, action) =>
        current(prevValue).map((t) => {
          const movedItem = action.payload.find((m) => m.item.uid === t.uid);
          if (movedItem) {
            return {
              ...t,
              model: {
                ...t.model,
                x: movedItem.newPos.x,
                y: movedItem.newPos.y,
              },
            };
          } else {
            return t;
          }
        })
      );
    }),
    addingItem: createReducer(preloadedState.track.addingItem, (builder) => {
      builder.addCase(setAddingItem, (_, action) => action.payload);
      builder.addCase(setAddingItemScreenPosition, (prevValue, action) =>
        prevValue
          ? {
              ...prevValue,
              model: { ...prevValue.model, x: 0, y: 0 },
              screenPos: action.payload,
            }
          : null
      );
      builder.addCase(setAddingItemMapPosition, (prevValue, action) =>
        prevValue
          ? {
              ...prevValue,
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

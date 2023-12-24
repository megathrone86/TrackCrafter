import {
  createReducer,
  configureStore,
  combineReducers,
  current,
} from "@reduxjs/toolkit";

import { TrackElementModel as ITrackElementModel } from "../models/ITrackElementModel";
import { gridSizes } from "../consts";
import { IOption } from "../components/shared/IOption";
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
import { IPoint } from "../components/shared/IPoint";

export interface IAddingItem extends IMapItem<ITrackElementModel> {
  screenPos?: IPoint;
  mapPos?: IPoint;
}

export interface IMapItem<T> {
  //модель, которая сохраняется в файл
  model: T;

  //временные свойства, используемые для работы
  uid: string;
  selected: boolean;
}

export interface IMapBaseItem extends IMapItem<ITrackElementModel> {}

export interface ICamPosition extends IPoint {}

export interface IRootState {
  gridSize: IOption<number>;
  camPos: ICamPosition;
  track: {
    items: IMapBaseItem[];
    addingItem: IAddingItem | null;
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

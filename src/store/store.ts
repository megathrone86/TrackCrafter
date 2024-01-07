import {
  createReducer,
  configureStore,
  combineReducers,
  current,
} from "@reduxjs/toolkit";

import { ITrackElementModel } from "../models/ITrackElementModel";
import { gridSizes } from "../consts";
import { IOption } from "../components/shared/IOption";
import {
  addItem,
  deleteItems,
  moveItems,
  replaceItems,
  setAddingItem,
  setAddingItemHidden,
  setAddingItemMapPosition,
  setAddingItemScreenPosition,
  setCamPos,
  setFileName,
  setGridSize,
  setSelectedAll,
  setSelection,
  updateItemModelField,
} from "./actions";
import { IPoint } from "../components/shared/IPoint";
import { trackService } from "../services/TrackService";

export interface IAddingItem extends IMapItem<ITrackElementModel> {
  screenPos?: IPoint;
  mapPos?: IPoint;
  hidden?: boolean;
}

export interface IMapItem<T> {
  //модель, которая сохраняется в файл
  model: T;

  //временные свойства, используемые для работы
  selected: boolean;
}

export interface IMapBaseItem extends IMapItem<ITrackElementModel> {}

export interface ICamPosition extends IPoint {}

export interface IRootState {
  gridSize: IOption<number>;
  camPos: ICamPosition;
  track: {
    fileName: string;
    items: IMapBaseItem[];
    addingItem: IAddingItem | null;
  };
}

const preloadedState: IRootState = {
  camPos: { x: 0, y: 0 },
  gridSize: gridSizes[2],
  track: {
    fileName: "",
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
    fileName: createReducer(preloadedState.track.fileName, (builder) => {
      builder.addCase(setFileName, (_, action) => action.payload);
    }),
    items: createReducer(preloadedState.track.items, (builder) => {
      builder.addCase(addItem, (prevValue, action) =>
        current(prevValue)
          .map((t) => ({ ...t, selected: false }))
          .concat([{ ...action.payload, selected: true }])
      );
      builder.addCase(replaceItems, (_, action) => action.payload);
      builder.addCase(setSelectedAll, (prevValue, _) =>
        current(prevValue).map((t) => ({ ...t, selected: true }))
      );
      builder.addCase(deleteItems, (prevValue, action) =>
        trackService.remove(current(prevValue), action.payload)
      );
      builder.addCase(setSelection, (prevValue, action) =>
        trackService.setSelection(current(prevValue), action.payload)
      );
      builder.addCase(moveItems, (prevValue, action) =>
        trackService.moveItems(current(prevValue), action.payload)
      );
      builder.addCase(updateItemModelField, (prevValue, action) =>
        trackService.updateModelField(current(prevValue), action.payload)
      );
    }),
    addingItem: createReducer(preloadedState.track.addingItem, (builder) => {
      builder.addCase(setAddingItem, (_, action) => action.payload);
      builder.addCase(setAddingItemScreenPosition, (prevValue, action) =>
        prevValue
          ? {
              ...prevValue,
              model: { ...prevValue.model, x: 0, y: 0 },
              hidden: false,
              screenPos: action.payload,
            }
          : null
      );
      builder.addCase(setAddingItemHidden, (prevValue, action) =>
        prevValue
          ? {
              ...prevValue,
              hidden: action.payload,
            }
          : null
      );
      builder.addCase(setAddingItemMapPosition, (prevValue, action) =>
        prevValue
          ? {
              ...prevValue,
              model: { ...prevValue.model, ...action.payload },
              hidden: false,
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

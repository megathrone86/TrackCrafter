import { createId, createUid } from "../helpers/bl-helper";
import { store } from "../store/store";
import { ITrackElementModel, TrackElementType } from "./ITrackElementModel";

export enum LineColor {
  Red = "Red",
  Blue = "Blue",
  Orange = "Orange",
  Gray = "Gray",
}

export enum LineStyle {
  Solid = "Solid",
  Dashed = "Dashed",
}

export interface ILineModel extends ITrackElementModel {
  startUid: string;
  endUid: string;
  color: LineColor;
  style: LineStyle;
}

export function createLineModel(
  start: ITrackElementModel,
  end: ITrackElementModel
): ILineModel {
  return {
    type: TrackElementType.Line,
    x: 0,
    y: 0,
    id: createId(store.getState().track.items.map((t) => t.model)),
    uid: createUid(),
    startUid: start.uid,
    endUid: end.uid,
    color: LineColor.Gray,
    style: LineStyle.Solid,
  };
}

export const lineColorNames = {
  [LineColor.Red]: "Красный",
  [LineColor.Blue]: "Синий",
  [LineColor.Orange]: "Оранжевый",
  [LineColor.Gray]: "Серый",
};

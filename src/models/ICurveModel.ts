import { createNewItemId, createUid } from "../helpers/bl-helper";
import { LineColor } from "./ILineModel";
import { ITrackElementModel, TrackElementType } from "./ITrackElementModel";

export interface ICurvePointModel extends ITrackElementModel {}

export interface ICurveModel extends ITrackElementModel {
  color: LineColor;
  points: ICurvePointModel[];
}

export function createCurvePointModel(): ICurvePointModel {
  return {
    type: TrackElementType.CurvePoint,
    x: 0,
    y: 0,
    id: createNewItemId(),
    uid: createUid(),
  };
}

export function createCurveModel(): ICurveModel {
  return {
    type: TrackElementType.Curve,
    x: 0,
    y: 0,
    id: createNewItemId(),
    uid: createUid(),
    color: LineColor.Gray,
    points: [],
  };
}

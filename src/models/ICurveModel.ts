import { createId, createUid } from "../helpers/bl-helper";
import { store } from "../store/store";
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
    id: createId([]),
    uid: createUid(),
  };
}

//TODO: возможно стоит принимать points здесь
export function createCurveModel(): ICurveModel {
  return {
    type: TrackElementType.Curve,
    x: 0,
    y: 0,
    id: createId(store.getState().track.items.map((t) => t.model)),
    uid: createUid(),
    color: LineColor.Gray,
    points: [],
  };
}

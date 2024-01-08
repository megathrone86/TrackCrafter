import { IPoint } from "../components/shared/IPoint";
import { createId, createUid } from "../helpers/bl-helper";

export enum TrackElementType {
  Unknown = "",
  Cone = "Cone",
  Line = "Line",
  CurvePoint = "CurvePoint",
  Curve = "Curve",
}

export interface ITrackElementModel extends IPoint {
  //тип элемента
  type: TrackElementType;

  //текстовый id
  id: string;

  //уникальный id для внутреннего использования
  uid: string;
}

export function cloneTrackElementModel(
  src: ITrackElementModel,
  items: ITrackElementModel[]
): ITrackElementModel {
  return { ...src, uid: createUid(), id: createId(items) };
}

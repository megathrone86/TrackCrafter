import { createNewItemId } from "../helpers/bl-helper";
import {
  TrackElementModel as ITrackElementModel,
  TrackElementType,
} from "./ITrackElementModel";

export enum ConeColor {
  Red = "Red",
  Blue = "Blue",
  Yellow = "Yellow",
}

export interface IConeModel extends ITrackElementModel {
  color: ConeColor;
}

export function createConeModel(color: ConeColor): IConeModel {
  return {
    type: TrackElementType.Cone,
    color,
    x: 0,
    y: 0,
    id: createNewItemId(),
  };
}
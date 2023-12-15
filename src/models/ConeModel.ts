import { TrackElementModel, TrackElementType } from "./TrackElementModel";

export enum ConeColor {
  Red = "Red",
  Blue = "Blue",
  Yellow = "Yellow",
}

export interface ConeModel extends TrackElementModel {
  x: number;
  y: number;

  color: ConeColor;
}

export function createConeModel(color: ConeColor): ConeModel {
  return {
    type: TrackElementType.Cone,
    color,
    x: 0,
    y: 0,
  };
}

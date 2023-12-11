import { TrackElementModel, TrackElementType } from "./TrackElementModel";

export enum ConeColor {
  Red = "Red",
  Blue = "Blue",
  Yellow = "Yellow",
}

export class ConeModel extends TrackElementModel {
  public get type(): TrackElementType {
    return TrackElementType.Cone;
  }

  x: number = 0;
  y: number = 0;

  color: ConeColor;

  constructor(color: ConeColor) {
    super();

    this.color = color;
  }
}

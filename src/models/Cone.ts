import { TrackElement } from "./TrackElement";

export enum ConeColor {
  Red = "Red",
  Blue = "Blue",
  Yellow = "Yellow",
}

export class Cone extends TrackElement {
  x: number = 0;
  y: number = 0;

  color: ConeColor = ConeColor.Red;
}

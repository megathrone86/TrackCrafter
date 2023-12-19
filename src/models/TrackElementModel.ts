import { Point } from "../components/shared/Point";

export enum TrackElementType {
  Unknown = "",
  Cone = "Cone",
}

export interface TrackElementModel extends Point {
  //тип элемента
  type: TrackElementType;

  //текстовый id
  id: string;
}

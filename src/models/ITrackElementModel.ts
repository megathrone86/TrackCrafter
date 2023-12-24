import { IPoint } from "../components/shared/IPoint";

export enum TrackElementType {
  Unknown = "",
  Cone = "Cone",
}

export interface TrackElementModel extends IPoint {
  //тип элемента
  type: TrackElementType;

  //текстовый id
  id: string;
}

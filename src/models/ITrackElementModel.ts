import { IPoint } from "../components/shared/IPoint";

export enum TrackElementType {
  Unknown = "",
  Cone = "Cone",
  Line = "Line",
}

export interface TrackElementModel extends IPoint {
  //тип элемента
  type: TrackElementType;

  //текстовый id
  id: string;

  //уникальный id для внутреннего использования
  uid: string;
}

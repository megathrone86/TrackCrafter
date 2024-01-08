import { createId, createUid } from "../helpers/bl-helper";
import { store } from "../store/store";
import { ITrackElementModel, TrackElementType } from "./ITrackElementModel";

export enum ConeColor {
  Red = "Red",
  Blue = "Blue",
  Yellow = "Yellow",
  Orange = "Orange",
  RedYellow = "RedYellow",
  BlueYellow = "BlueYellow",
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
    id: createId(store.getState().track.items.map((t) => t.model)),
    uid: createUid(),
  };
}

export const coneColorNames = {
  [ConeColor.Red]: "Красный",
  [ConeColor.Blue]: "Синий",
  [ConeColor.Yellow]: "Желтый",
  [ConeColor.Orange]: "Оранжевый",
  [ConeColor.RedYellow]: "Красно-желтый",
  [ConeColor.BlueYellow]: "Сине-желтый",
};

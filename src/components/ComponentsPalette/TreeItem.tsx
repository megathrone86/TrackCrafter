import { ConeModel } from "../../models/ConeModel";
import { TrackElementType } from "../../models/TrackElementModel";
import { IBaseTrackElementProps } from "../DrawArea/elements/IModelProps";
import "./TreeItem.scss";

export function TreeItem(props: IBaseTrackElementProps) {
  const model = props.model;
  switch (model.type) {
    case TrackElementType.Cone:
      return getCone(model as ConeModel);
    default:
      return <div>Неизвестный элемент ({model.type})</div>;
  }
}

function getCone(model: ConeModel) {
  return <div style={{ color: model.color }}>Конус {model.id}</div>;
}

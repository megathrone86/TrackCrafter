import { TrackElementType } from "../../../../models/TrackElementModel";
import { Cone } from "../Cone/Cone";
import { ConeModel } from "../../../../models/ConeModel";
import "./BaseItem.scss";
import { IBaseTrackElementProps, ITrackElementProps } from "../IModelProps";

export function BaseItem(props: IBaseTrackElementProps) {
  switch (props.item.model.type) {
    case TrackElementType.Cone:
      return <Cone {...castProps<ConeModel>()} />;
    default:
      return <p>Unknown type: {props.item.model.type}</p>;
  }

  function castProps<T>() {
    return props as ITrackElementProps<T>;
  }
}

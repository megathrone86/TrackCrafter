import { TrackElementType } from "../../../../models/ITrackElementModel";
import { Cone } from "../Cone/Cone";
import { IConeModel } from "../../../../models/IConeModel";
import "./BaseItem.scss";
import { IBaseTrackElementProps, ITrackElementProps } from "../IModelProps";

export function BaseItem(props: IBaseTrackElementProps) {
  switch (props.item.model.type) {
    case TrackElementType.Cone:
      return <Cone {...castProps<IConeModel>()} />;
    default:
      return <p>Unknown type: {props.item.model.type}</p>;
  }

  function castProps<T>() {
    return props as ITrackElementProps<T>;
  }
}

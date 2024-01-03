import { TrackElementType } from "../../../../models/ITrackElementModel";
import { Cone } from "../Cone/Cone";
import { IConeModel } from "../../../../models/IConeModel";
import "./BaseItem.scss";
import { IBaseTrackElementProps, ITrackElementProps } from "../IModelProps";
import { ILineModel } from "../../../../models/ILineModel";
import { Line } from "../Line/Line";

export function BaseItem(props: IBaseTrackElementProps) {
  switch (props.item.model.type) {
    case TrackElementType.Cone:
      return <Cone {...castProps<IConeModel>()} />;
    case TrackElementType.Line:
      return <Line {...castProps<ILineModel>()} />;
    default:
      return <p>Unknown type: {props.item.model.type}</p>;
  }

  function castProps<T>() {
    return props as ITrackElementProps<T>;
  }
}

import { ConeColor, ConeModel } from "../../../../models/ConeModel";
import "./Cone.scss";
import { ITrackElementProps } from "../IModelProps";
import { useSelector } from "react-redux";
import { IRootState } from "../../../../store/store";

export function Cone(props: ITrackElementProps<ConeModel>) {
  const camPos = useSelector((state: IRootState) => state.camPos);

  return (
    <div className="tc-DrawArea-Cone" style={getStyle()}>
      <div
        className="tc-DrawArea-Cone-circle"
        style={{ background: GetConeColor(props.model) }}
      ></div>
    </div>
  );

  function getStyle() {
    return {
      left: props.model.x - camPos.x + "px",
      top: props.model.y - camPos.y + "px",
    };
  }
}

export function GetConeColor(model: ConeModel) {
  switch (model.color) {
    case ConeColor.Red:
      return "#ff0000";
    case ConeColor.Blue:
      return "#0000ff";
    case ConeColor.Yellow:
      return "#ff00ff";
  }
}

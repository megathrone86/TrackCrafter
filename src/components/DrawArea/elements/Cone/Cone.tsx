import { useState } from "react";
import { ConeColor, ConeModel } from "../../../../models/ConeModel";
import "./Cone.scss";
import { ITrackElementProps } from "../IModelProps";

export function Cone(props: ITrackElementProps<ConeModel>) {
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
      left: props.model.x - props.camPos.x + "px",
      top: props.model.y - props.camPos.y + "px",
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

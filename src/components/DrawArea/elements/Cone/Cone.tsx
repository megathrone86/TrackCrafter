import { ConeColor, ConeModel } from "../../../../models/ConeModel";
import "./Cone.scss";
import { ITrackElementProps } from "../IModelProps";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../../store/store";
import { pixelsToMeterRatio } from "../../DrawArea";
import { MapElementDragHelper } from "../MapElementDragHelper";
import { useRef, useState } from "react";

export function Cone(props: ITrackElementProps<ConeModel>) {
  const dispatch = useDispatch();

  const viewportRef = useRef(null);

  const [dragHelper] = useState(
    new MapElementDragHelper(dispatch, viewportRef, props.model)
  );

  const addingItem = useSelector((state: IRootState) => state.track.addingItem);
  const camPos = useSelector((state: IRootState) => state.camPos);

  const isSelected = useSelector(
    (state: IRootState) => state.track.selection
  ).includes(props.model);

  return (
    <div
      className="tc-DrawArea-Cone"
      style={getStyle()}
      ref={viewportRef}
      onPointerDown={(e) => dragHelper.handlePointerDown(e)}
    >
      <div
        className="tc-DrawArea-Cone-circle"
        style={{ background: GetConeColor(props.model) }}
      ></div>
      {isSelected && (
        <div className="tc-DrawArea-Cone-circle-selection tc-DrawArea-selection"></div>
      )}
    </div>
  );

  function getStyle() {
    const isScreenPositioned =
      addingItem?.screenPos && props.model === addingItem.model;
    if (!isScreenPositioned) {
      return {
        left: props.model.x * pixelsToMeterRatio - camPos.x + "px",
        top: props.model.y * pixelsToMeterRatio - camPos.y + "px",
      };
    }
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

import { ConeColor, ConeModel } from "../../../../models/ConeModel";
import "./Cone.scss";
import { ITrackElementProps } from "../IModelProps";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../../store/store";
import { MapElementDragHelper } from "../MapElementDragHelper";
import { useRef } from "react";
import { pixelsToMeterRatio } from "../../../../consts";
import { GeometryHelper } from "../../GeometryHelper";

export function Cone(props: ITrackElementProps<ConeModel>) {
  const dispatch = useDispatch();

  const viewportRef = useRef(null);

  const camPos = useSelector((state: IRootState) => state.camPos);
  const gridSize = useSelector((state: IRootState) => state.gridSize.value);
  const geometryHelper = new GeometryHelper(camPos, gridSize);

  const dragHelper = new MapElementDragHelper(
    dispatch,
    viewportRef,
    props.item,
    geometryHelper
  );

  const addingItem = useSelector((state: IRootState) => state.track.addingItem);

  const isSelected = props.item.selected;

  return (
    <div
      className="tc-DrawArea-Cone"
      style={getStyle()}
      ref={viewportRef}
      onPointerDown={(e) => dragHelper.handlePointerDown(e)}
    >
      <div
        className="tc-DrawArea-Cone-circle"
        style={{ background: GetConeColor(props.item.model) }}
      ></div>
      {isSelected && (
        <div className="tc-DrawArea-Cone-circle-selection tc-DrawArea-selection"></div>
      )}
    </div>
  );

  function getStyle() {
    const isScreenPositioned =
      addingItem?.screenPos && props.item.model === addingItem.model;
    if (!isScreenPositioned) {
      return {
        left: props.item.model.x * pixelsToMeterRatio - camPos.x + "px",
        top: props.item.model.y * pixelsToMeterRatio - camPos.y + "px",
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

import { ConeColor, IConeModel } from "../../../../models/IConeModel";
import "./Cone.scss";
import { ITrackElementProps } from "../IModelProps";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../../store/store";
import { MapElementDragHelper } from "../MapElementDragHelper";
import { useRef } from "react";
import { pixelsToMeterRatio } from "../../../../consts";
import { GeometryHelper } from "../../GeometryHelper";
import { geometryHelperSelector } from "../../../../store/shared-selectors";

export function Cone(props: ITrackElementProps<IConeModel>) {
  const dispatch = useDispatch();

  const viewportRef = useRef(null);

  const camPos = useSelector((state: IRootState) => state.camPos);

  const geometryHelper = new GeometryHelper(
    useSelector(geometryHelperSelector)
  );

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

export function GetConeColor(model: IConeModel) {
  switch (model.color) {
    case ConeColor.Red:
      return "#ff0000";
    case ConeColor.Blue:
      return "#0000ff";
    case ConeColor.Yellow:
      return "#ff00ff";
  }
}

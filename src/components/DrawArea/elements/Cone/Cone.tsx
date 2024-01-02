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
    useSelector(geometryHelperSelector.selector, geometryHelperSelector.equlity)
  );

  const coneWidth = geometryHelper.getGridCellSize() * 2;

  const dragHelper = new MapElementDragHelper(
    dispatch,
    viewportRef,
    props.item,
    geometryHelper
  );

  const addingItem = useSelector((state: IRootState) => state.track.addingItem);

  const isSelected = props.item.selected;

  const color = GetConeColor(props.item.model.color);
  const color2 = GetConeColor2(props.item.model.color);

  return (
    <div
      className="tc-DrawArea-Cone"
      style={getStyle()}
      ref={viewportRef}
      onPointerDown={(e) => dragHelper.handlePointerDown(e)}
    >
      <div className="tc-DrawArea-Cone-root">
        <div className="tc-DrawArea-Cone-circle" style={{ background: color }}>
          {color2 && (
            <div
              className="tc-DrawArea-Cone-inner-circle"
              style={{ background: color2 }}
            ></div>
          )}
        </div>
        {isSelected && (
          <div className="tc-DrawArea-Cone-circle-selection tc-DrawArea-selection"></div>
        )}
      </div>
    </div>
  );

  function getStyle() {
    let ret = {
      width: `${coneWidth}px`,
      height: `${coneWidth}px`,
    };

    const isScreenPositioned =
      addingItem?.screenPos && props.item.model === addingItem.model;
    if (!isScreenPositioned) {
      return {
        ...ret,
        left: props.item.model.x * pixelsToMeterRatio - camPos.x + "px",
        top: props.item.model.y * pixelsToMeterRatio - camPos.y + "px",
      };
    } else {
      return ret;
    }
  }
}

export function GetConeColor(color: ConeColor) {
  switch (color) {
    case ConeColor.Red:
      return "#ff0000";
    case ConeColor.RedYellow:
      return "#ff0000";
    case ConeColor.Blue:
      return "#0000ff";
    case ConeColor.BlueYellow:
      return "#0000ff";
    case ConeColor.Yellow:
      return "#ffe25a";
    case ConeColor.Orange:
      return "#ff8a09";
  }
}

export function GetConeColor2(color: ConeColor) {
  switch (color) {
    case ConeColor.RedYellow:
      return GetConeColor(ConeColor.Yellow);
    case ConeColor.BlueYellow:
      return GetConeColor(ConeColor.Yellow);
  }
}

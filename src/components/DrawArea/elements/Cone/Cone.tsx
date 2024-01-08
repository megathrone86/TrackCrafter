import "./Cone.scss";

import { ConeColor, IConeModel } from "../../../../models/IConeModel";
import { ITrackElementProps } from "../IModelProps";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../../store/store";
import { MapElementDragHelper } from "../MapElementDragHelper";
import { useRef } from "react";
import { GeometryHelper } from "../../GeometryHelper";
import { geometryHelperSelector } from "../../../../store/shared-selectors";

export function Cone(props: ITrackElementProps<IConeModel>) {
  const dispatch = useDispatch();

  const viewportRef = useRef(null);

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
  const isAdding = addingItem && props.item === addingItem;

  const isSelected = props.item.selected;

  const color = GetConeColor(props.item.model.color);
  const color2 = GetConeColor2(props.item.model.color);

  return (
    <div className={getClass()} style={getStyle()}>
      <div
        className="tc-DrawArea-Cone-root"
        ref={viewportRef}
        onPointerDown={(e) => dragHelper.handlePointerDown(e)}
      >
        <div
          className="tc-DrawArea-Cone-circle no-pointer-events"
          style={{ background: color }}
        >
          {color2 && (
            <div
              className="tc-DrawArea-Cone-inner-circle"
              style={{ background: color2 }}
            ></div>
          )}
        </div>
        {isSelected && (
          <div className="tc-DrawArea-Cone-circle-selection tc-DrawArea-circle-selection no-pointer-events"></div>
        )}
      </div>
    </div>
  );

  function getClass() {
    const ret = "tc-DrawArea-Cone";
    if (isAdding) {
      return `${ret} no-pointer-events`;
    } else {
      return ret;
    }
  }

  function getStyle() {
    let ret = {
      width: `${coneWidth}px`,
      height: `${coneWidth}px`,
    };

    const isScreenPositioned = isAdding && addingItem?.screenPos;
    if (isScreenPositioned) {
      return ret;
    } else {
      return {
        ...ret,
        left: geometryHelper.worldXToScreen(props.item.model.x) + "px",
        top: geometryHelper.worldYToScreen(props.item.model.y) + "px",
      };
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

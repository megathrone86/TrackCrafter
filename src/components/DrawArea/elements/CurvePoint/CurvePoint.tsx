import "./CurvePoint.scss";

import { ITrackElementProps } from "../IModelProps";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../../store/store";
import {
  CurvePointMapElementDragHelper,
  MapElementDragHelper,
} from "../MapElementDragHelper";
import { useRef } from "react";
import { GeometryHelper } from "../../GeometryHelper";
import { geometryHelperSelector } from "../../../../store/shared-selectors";
import { ICurvePointModel } from "../../../../models/ICurveModel";

export function CurvePoint(props: ITrackElementProps<ICurvePointModel>) {
  const dispatch = useDispatch();

  const viewportRef = useRef(null);

  const geometryHelper = new GeometryHelper(
    useSelector(geometryHelperSelector.selector, geometryHelperSelector.equlity)
  );

  const pointRadius = geometryHelper.getGridCellSize();

  const dragHelper = new CurvePointMapElementDragHelper(
    dispatch,
    viewportRef,
    props.item,
    geometryHelper
  );

  const addingItem = useSelector((state: IRootState) => state.track.addingItem);
  const isAdding = addingItem && props.item === addingItem;

  const isSelected = props.item.selected;

  const color = "#0000";

  return (
    <div key={props.item.model.uid} className={getClass()} style={getStyle()}>
      <div
        className={getRootClass()}
        ref={viewportRef}
        onPointerDown={(e) => dragHelper.handlePointerDown(e)}
      >
        <div
          className="tc-DrawArea-CurvePoint-circle no-pointer-events"
          style={{ background: color }}
        ></div>
        {isSelected && (
          <div className="tc-DrawArea-CurvePoint-circle-selection tc-DrawArea-circle-selection no-pointer-events"></div>
        )}
      </div>
    </div>
  );

  function getClass() {
    const ret = "tc-DrawArea-CurvePoint";
    if (isAdding) {
      if (addingItem.hidden) {
        return `${ret} no-pointer-events hidden`;
      } else {
        return `${ret} no-pointer-events`;
      }
    } else {
      return ret;
    }
  }

  function getRootClass() {
    const ret = "tc-DrawArea-CurvePoint-root";
    if (isAdding) {
      return `${ret} no-pointer-events`;
    } else {
      return ret;
    }
  }

  function getStyle() {
    let ret = {
      width: `${pointRadius}px`,
      height: `${pointRadius}px`,
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

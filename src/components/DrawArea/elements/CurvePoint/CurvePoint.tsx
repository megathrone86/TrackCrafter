import "./CurvePoint.scss";

import { ITrackElementProps } from "../IModelProps";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../../store/store";
import { MapElementDragHelper } from "../MapElementDragHelper";
import { useRef } from "react";
import { GeometryHelper } from "../../GeometryHelper";
import { geometryHelperSelector } from "../../../../store/shared-selectors";
import { ICurvePointModel } from "../../../../models/ICurveModel";
import { addItem, setAddingItem } from "../../../../store/actions";

export function CurvePoint(props: ITrackElementProps<ICurvePointModel>) {
  const dispatch = useDispatch();

  const viewportRef = useRef(null);

  const geometryHelper = new GeometryHelper(
    useSelector(geometryHelperSelector.selector, geometryHelperSelector.equlity)
  );

  const pointRadius = geometryHelper.getGridCellSize();

  const dragHelper = new MapElementDragHelper(
    dispatch,
    viewportRef,
    props.item,
    geometryHelper
  );

  const addingItem = useSelector((state: IRootState) => state.track.addingItem);

  const isSelected = props.item.selected;

  const color = "#0000";

  return (
    <div
      className="tc-DrawArea-CurvePoint"
      style={getStyle()}
      ref={viewportRef}
      onPointerDown={handlePointerDown}
    >
      <div className="tc-DrawArea-CurvePoint-root">
        <div
          className="tc-DrawArea-CurvePoint-circle"
          style={{ background: color }}
        ></div>
        {isSelected && (
          <div className="tc-DrawArea-CurvePoint-circle-selection tc-DrawArea-circle-selection"></div>
        )}
      </div>
    </div>
  );

  function handlePointerDown(e: React.PointerEvent) {
    if (addingItem && props.item === addingItem) {
      e.preventDefault();
      e.stopPropagation();

      dispatch(addItem(addingItem));
      dispatch(setAddingItem(null));
    } else {
      dragHelper.handlePointerDown(e);
    }
  }

  function getStyle() {
    let ret = {
      width: `${pointRadius}px`,
      height: `${pointRadius}px`,
    };

    const isScreenPositioned =
      addingItem?.screenPos && props.item.model === addingItem.model;
    if (!isScreenPositioned) {
      return {
        ...ret,
        left: geometryHelper.worldXToScreen(props.item.model.x) + "px",
        top: geometryHelper.worldYToScreen(props.item.model.y) + "px",
      };
    } else {
      return ret;
    }
  }
}

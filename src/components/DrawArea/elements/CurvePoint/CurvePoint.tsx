import "./CurvePoint.scss";

import { ITrackElementProps } from "../IModelProps";
import { useDispatch, useSelector } from "react-redux";
import { IMapBaseItem, IRootState } from "../../../../store/store";
import { MapElementDragHelper } from "../MapElementDragHelper";
import { useRef } from "react";
import { GeometryHelper } from "../../GeometryHelper";
import { geometryHelperSelector } from "../../../../store/shared-selectors";
import {
  ICurveModel,
  ICurvePointModel,
  createCurveModel,
} from "../../../../models/ICurveModel";
import { addItem, updateItemModelField } from "../../../../store/actions";
import {
  TrackElementType,
  cloneTrackElementModel,
} from "../../../../models/ITrackElementModel";

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

  const items = useSelector((state: IRootState) => state.track.items);

  const addingItem = useSelector((state: IRootState) => state.track.addingItem);
  const isAdding = addingItem && props.item === addingItem;

  const isSelected = props.item.selected;

  const color = "#0000";

  return (
    <div
      key={props.item.model.uid}
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
    if (isAdding) {
      e.preventDefault();
      e.stopPropagation();

      createCurvePoint();
    } else {
      dragHelper.handlePointerDown(e);
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

  function createCurvePoint() {
    const selectedItems = items.filter((t) => t.selected);

    if (
      selectedItems.length === 1 &&
      selectedItems[0].model.type === TrackElementType.Curve
    ) {
      const curveModel = selectedItems[0].model as ICurveModel;
      const newPoints = [
        ...curveModel.points,
        cloneTrackElementModel(props.item.model, curveModel.points),
      ];

      dispatch(
        updateItemModelField({
          item: selectedItems[0],
          //TODO: use nameof
          propName: "points",
          propValue: newPoints,
        })
      );
    } else {
      const newCurve = createCurveModel();
      newCurve.points = [cloneTrackElementModel(props.item.model, [])];

      const newItem: IMapBaseItem = {
        model: newCurve,
        selected: false,
      };
      dispatch(addItem(newItem));
    }
    // dispatch(setAddingItem(null));
  }
}

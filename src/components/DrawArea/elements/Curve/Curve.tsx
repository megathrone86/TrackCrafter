import "./Curve.scss";

import { ITrackElementProps } from "../IModelProps";
import { useDispatch, useSelector } from "react-redux";
import { IAddingItem, IMapBaseItem, IRootState } from "../../../../store/store";
import { MapElementDragHelper } from "../MapElementDragHelper";
import { useRef } from "react";
import { GeometryHelper } from "../../GeometryHelper";
import { geometryHelperSelector } from "../../../../store/shared-selectors";
import { ICurveModel, ICurvePointModel } from "../../../../models/ICurveModel";
import { addItem, setAddingItem } from "../../../../store/actions";
import { CurvePoint } from "../CurvePoint/CurvePoint";

export function Curve(props: ITrackElementProps<ICurveModel>) {
  const dispatch = useDispatch();

  const viewportRef = useRef(null);

  const geometryHelper = new GeometryHelper(
    useSelector(geometryHelperSelector.selector, geometryHelperSelector.equlity)
  );

  const dragHelper = new MapElementDragHelper(
    dispatch,
    viewportRef,
    props.item,
    geometryHelper
  );

  const isSelected = props.item.selected;

  const color = "#0000";

  return (
    <div
      className="tc-DrawArea-Curve"
      style={getStyle()}
      ref={viewportRef}
      onPointerDown={handlePointerDown}
    >
      {props.item.model.points.map((point) => getCurvePoint(point))}
    </div>
  );

  function handlePointerDown(e: React.PointerEvent) {
    dragHelper.handlePointerDown(e);
  }

  function getStyle() {
    return {};
  }
  //   let ret = {
  //     width: `${pointRadius}px`,
  //     height: `${pointRadius}px`,
  //   };

  //   const isScreenPositioned =
  //     addingItem?.screenPos && props.item.model === addingItem.model;
  //   if (!isScreenPositioned) {
  //     return {
  //       ...ret,
  //       left: geometryHelper.worldXToScreen(props.item.model.x) + "px",
  //       top: geometryHelper.worldYToScreen(props.item.model.y) + "px",
  //     };
  //   } else {
  //     return ret;
  //   }
  // }

  function getCurvePoint(point: ICurvePointModel) {
    //TODO: придумать что-нибудь с этим костылем
    const item = { model: point, selected: props.item.selected };

    return <CurvePoint key={point.uid} item={item} />;
  }
}

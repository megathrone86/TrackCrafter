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
import { IPoint } from "../../../shared/IPoint";
import { GetLineColor } from "../Line/Line";

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

  const points = getPoints();

  return (
    <div className="tc-DrawArea-Curve" style={getStyle()}>
      <svg>
        {isSelected && (
          <path
            className="tc-DrawArea-line-selection no-pointer-events"
            strokeWidth="3"
            d={points}
          ></path>
        )}
        <path className="no-pointer-events" strokeWidth="2" d={points}></path>
        <path
          className="tc-DrawArea-Curve-selector"
          ref={viewportRef}
          strokeWidth="6"
          d={points}
          onPointerDown={(e) => dragHelper.handlePointerDown(e)}
        ></path>
      </svg>
      {isSelected &&
        props.item.model.points.map((point) => getCurvePoint(point))}
    </div>
  );

  function getStyle() {
    return {
      stroke: GetLineColor(props.item.model.color),
    };
  }

  function getCurvePoint(point: ICurvePointModel) {
    //TODO: придумать что-нибудь с этим костылем
    const item = { model: point, selected: false, dragging: false };
    return <CurvePoint key={point.uid} item={item} />;
  }

  function getPoints() {
    const points = props.item.model.points || [];
    if (points.length > 0) {
      let ret = `M${pointToWorld(points[0])}`;
      for (let i = 1; i < points.length; i += 2) {
        if (points[i] && points[i + 1]) {
          ret += ` S${pointToWorld(points[i])} ${pointToWorld(points[i + 1])}`;
        }
      }
      return ret;
    }
  }

  function pointToWorld(pt: IPoint) {
    const x = geometryHelper.worldXToScreen(pt.x);
    const y = geometryHelper.worldYToScreen(pt.y);
    return `${x},${y}`;
  }
}

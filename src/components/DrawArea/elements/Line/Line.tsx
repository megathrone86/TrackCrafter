import "./Line.scss";

import { ITrackElementProps } from "../IModelProps";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../../store/store";
import { MapElementDragHelper } from "../MapElementDragHelper";
import { useRef } from "react";
import { GeometryHelper } from "../../GeometryHelper";
import { geometryHelperSelector } from "../../../../store/shared-selectors";
import { ILineModel, LineColor } from "../../../../models/ILineModel";

export function Line(props: ITrackElementProps<ILineModel>) {
  const dispatch = useDispatch();

  const viewportRef = useRef(null);

  const geometryHelper = new GeometryHelper(
    useSelector(geometryHelperSelector.selector, geometryHelperSelector.equlity)
  );

  const dragHelper = new MapElementDragHelper(
    dispatch,
    viewportRef,
    props.item,
    geometryHelper,
    false
  );

  const isSelected = props.item.selected;

  const items = useSelector((state: IRootState) => state.track.items);

  const start = items.find((t) => t.model.uid === props.item.model.startUid);
  const end = items.find((t) => t.model.uid === props.item.model.endUid);

  const points = getPoints();

  return (
    <div className="tc-DrawArea-Line" style={getStyle()}>
      <svg className="no-pointer-events">
        {isSelected && (
          <path
            className="tc-DrawArea-line-selection no-pointer-events"
            strokeWidth="3"
            d={points}
          ></path>
        )}
        <path className="no-pointer-events" strokeWidth="2" d={points}></path>
        <path
          className="tc-DrawArea-Line-selector"
          ref={viewportRef}
          strokeWidth="6"
          d={points}
          onPointerDown={(e) => dragHelper.handlePointerDown(e)}
        ></path>
      </svg>
    </div>
  );

  function getStyle() {
    return {
      stroke: GetLineColor(props.item.model.color),
    };
  }

  function getPoints() {
    if (start && end) {
      const x1 = geometryHelper.worldXToScreen(start?.model.x);
      const y1 = geometryHelper.worldYToScreen(start?.model.y);
      const x2 = geometryHelper.worldXToScreen(end?.model.x);
      const y2 = geometryHelper.worldYToScreen(end?.model.y);
      return `M${x1} ${y1} L${x2} ${y2}`;
    }
  }
}

export function GetLineColor(color: LineColor) {
  switch (color) {
    case LineColor.Red:
      return "#ff0000";
    case LineColor.Blue:
      return "#0000ff";
    case LineColor.Orange:
      return "#ff8a09";
    case LineColor.Gray:
      return "#888";
  }
}

import "./CurvePoint.scss";

import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GeometryHelper } from "../../../../DrawArea/GeometryHelper";
import { geometryHelperSelector } from "../../../../../store/shared-selectors";
import { IconButton } from "../../../../shared/IconButton/IconButton";
import { createCurvePointModel } from "../../../../../models/ICurveModel";
import { CurvePointDragHelper } from "../../CurvePointDragHelper";

export function CurvePoint() {
  const dispatch = useDispatch();

  const viewportRef = useRef(null);

  const geometryHelper = new GeometryHelper(
    useSelector(geometryHelperSelector.selector, geometryHelperSelector.equlity)
  );

  const dragHelper = new CurvePointDragHelper(
    dispatch,
    viewportRef,
    () => createCurvePointModel(),
    geometryHelper
  );

  return (
    <div ref={viewportRef}>
      <IconButton
        icon="fi-rr-angle-up"
        hint="Добавить кривую"
        enabled={canAddCurve}
        onPointerDown={(e) => dragHelper.handlePointerDown(e)}
      />
    </div>
  );

  function canAddCurve() {
    return true;
  }
}

import "./CurvePoint.scss";

import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GeometryHelper } from "../../../../DrawArea/GeometryHelper";
import { geometryHelperSelector } from "../../../../../store/shared-selectors";
import { IconButton } from "../../../../shared/IconButton/IconButton";
import { createCurvePointModel } from "../../../../../models/ICurveModel";
import { CurvePointDragHelper } from "../../CurvePointDragHelper";
import { IRootState } from "../../../../../store/store";
import { TrackElementType } from "../../../../../models/ITrackElementModel";
import { setAddingItem } from "../../../../../store/actions";

export function CurvePoint() {
  const dispatch = useDispatch();

  const viewportRef = useRef(null);

  const geometryHelper = new GeometryHelper(
    useSelector(geometryHelperSelector.selector, geometryHelperSelector.equlity)
  );

  const addingItem = useSelector((state: IRootState) => state.track.addingItem);
  const isAddingCurvePoint =
    addingItem && addingItem.model.type === TrackElementType.CurvePoint;

  const dragHelper = new CurvePointDragHelper(
    dispatch,
    viewportRef,
    () => createCurvePointModel(),
    geometryHelper
  );

  return isAddingCurvePoint ? (
    <div ref={viewportRef}>
      <IconButton
        icon="fi-rr-cross-circle"
        hint="Закончить редактирование кривой"
        enabled={() => true}
        onClick={closeCurveEditor}
      />
    </div>
  ) : (
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

  function closeCurveEditor() {
    dispatch(setAddingItem(null));
  }
}

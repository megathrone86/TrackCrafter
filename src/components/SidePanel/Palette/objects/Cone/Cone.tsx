import { useRef } from "react";
import "./Cone.scss";

import { useDispatch, useSelector } from "react-redux";
import { PaletteDragHelper } from "../../PaletteDragHelper";
import {
  IConeModel,
  coneColorNames,
  createConeModel,
} from "../../../../../models/IConeModel";
import { GeometryHelper } from "../../../../DrawArea/GeometryHelper";
import { geometryHelperSelector } from "../../../../../store/shared-selectors";
import {
  GetConeColor,
  GetConeColor2,
} from "../../../../DrawArea/elements/Cone/Cone";

interface IProps {
  prototypeModel: IConeModel;
}

export function Cone(props: IProps) {
  const dispatch = useDispatch();

  const viewportRef = useRef(null);

  const geometryHelper = new GeometryHelper(
    useSelector(geometryHelperSelector.selector, geometryHelperSelector.equlity)
  );

  const dragHelper = new PaletteDragHelper(
    dispatch,
    viewportRef,
    () => createConeModel(props.prototypeModel.color),
    geometryHelper
  );

  const color = GetConeColor(props.prototypeModel.color);
  const color2 = GetConeColor2(props.prototypeModel.color);

  const title = `${coneColorNames[props.prototypeModel.color]} конус`;

  return (
    <div
      className="tc-Palette-Cone"
      ref={viewportRef}
      onPointerDown={(e) => dragHelper.handlePointerDown(e)}
      title={title}
    >
      <div className="tc-Palette-Cone-circle" style={{ background: color }}>
        {color2 && (
          <div
            className="tc-Palette-Cone-inner-circle"
            style={{ background: color2 }}
          ></div>
        )}
      </div>
    </div>
  );
}

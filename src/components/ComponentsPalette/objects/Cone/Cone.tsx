import { useRef, useState } from "react";
import "./Cone.scss";
import { ConeModel, createConeModel } from "../../../../models/ConeModel";
import { GetConeColor } from "../../../DrawArea/elements/Cone/Cone";
import { useDispatch, useSelector } from "react-redux";
import { PaletteDragHelper } from "../PaletteDragHelper";
import { GeometryHelper } from "../../../DrawArea/GeometryHelper";
import { IRootState } from "../../../../store/store";

interface IProps {
  title: string;
  prototypeModel: ConeModel;
}

export function Cone(props: IProps) {
  const dispatch = useDispatch();

  const viewportRef = useRef(null);

  const camPos = useSelector((state: IRootState) => state.camPos);
  const gridSize = useSelector((state: IRootState) => state.gridSize.value);
  const geometryHelper = new GeometryHelper(camPos, gridSize);

  const [dragHelper] = useState(
    new PaletteDragHelper(
      dispatch,
      viewportRef,
      () => createConeModel(props.prototypeModel.color),
      geometryHelper
    )
  );

  return (
    <div
      className="tc-Palette-Cone"
      ref={viewportRef}
      onPointerDown={(e) => dragHelper.handlePointerDown(e)}
    >
      <div
        className="tc-Palette-Cone-circle"
        style={{ background: GetConeColor(props.prototypeModel) }}
      ></div>
    </div>
  );
}

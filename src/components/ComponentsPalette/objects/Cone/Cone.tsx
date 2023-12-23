import { useRef, useState } from "react";
import "./Cone.scss";
import { ConeModel, createConeModel } from "../../../../models/ConeModel";
import { GetConeColor } from "../../../DrawArea/elements/Cone/Cone";
import { useDispatch } from "react-redux";
import { PaletteDragHelper } from "../PaletteDragHelper";

interface IProps {
  title: string;
  prototypeModel: ConeModel;
}

export function Cone(props: IProps) {
  const dispatch = useDispatch();

  const viewportRef = useRef(null);

  const [dragHelper] = useState(
    new PaletteDragHelper(dispatch, viewportRef, () =>
      createConeModel(props.prototypeModel.color)
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

import { useState } from "react";
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

  const [dragHelper] = useState(
    new PaletteDragHelper(dispatch, () =>
      createConeModel(props.prototypeModel.color)
    )
  );

  return (
    <div className="tc-Palette-Cone">
      <div
        className="tc-Palette-Cone-circle"
        style={{ background: GetConeColor(props.prototypeModel) }}
        onPointerDown={(e) => dragHelper.handlePointerDown(e)}
        onPointerMoveCapture={(e) => dragHelper.handlePointerMove(e)}
        onPointerUpCapture={(e) => dragHelper.handlePointerUp(e)}
      ></div>
    </div>
  );
}

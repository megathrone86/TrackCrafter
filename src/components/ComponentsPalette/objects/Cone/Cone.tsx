import { CSSProperties, useState } from "react";
import "./Cone.scss";
import { ConeModel, createConeModel } from "../../../../models/ConeModel";
import { GetConeColor } from "../../../DrawArea/elements/Cone/Cone";
import { useDispatch, useSelector } from "react-redux";
import { PaletteDragHelper } from "../palette-drag-helper";
import { IRootState } from "../../../../store/store";

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
        onPointerDown={(e) => dragHelper.onPointerDown(e)}
        onPointerMove={(e) => dragHelper.onPointerMove(e)}
        onPointerUp={(e) => dragHelper.onPointerUp(e)}
      ></div>
    </div>
  );
}

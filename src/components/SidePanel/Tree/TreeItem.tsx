import "./TreeItem.scss";

import { useDispatch } from "react-redux";
import { IConeModel } from "../../../models/IConeModel";
import { TrackElementType } from "../../../models/ITrackElementModel";
import { IBaseTrackElementProps } from "../../DrawArea/elements/IModelProps";
import { setSelection } from "../../../store/actions";
import { GetConeColor } from "../../DrawArea/elements/Cone/Cone";
import { ILineModel } from "../../../models/ILineModel";
import { GetLineColor } from "../../DrawArea/elements/Line/Line";
import { ICurveModel, ICurvePointModel } from "../../../models/ICurveModel";

export function TreeItem(props: IBaseTrackElementProps) {
  const dispatch = useDispatch();

  const model = props.item.model;

  switch (model.type) {
    case TrackElementType.Cone:
      return getCone(model as IConeModel);
    case TrackElementType.Line:
      return getLine(model as ILineModel);
    case TrackElementType.Curve:
      return getCurve(model as ICurveModel);
    default:
      return <div>Unknown type ({model.type})</div>;
  }

  function getCone(model: IConeModel) {
    return (
      <div
        className={"tc-TreeItem " + getClassName()}
        style={{ color: GetConeColor(model.color) }}
        onClick={handleClick}
      >
        Конус #{model.id}
      </div>
    );
  }

  function getLine(model: ILineModel) {
    return (
      <div
        className={"tc-TreeItem " + getClassName()}
        style={{ color: GetLineColor(model.color) }}
        onClick={handleClick}
      >
        Линия #{model.id}
      </div>
    );
  }

  function getCurve(model: ICurveModel) {
    return (
      <div
        className={"tc-TreeItem " + getClassName()}
        style={{ color: GetLineColor(model.color) }}
        onClick={handleClick}
      >
        Кривая #{model.id}
        <div className="tc-TreeItem-children">
          {model.points.map((point) => getCurvePoint(point))}
        </div>
      </div>
    );
  }

  function getCurvePoint(model: ICurvePointModel) {
    return (
      <div
        key={model.uid}
        className={"tc-TreeItem " + getClassName()}
        onClick={handleClick}
      >
        Точка #{model.id}
      </div>
    );
  }

  function handleClick(e: React.MouseEvent) {
    dispatch(
      setSelection({
        item: props.item,
        additiveMode: e.shiftKey,
        switchMode: e.ctrlKey,
      })
    );
  }
  function getClassName() {
    if (props.item.selected) return "tc-TreeItem-selected";
    return "";
  }
}

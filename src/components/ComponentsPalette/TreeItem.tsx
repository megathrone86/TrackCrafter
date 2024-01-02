import { useDispatch } from "react-redux";
import { IConeModel } from "../../models/IConeModel";
import { TrackElementType } from "../../models/ITrackElementModel";
import { IBaseTrackElementProps } from "../DrawArea/elements/IModelProps";
import "./TreeItem.scss";
import { setSelection } from "../../store/actions";
import { GetConeColor } from "../DrawArea/elements/Cone/Cone";

export function TreeItem(props: IBaseTrackElementProps) {
  const dispatch = useDispatch();

  const model = props.item.model;

  switch (model.type) {
    case TrackElementType.Cone:
      return getCone(model as IConeModel);
    default:
      return <div>Неизвестный элемент ({model.type})</div>;
  }

  function getCone(model: IConeModel) {
    return (
      <div
        className={"tc-TreeItem " + getClassName()}
        style={{ color: GetConeColor(model.color) }}
        onClick={handleClick}
      >
        Конус {model.id}
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

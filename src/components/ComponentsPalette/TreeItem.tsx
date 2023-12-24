import { useDispatch } from "react-redux";
import { ConeModel } from "../../models/ConeModel";
import { TrackElementType } from "../../models/TrackElementModel";
import { IBaseTrackElementProps } from "../DrawArea/elements/IModelProps";
import "./TreeItem.scss";
import { setSelection } from "../../store/actions";

export function TreeItem(props: IBaseTrackElementProps) {
  const dispatch = useDispatch();

  const model = props.item.model;

  switch (model.type) {
    case TrackElementType.Cone:
      return getCone(model as ConeModel);
    default:
      return <div>Неизвестный элемент ({model.type})</div>;
  }

  function getCone(model: ConeModel) {
    return (
      <div
        className={"tc-TreeItem " + getClassName()}
        style={{ color: model.color }}
        onClick={handleClick}
      >
        Конус {model.id}
      </div>
    );
  }

  function handleClick(e: React.MouseEvent) {
    dispatch(setSelection({ item: props.item, isAdditive: e.ctrlKey }));
  }
  function getClassName() {
    if (props.item.selected) return "tc-TreeItem-selected";
    return "";
  }
}

import { useDispatch, useSelector } from "react-redux";
import { ConeModel } from "../../models/ConeModel";
import { TrackElementType } from "../../models/TrackElementModel";
import { IRootState } from "../../store/store";
import { IBaseTrackElementProps } from "../DrawArea/elements/IModelProps";
import "./TreeItem.scss";
import { setSelection } from "../../store/actions";

export function TreeItem(props: IBaseTrackElementProps) {
  const dispatch = useDispatch();

  const isSelected = useSelector(
    (state: IRootState) => state.track.selection
  ).includes(props.model);

  const model = props.model;

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
    dispatch(setSelection({ item: model, isAdditive: e.ctrlKey }));
  }
  function getClassName() {
    if (isSelected) return "tc-TreeItem-selected";
    return "";
  }
}

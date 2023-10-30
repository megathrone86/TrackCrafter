import { RadioButtons } from "../shared/RadioButtons";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import { setGridSize } from "../../store/actions";
import { gridSizes } from "../../consts";

import "./SidePanel.scss";

interface IProps {}

export function SidePanel(props: IProps) {
  const dispatch = useDispatch();

  const gridSize = useSelector((state: IRootState) => state.gridSize);

  return (
    <div className="tc-SidePanel">
      <div className="tc-SidePanel-top-settings">
        <p>Размер сетки (в метрах)</p>
        <RadioButtons
          options={gridSizes}
          selection={gridSize}
          allowDeselect={false}
          selectionChanged={(e) => dispatch(setGridSize(e))}
        ></RadioButtons>
      </div>
      <div className="tc-SidePanel-components-palette">
        <p>Создание компонентов</p>
        <div>Иконка красного конуса</div>
        <div>Иконка синего конуса</div>
      </div>
      <div className="tc-SidePanel-tree">
        <p>Дерево объектов</p>
      </div>
    </div>
  );
}

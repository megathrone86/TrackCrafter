import { RadioButtons } from "../shared/radioButtons/RadioButtons";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import { setGridSize } from "../../store/actions";
import { gridSizes } from "../../consts";

import "./SidePanel.scss";
import { Cone } from "./objects/Cone/Cone";
import { ConeColor, createConeModel } from "../../models/ConeModel";
import { TreeItem } from "./TreeItem";

interface IProps {}

const redConeModel = createConeModel(ConeColor.Red);
const blueConeModel = createConeModel(ConeColor.Blue);

export function SidePanel(props: IProps) {
  const dispatch = useDispatch();

  const gridSize = useSelector((state: IRootState) => state.gridSize);
  const items = useSelector((state: IRootState) => state.track.items);

  return (
    <div className="tc-SidePanel">
      <div className="tc-SidePanel-topSettings">
        <p>Размер сетки (в метрах)</p>
        <RadioButtons
          options={gridSizes}
          selection={gridSize}
          allowDeselect={false}
          selectionChanged={(e) => dispatch(setGridSize(e))}
        ></RadioButtons>
      </div>
      <div className="tc-SidePanel-componentsPalette">
        <p>Создание компонентов</p>

        <div className="tc-SidePanel-componentsList">
          <Cone title="Красный конус" prototypeModel={redConeModel}></Cone>
          <Cone title="Синий конус" prototypeModel={blueConeModel}></Cone>
        </div>
      </div>
      <div className="tc-SidePanel-tree">
        <p>Дерево объектов</p>
        {items.map((item, i) => (
          <TreeItem key={i} item={item}></TreeItem>
        ))}
      </div>
    </div>
  );
}

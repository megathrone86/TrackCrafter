import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import { deleteItems, setGridSize, setSelectedAll } from "../../store/actions";
import { gridSizes } from "../../consts";

import "./SidePanel.scss";
import { Cone } from "./objects/Cone/Cone";
import { ConeColor, createConeModel } from "../../models/IConeModel";
import { TreeItem } from "./TreeItem";
import { IconButton } from "../shared/IconButton/IconButton";
import { RadioButtons } from "../shared/RadioButtons/RadioButtons";
import { showConfirm } from "../dialogs/ConfirmDialog/ConfirmDialog";

const redConeModel = createConeModel(ConeColor.Red);
const blueConeModel = createConeModel(ConeColor.Blue);

export function SidePanel() {
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
      <div className="tc-SidePanel-actions">
        <p>Действия</p>

        <div className="tc-SidePanel-actionsList">
          <IconButton
            icon="fi-rs-list-check"
            hint="Выделить все"
            enabled={canSelectAll}
            onClick={handleSelectAllClick}
          />
          <IconButton
            icon="fi-rs-trash"
            hint="Удалить выделенное"
            enabled={canRemoveSelection}
            onClick={handleRemoveSelectionClick}
          />
        </div>
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

  function canSelectAll() {
    return items.some((t) => !t.selected);
  }
  function handleSelectAllClick() {
    dispatch(setSelectedAll());
  }

  function canRemoveSelection() {
    return items.some((t) => t.selected);
  }
  async function handleRemoveSelectionClick() {
    const selectedItems = items.filter((t) => t.selected);

    const ret = await showConfirm(
      `Вы уверены, что хотите удалить ${selectedItems.length} элементов?`
    );
    if (ret) {
      dispatch(deleteItems(selectedItems));
    }
  }
}

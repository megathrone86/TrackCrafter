import "./SidePanel.scss";

import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import {
  addItem,
  deleteItems,
  setGridSize,
  setSelectedAll,
} from "../../store/actions";
import { gridSizes } from "../../consts";
import { ConeColor, createConeModel } from "../../models/IConeModel";
import { TreeItem } from "./Tree/TreeItem";
import { IconButton } from "../shared/IconButton/IconButton";
import { RadioButtons } from "../shared/RadioButtons/RadioButtons";
import { showConfirm } from "../dialogs/ConfirmDialog/ConfirmDialog";
import { ILineModel, createLineModel } from "../../models/ILineModel";
import { TrackElementType } from "../../models/ITrackElementModel";
import { Cone } from "./Palette/objects/Cone/Cone";
import { SelectedItemProperties } from "./SelectedItemProperties/SelectedItemProperties";

const orangeConeModel = createConeModel(ConeColor.Orange);
const redConeModel = createConeModel(ConeColor.Red);
const blueConeModel = createConeModel(ConeColor.Blue);
const yellowConeModel = createConeModel(ConeColor.Yellow);
const redYellowConeModel = createConeModel(ConeColor.RedYellow);
const blueYellowConeModel = createConeModel(ConeColor.BlueYellow);

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
          <IconButton
            icon="fi-rs-chart-connected"
            hint="Соединить линией"
            enabled={canAddLine}
            onClick={handleAddLineClick}
          />
        </div>
      </div>
      <div className="tc-SidePanel-componentsPalette">
        <p>Создание компонентов</p>

        <div className="tc-SidePanel-componentsList">
          <Cone prototypeModel={orangeConeModel}></Cone>
          <Cone prototypeModel={redConeModel}></Cone>
          <Cone prototypeModel={blueConeModel}></Cone>
          <Cone prototypeModel={yellowConeModel}></Cone>
          <Cone prototypeModel={redYellowConeModel}></Cone>
          <Cone prototypeModel={blueYellowConeModel}></Cone>
        </div>
      </div>
      <div className="tc-SidePanel-tree">
        <p>Дерево объектов</p>
        {items.map((item, i) => (
          <TreeItem key={i} item={item}></TreeItem>
        ))}
      </div>
      <div className="tc-SidePanel-properties">
        <p>Свойства объекта:</p>
        <SelectedItemProperties />
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

  function canAddLine() {
    const selectedItems = items.filter((t) => t.selected);

    return (
      selectedItems.length === 2 &&
      !items.some(
        (t) =>
          t.model.type === TrackElementType.Line &&
          isConnected(t.model as ILineModel)
      )
    );

    function isConnected(lineModel: ILineModel) {
      return (
        (lineModel.startUid === selectedItems[0].model.uid &&
          lineModel.endUid === selectedItems[1].model.uid) ||
        (lineModel.startUid === selectedItems[1].model.uid &&
          lineModel.endUid === selectedItems[0].model.uid)
      );
    }
  }
  async function handleAddLineClick() {
    const selectedItems = items.filter((t) => t.selected);

    dispatch(
      addItem({
        model: createLineModel(selectedItems[0].model, selectedItems[1].model),
        selected: false,
      })
    );
  }
}

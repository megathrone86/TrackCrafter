import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import {
  addItem,
  deleteItems,
  setGridSize,
  setSelectedAll,
} from "../../store/actions";
import { gridSizes } from "../../consts";

import "./SidePanel.scss";
import { Cone } from "./objects/Cone/Cone";
import { ConeColor, createConeModel } from "../../models/IConeModel";
import { TreeItem } from "./TreeItem";
import { IconButton } from "../shared/IconButton/IconButton";
import { RadioButtons } from "../shared/RadioButtons/RadioButtons";
import { showConfirm } from "../dialogs/ConfirmDialog/ConfirmDialog";
import { ILineModel, createLineModel } from "../../models/ILineModel";
import { TrackElementType } from "../../models/ITrackElementModel";

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
          <Cone title="Оранжевый конус" prototypeModel={orangeConeModel}></Cone>
          <Cone title="Красный конус" prototypeModel={redConeModel}></Cone>
          <Cone title="Синий конус" prototypeModel={blueConeModel}></Cone>
          <Cone title="Желтый конус" prototypeModel={yellowConeModel}></Cone>
          <Cone
            title="Красно-желтый конус"
            prototypeModel={redYellowConeModel}
          ></Cone>
          <Cone
            title="Сине-желтый конус"
            prototypeModel={blueYellowConeModel}
          ></Cone>
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

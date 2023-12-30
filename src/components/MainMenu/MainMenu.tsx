import "ultimate-react-multilevel-menu/dist/esm/index.css";

import "./MainMenu.scss";

import {
  Nav,
  Collapse,
  Item,
  Items,
  Logo,
} from "ultimate-react-multilevel-menu";
import { useDispatch, useSelector } from "react-redux";
import { IMapBaseItem, IRootState } from "../../store/store";
import { importExportService } from "../../services/ImportExportService";
import { replaceItems, setFileName } from "../../store/actions";
import { dialogService } from "../../services/DialogService";
import {
  ConfirmDialog,
  IConfirmDialogProps,
} from "../dialogs/ConfirmDialog/ConfirmDialog";
import { createUid } from "../../helpers/bl-helper";
import { OpenFileData, fileService } from "../../services/FileService";

export function MainMenu() {
  const dispatch = useDispatch();

  const items = useSelector((state: IRootState) => state.track.items);
  const fileName = useSelector((state: IRootState) => state.track.fileName);

  const isFileDialogEnabled = fileService.isFileDialogEnabled();

  return (
    <div className="tc-MainMenu">
      <Nav className={"navbar-light bg-white"}>
        {/* <Logo href="/">Logo</Logo> */}
        <Collapse>
          <Items title="Файл">
            <Item onClick={newFile}>Создать</Item>
            <Item onClick={openFile}>Открыть</Item>
            {isFileDialogEnabled ? (
              <Item onClick={saveFile}>Сохранить</Item>
            ) : (
              <Item className="disabled">
                Сохранить (не поддерживается в этом браузере)
              </Item>
            )}
            <Item onClick={downloadFile}>Скачать</Item>
          </Items>
          <Items title="Инфо">
            <Item>Открыть тестовый проект</Item>
            <Item>О программе</Item>
          </Items>
        </Collapse>
      </Nav>
    </div>
  );

  function newFile() {
    const currentItemsLength = items.length;
    if (currentItemsLength > 0) {
      dialogService.openDialog<IConfirmDialogProps>(ConfirmDialog, {
        message: `Карта не пуста. Вы уверены, что хотите удалить ${currentItemsLength} элементов?`,
        onOk: () => clearEditor(),
      });
    } else {
      clearEditor();
    }
  }

  function clearEditor() {
    dispatch(replaceItems([]));
    dispatch(setFileName(""));
  }

  async function openFile() {
    const fileData = await fileService.openFile();
    if (fileData) {
      const currentItemsLength = items.length;
      if (currentItemsLength > 0) {
        dialogService.openDialog<IConfirmDialogProps>(ConfirmDialog, {
          message: `Карта не пуста. Вы уверены, что хотите удалить ${currentItemsLength} элементов?`,
          onOk: async () => applyFile(fileData),
        });
      } else {
        applyFile(fileData);
      }
    }
  }

  function applyFile(fileData: OpenFileData<string>) {
    const elements = importExportService.import(fileData.content);
    const mapElements: IMapBaseItem[] = elements.map((t) => ({
      model: t,
      selected: false,
      uid: createUid(),
    }));
    dispatch(replaceItems(mapElements));
    dispatch(setFileName(fileData.fileName));
  }

  function saveFile() {
    const json = importExportService.export(items.map((t) => t.model));
    fileService.saveFile(json, fileName);
  }

  function downloadFile() {
    const json = importExportService.export(items.map((t) => t.model));
    fileService.forceFileDownload(json);
  }
}

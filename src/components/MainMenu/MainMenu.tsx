import "ultimate-react-multilevel-menu/dist/esm/index.css";

import "./MainMenu.scss";

import { Nav, Collapse, Item, Items } from "ultimate-react-multilevel-menu";
import { useDispatch, useSelector } from "react-redux";
import { IMapBaseItem, IRootState } from "../../store/store";
import { importExportService } from "../../services/ImportExportService";
import { replaceItems, setFileName } from "../../store/actions";
import { showConfirm } from "../dialogs/ConfirmDialog/ConfirmDialog";
import { createUid } from "../../helpers/bl-helper";
import { fileService } from "../../services/FileService";
import { toastService } from "../../services/ToastService";

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
            <Item onClick={handleNewFileClick}>Создать</Item>
            <Item onClick={handleOpenFileClick}>Открыть</Item>
            {isFileDialogEnabled ? (
              <Item onClick={handleSaveFileClick}>Сохранить</Item>
            ) : (
              <Item className="disabled">
                Сохранить (не поддерживается в этом браузере)
              </Item>
            )}
            <Item onClick={handleDownloadFileClick}>Скачать</Item>
          </Items>
          <Items title="Инфо">
            <Item>Открыть тестовый проект</Item>
            <Item>О программе</Item>
          </Items>
        </Collapse>
      </Nav>
    </div>
  );

  async function handleNewFileClick() {
    try {
      const currentItemsLength = items.length;
      if (currentItemsLength > 0) {
        const ret = await showConfirm(
          `Карта не пуста. Вы уверены, что хотите удалить ${currentItemsLength} элементов?`
        );
        if (!ret) return;
      }
      dispatch(replaceItems([]));
      dispatch(setFileName(""));
      toastService.info("Редактор очищен");
    } catch (e) {
      console.error(e);
    }
  }

  async function handleOpenFileClick() {
    try {
      const fileData = await fileService.openFile();
      if (fileData) {
        const currentItemsLength = items.length;
        if (currentItemsLength > 0) {
          const ret = await showConfirm(
            `Карта не пуста. Вы уверены, что хотите удалить ${currentItemsLength} элементов?`
          );
          if (!ret) return;
        }

        const elements = importExportService.import(fileData.content);
        const mapElements: IMapBaseItem[] = elements.map((t) => ({
          model: t,
          selected: false,
          uid: createUid(),
        }));
        dispatch(replaceItems(mapElements));
        dispatch(setFileName(fileData.fileName));
      }
      toastService.info("Файл открыт");
    } catch (e) {
      toastService.error("Ошибка открытия");
      console.error(e);
    }
  }

  async function handleSaveFileClick() {
    try {
      const json = importExportService.export(items.map((t) => t.model));
      await fileService.saveFile(json, fileName);
      toastService.info("Файл сохранен");
    } catch (e) {
      toastService.error("Ошибка сохранения");
      console.error(e);
    }
  }

  function handleDownloadFileClick() {
    try {
      const json = importExportService.export(items.map((t) => t.model));
      fileService.forceFileDownload(json);
      toastService.info("Файл скачан");
    } catch (e) {
      toastService.error("Ошибка скачивания");
      console.error(e);
    }
  }
}

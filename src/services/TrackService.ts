import { IObject } from "../helpers/IObject";
import { dependsFrom } from "../helpers/bl-helper";
import {
  IMoveItemsPayload,
  ISetSelectionPayload,
  IUpdateItemFieldPayload,
} from "../store/actions";
import { IMapBaseItem } from "../store/store";

//Сервис для выполнения основных операций с содержимым редактора
class TrackService {
  //удаление
  remove(src: IMapBaseItem[], deletingItems: IMapBaseItem[]) {
    return src.filter((t) => !shouldDelete(t));

    function shouldDelete(item: IMapBaseItem) {
      return (
        deletingItems.includes(item) ||
        deletingItems.some((deletingItem) => dependsFrom(deletingItem, item))
      );
    }
  }

  //добавление
  setSelection(src: IMapBaseItem[], payload: ISetSelectionPayload) {
    if (payload.additiveMode) {
      return src.map((t) => {
        if (payload.item.model === t.model) {
          return { ...t, selected: true };
        } else {
          return t;
        }
      });
    } else if (payload.switchMode) {
      return src.map((t) => {
        if (payload.item.model === t.model) {
          return { ...t, selected: !t.selected };
        } else {
          return t;
        }
      });
    } else {
      return src.map((t) => {
        return { ...t, selected: payload.item.model === t.model };
      });
    }
  }

  //перемещение
  moveItems(src: IMapBaseItem[], payload: IMoveItemsPayload[]) {
    return src.map((t) => {
      const movedItem = payload.find((m) => m.item.model.uid === t.model.uid);
      if (movedItem) {
        return {
          ...t,
          model: {
            ...t.model,
            x: movedItem.newPos.x,
            y: movedItem.newPos.y,
          },
        };
      } else {
        return t;
      }
    });
  }

  //обновление поля модели
  updateItemField(src: IMapBaseItem[], payload: IUpdateItemFieldPayload) {
    return src.map((t) => (t === payload.item ? replaceField() : t));

    function replaceField(): IMapBaseItem {
      const newProperty: IObject = { [payload.propName]: payload.propValue };
      const ret: IMapBaseItem = {
        ...payload.item,
        model: { ...payload.item.model, ...newProperty },
      };
      return ret;
    }
  }
}

export const trackService = new TrackService();

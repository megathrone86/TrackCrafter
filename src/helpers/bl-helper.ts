import { ILineModel } from "../models/ILineModel";
import { TrackElementType } from "../models/ITrackElementModel";
import { IMapBaseItem, store } from "../store/store";
import { v4 as uuidv4 } from "uuid";

//создает имя для нового элемента
export function createNewItemId(): string {
  const items = store.getState().track.items;
  const itemNumber = items.length + 1;
  return itemNumber.toString();
}

//создает рандомный гуид
export function createUid(): string {
  return uuidv4().replaceAll("-", "");
}

//возвращает true, если slave зависит от master
//(например, линия зависит от конусов, на которые она ссылается)
export function dependsFrom(master: IMapBaseItem, slave: IMapBaseItem) {
  if (slave.model.type === TrackElementType.Line) {
    const lineModel = slave.model as ILineModel;
    return (
      lineModel.startUid === master.model.uid ||
      lineModel.endUid === master.model.uid
    );
  }
}

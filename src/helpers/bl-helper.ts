import { store } from "../store/store";
import { v4 as uuidv4 } from "uuid";

export function createNewItemId(): string {
  const items = store.getState().track.items;
  const itemNumber = items.length + 1;
  return itemNumber.toString();
}

export function createUid(): string {
  return uuidv4();
}

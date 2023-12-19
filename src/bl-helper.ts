import { store } from "./store/store";

export function createNewItemId(): string {
  const items = store.getState().track.items;
  const itemNumber = items.length + 1;
  return itemNumber.toString();
}

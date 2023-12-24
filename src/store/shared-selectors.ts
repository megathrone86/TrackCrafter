import { IRootState } from "./store";

export const geometryHelperSelector = (state: IRootState) => ({
  camPos: state.camPos,
  gridSize: state.gridSize.value,
});

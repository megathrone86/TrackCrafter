import { pixelsToMeterRatio } from "../../consts";
import { ICamPosition, store } from "../../store/store";
import { IPoint } from "../shared/IPoint";

export interface IGeometryHelperParams {
  camPos: ICamPosition;
  gridSize: number;
}

export class GeometryHelper {
  private state: IGeometryHelperParams;

  constructor(params: IGeometryHelperParams) {
    this.state = params;
  }

  //Размер ячейки в пикселях
  public getGridCellSize() {
    return pixelsToMeterRatio * this.state.gridSize;
  }

  public mousePosToWord(mousePos: IPoint, roundToGrid = false) {
    return {
      x: this.screenXToWorld(mousePos.x, roundToGrid),
      y: this.screenYToWorld(mousePos.y, roundToGrid),
    };
  }

  public screenXToWorld(screenX: number, roundToGrid = false) {
    const ret = (screenX + this.state.camPos.x) / pixelsToMeterRatio;
    return roundToGrid ? this.roundCoordinateToGrid(ret) : ret;
  }
  public screenYToWorld(screenY: number, roundToGrid = false) {
    const ret = (screenY + this.state.camPos.y) / pixelsToMeterRatio;
    return roundToGrid ? this.roundCoordinateToGrid(ret) : ret;
  }

  public roundCoordinateToGrid(coordinate: number) {
    return Math.round(coordinate / this.state.gridSize) * this.state.gridSize;
  }

  public worldXToScreen(worldX: number) {
    return worldX * pixelsToMeterRatio - this.state.camPos.x;
  }
  public worldYToScreen(worldY: number) {
    return worldY * pixelsToMeterRatio - this.state.camPos.y;
  }

  public updateState() {
    const state = store.getState();
    this.state = { camPos: state.camPos, gridSize: state.gridSize.value };
  }
}

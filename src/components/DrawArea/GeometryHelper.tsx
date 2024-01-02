import { pixelsToMeterRatio } from "../../consts";
import { ICamPosition } from "../../store/store";
import { IPoint } from "../shared/IPoint";

export interface IGeometryHelperParams {
  camPos: ICamPosition;
  gridSize: number;
}

export class GeometryHelper {
  constructor(private params: IGeometryHelperParams) {}

  //Размер ячейки в пикселях
  public getGridCellSize() {
    return pixelsToMeterRatio * this.params.gridSize;
  }

  public mousePosToWord(mousePos: IPoint, roundToGrid = false) {
    return {
      x: this.screenXToWorld(mousePos.x, roundToGrid),
      y: this.screenYToWorld(mousePos.y, roundToGrid),
    };
  }

  public screenXToWorld(screenX: number, roundToGrid = false) {
    const ret = (screenX + this.params.camPos.x) / pixelsToMeterRatio;
    return roundToGrid ? this.roundCoordinateToGrid(ret) : ret;
  }
  public screenYToWorld(screenY: number, roundToGrid = false) {
    const ret = (screenY + this.params.camPos.y) / pixelsToMeterRatio;
    return roundToGrid ? this.roundCoordinateToGrid(ret) : ret;
  }

  public roundCoordinateToGrid(coordinate: number) {
    return Math.round(coordinate / this.params.gridSize) * this.params.gridSize;
  }
}

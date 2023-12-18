import { CamPosition } from "../../store/store";
import { pixelsToMeterRatio } from "./DrawArea";

export class GeometryHelper {
  constructor(public camPos: CamPosition, public gridSize: number) {}

  public getGridCellSize() {
    return pixelsToMeterRatio * this.gridSize;
  }

  public screenXToWorld(screenX: number, roundToGrid = false) {
    const ret = (screenX + this.camPos.x) / pixelsToMeterRatio;
    return roundToGrid ? this.roundCoordinateToGrid(ret) : ret;
  }
  public screenYToWorld(screenY: number, roundToGrid = false) {
    const ret = (screenY + this.camPos.y) / pixelsToMeterRatio;
    return roundToGrid ? this.roundCoordinateToGrid(ret) : ret;
  }

  public roundCoordinateToGrid(coordinate: number) {
    return Math.round(coordinate / this.gridSize) * this.gridSize;
  }
}

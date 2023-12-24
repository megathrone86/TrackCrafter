import { pixelsToMeterRatio } from "../../consts";
import { store } from "../../store/store";
import { Point } from "../shared/Point";

class GeometryHelper {
  private get camPos() {
    return store.getState().camPos;
  }
  private get gridSize() {
    return store.getState().gridSize.value;
  }

  public getGridCellSize() {
    return pixelsToMeterRatio * this.gridSize;
  }

  public mousePosToWord(mousePos: Point, roundToGrid = false) {
    return {
      x: this.screenXToWorld(mousePos.x, roundToGrid),
      y: this.screenYToWorld(mousePos.y, roundToGrid),
    };
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

export const geometryHelper = new GeometryHelper();

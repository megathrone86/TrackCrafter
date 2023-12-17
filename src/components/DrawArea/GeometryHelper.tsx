import { CamPosition } from "../../store/store";
import { Point } from "../shared/Point";
import { pixelsToMeterRatio } from "./DrawArea";

export class GeometryHelper {
  constructor(
    public viewportSize: Point,
    public camPos: CamPosition,
    public gridSize: number
  ) {}

  public getGridCellSize() {
    return pixelsToMeterRatio * this.gridSize;
  }

  public screenXToWorld(screenX: number) {
    const ret = (screenX + this.camPos.x) / pixelsToMeterRatio;
    return ret;
  }
  public screenYToWorld(screenY: number) {
    return (screenY + this.camPos.y) / pixelsToMeterRatio;
  }
}

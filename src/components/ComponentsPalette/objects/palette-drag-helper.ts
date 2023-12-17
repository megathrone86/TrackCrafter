import { Dispatch } from "react";
import { AnyAction } from "redux";
import { Point } from "../../shared/Point";
import {
  setAddingItem,
  setAddingItemMapPosition,
  setAddingItemScreenPosition,
} from "../../../store/actions";
import { TrackElementModel } from "../../../models/TrackElementModel";
import { drawAreaClass } from "../../DrawArea/DrawArea";
import { GeometryHelper } from "../../DrawArea/GeometryHelper";
import { useSelector } from "react-redux";
import { IRootState } from "../../../store/store";

const dragStartDistance = 5;

export class PaletteDragHelper {
  public draggingStarted = false;
  private mousePressed = false;
  private startMousePos: Point | null = null;
  private drawArea: HTMLDivElement | null = null;

  constructor(
    private dispatch: Dispatch<AnyAction>,
    private modelGenerator: () => TrackElementModel
  ) {}

  public handlePointerDown(e: React.PointerEvent) {
    this.mousePressed = true;
    (e.target as HTMLDivElement).setPointerCapture(e.pointerId);
    this.startMousePos = { x: e.clientX, y: e.clientY };
  }

  public handlePointerMove(e: React.PointerEvent) {
    if (
      !this.draggingStarted &&
      this.mousePressed &&
      this.startMousePos &&
      (Math.abs(this.startMousePos.x - e.clientX) > dragStartDistance ||
        Math.abs(this.startMousePos.y - e.clientY) > dragStartDistance)
    ) {
      this.startDragging(e);
    } else if (this.draggingStarted) {
      this.updateDragging(e);
    }
  }

  public handlePointerUp(e: React.PointerEvent) {
    (e.target as HTMLDivElement).releasePointerCapture(e.pointerId);
    this.mousePressed = false;

    if (this.draggingStarted) {
      this.endDragging();
    }
  }

  public startDragging(e: React.PointerEvent) {
    this.draggingStarted = true;

    const model = this.modelGenerator();
    this.dispatch(
      setAddingItem({
        screenPos: { x: e.clientX, y: e.clientY },
        model,
      })
    );

    const elements = document.getElementsByClassName(drawAreaClass);
    this.drawArea = elements[0] as HTMLDivElement;
  }

  public updateDragging(e: React.PointerEvent) {
    if (this.drawArea) {
      const rect = this.drawArea.getBoundingClientRect();
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        // const camPos = useSelector((state: IRootState) => state.camPos);
        // const helper = new GeometryHelper(viewportSize, camPos, gridSize);

        this.dispatch(setAddingItemMapPosition({ x: 1, y: 2 }));
        return;
      }
    }

    const pos = { x: e.clientX, y: e.clientY };
    this.dispatch(setAddingItemScreenPosition(pos));
  }

  public endDragging() {
    this.drawArea = null;
    this.draggingStarted = false;

    this.dispatch(setAddingItem(null));
  }
}

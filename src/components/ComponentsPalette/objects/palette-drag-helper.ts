import { Dispatch } from "react";
import { AnyAction } from "redux";
import { Point } from "../../shared/Point";
import { setAddingItem, setAddingItemPosition } from "../../../store/actions";
import { TrackElementModel } from "../../../models/TrackElementModel";

const dragStartDistance = 5;

export class PaletteDragHelper {
  public draggingStarted = false;
  private mousePressed = false;
  private startMousePos: Point | null = null;

  constructor(
    private dispatch: Dispatch<AnyAction>,
    private modelGenerator: () => TrackElementModel
  ) {}

  public onPointerDown(e: React.PointerEvent) {
    this.mousePressed = true;
    (e.target as HTMLDivElement).setPointerCapture(e.pointerId);
    this.startMousePos = { x: e.clientX, y: e.clientY };
  }

  public onPointerMove(e: React.PointerEvent) {
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

  public onPointerUp(e: React.PointerEvent) {
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
        isOnTrack: false,
        screenPos: { x: e.clientX, y: e.clientY },
        model,
      })
    );
  }

  public updateDragging(e: React.PointerEvent) {
    const pos = { x: e.clientX, y: e.clientY };
    this.dispatch(setAddingItemPosition(pos));
  }

  public endDragging() {
    this.draggingStarted = false;

    this.dispatch(setAddingItem(null));
  }
}

import { MouseMoveHelper } from "./MouseMoveHelper";
import { Point } from "../components/shared/Point";

const dragStartDistance = 5;

export abstract class MouseDragHelper extends MouseMoveHelper {
  private draggingStarted = false;
  private target: HTMLElement | null = null;

  protected abstract getTarget(): HTMLElement;

  protected onPointerMove(mousePos: Point, delta: Point) {
    if (
      !this.draggingStarted &&
      this.startMousePos &&
      (Math.abs(delta.x) > dragStartDistance ||
        Math.abs(delta.y) > dragStartDistance)
    ) {
      this.startDragging(mousePos);
    } else if (this.draggingStarted) {
      this.updateDragging(mousePos);
    }
  }

  protected onPointerDown(e: React.PointerEvent) {}

  protected onPointerUp(e: PointerEvent) {
    if (this.draggingStarted) {
      this.endDragging();
    }
  }

  private startDragging(mousePos: Point) {
    this.draggingStarted = true;

    this.OnDraggingStarted(mousePos);

    this.target = this.getTarget();
  }

  protected abstract OnDraggingStarted(mousePos: Point): void;

  private updateDragging(mousePos: Point) {
    if (this.target) {
      const rect = this.target.getBoundingClientRect();
      if (
        mousePos.x >= rect.left &&
        mousePos.x <= rect.right &&
        mousePos.y >= rect.top &&
        mousePos.y <= rect.bottom
      ) {
        this.OnDraggingInsideTarget({
          x: mousePos.x - rect.left,
          y: mousePos.y - rect.top,
        });
        return;
      }
    }

    this.OnDraggingOutsideTarget(mousePos);
  }

  protected abstract OnDraggingOutsideTarget(mousePos: Point): void;
  protected abstract OnDraggingInsideTarget(mousePos: Point): void;

  private endDragging() {
    this.draggingStarted = false;
    this.OnDraggingFinished();
  }

  protected abstract OnDraggingFinished(): void;
}

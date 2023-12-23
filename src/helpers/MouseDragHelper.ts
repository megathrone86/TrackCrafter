import { MouseMoveHelper } from "./MouseMoveHelper";
import { Point } from "../components/shared/Point";

const dragStartDistance = 5;

export abstract class MouseDragHelper extends MouseMoveHelper {
  protected draggingStarted = false;
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

    this.onDraggingStarted(mousePos);

    this.target = this.getTarget();
  }

  protected abstract onDraggingStarted(mousePos: Point): void;

  private updateDragging(mousePos: Point) {
    if (this.target) {
      const rect = this.target.getBoundingClientRect();
      if (
        mousePos.x >= rect.left &&
        mousePos.x <= rect.right &&
        mousePos.y >= rect.top &&
        mousePos.y <= rect.bottom
      ) {
        this.onDraggingInsideTarget({
          x: mousePos.x - rect.left,
          y: mousePos.y - rect.top,
        });
        return;
      }
    }

    this.onDraggingOutsideTarget(mousePos);
  }

  protected abstract onDraggingOutsideTarget(mousePos: Point): void;
  protected abstract onDraggingInsideTarget(mousePos: Point): void;

  private endDragging() {
    this.draggingStarted = false;
    this.onDraggingFinished();
  }

  protected abstract onDraggingFinished(): void;
}

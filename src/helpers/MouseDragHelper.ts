import { MouseMoveHelper } from "./MouseMoveHelper";
import { IPoint } from "../components/shared/IPoint";

const dragStartDistance = 5;

export abstract class MouseDragHelper extends MouseMoveHelper {
  protected draggingStarted = false;
  private target: HTMLElement | null = null;

  protected abstract getTarget(): HTMLElement;

  protected onPointerMove(mousePos: IPoint, delta: IPoint) {
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

  private startDragging(mousePos: IPoint) {
    this.draggingStarted = true;

    this.onDraggingStarted(mousePos);

    this.target = this.getTarget();
  }

  protected abstract onDraggingStarted(mousePos: IPoint): void;

  private updateDragging(mousePos: IPoint) {
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

  protected abstract onDraggingOutsideTarget(mousePos: IPoint): void;
  protected abstract onDraggingInsideTarget(mousePos: IPoint): void;

  private endDragging() {
    this.draggingStarted = false;
    this.onDraggingFinished();
  }

  protected abstract onDraggingFinished(): void;
}

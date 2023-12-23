import { Dispatch } from "react";
import { Point } from "../shared/Point";
import { setCamPos } from "../../store/actions";
import { MouseMoveHelper } from "../../helpers/MouseMoveHelper";
import { AnyAction } from "redux";
import { store } from "../../store/store";

export class MapDragHelper extends MouseMoveHelper {
  private camStartPos: Point | null = null;

  constructor(
    private dispatch: Dispatch<AnyAction>,
    viewportRef: React.MutableRefObject<null>
  ) {
    super(viewportRef);
  }

  protected onPointerMove(mousePos: Point, delta: Point) {
    if (this.camStartPos) {
      this.dispatch(
        setCamPos({
          x: this.camStartPos.x - delta.x,
          y: this.camStartPos.y - delta.y,
        })
      );
    }
  }

  protected onPointerDown(e: React.PointerEvent) {
    this.camStartPos = store.getState().camPos;
  }

  protected clearAll(e: PointerEvent) {
    super.clearAll(e);
    this.camStartPos = null;
  }

  protected onPointerUp(e: PointerEvent) {}
}

import { Dispatch } from "react";
import { AnyAction } from "redux";
import { Point } from "../../shared/Point";
import { drawAreaClass } from "../DrawArea";
import { store } from "../../../store/store";
import { MouseDragHelper } from "../../../helpers/MouseDragHelper";
import { moveItems, setSelection } from "../../../store/actions";
import { TrackElementModel } from "../../../models/TrackElementModel";
import { geometryHelper } from "../GeometryHelper";

interface MovingItem extends Point {
  item: TrackElementModel;
}

export class MapElementDragHelper extends MouseDragHelper {
  movingItemOffsets: MovingItem[] = [];

  constructor(
    private dispatch: Dispatch<AnyAction>,
    viewportRef: React.MutableRefObject<null>,
    private model: TrackElementModel
  ) {
    super(viewportRef);
  }

  protected getTarget() {
    const elements = document.getElementsByClassName(drawAreaClass);
    return elements[0] as HTMLElement;
  }

  protected onPointerDown(e: React.PointerEvent) {
    e.stopPropagation();
  }

  protected onPointerUp(e: PointerEvent) {
    if (this.draggingStarted) {
      super.onPointerUp(e);
    } else {
      if (e.target === this.viewportRef.current) {
        this.updateSelection(e);
      }
    }
  }

  private updateSelection(e: PointerEvent) {
    this.dispatch(setSelection({ item: this.model, isAdditive: e.ctrlKey }));
  }

  protected onDraggingStarted(mousePos: Point) {
    const selection = store.getState().track.selection;

    this.movingItemOffsets = selection.map((t) => ({
      item: t,
      x: t.x - this.model.x,
      y: t.y - this.model.y,
    }));
  }

  protected onDraggingInsideTarget(mousePos: Point) {

    const worldPos = geometryHelper.mousePosToWord(mousePos, true);
    this.dispatch(
      moveItems(
        this.movingItemOffsets.map((t) => ({
          item: t.item,
          newPos: {
            x: worldPos.x - t.x,
            y: worldPos.y - t.y,
          },
        }))
      )
    );
  }

  protected onDraggingOutsideTarget(mousePos: Point) {}

  protected onDraggingFinished() {}

  protected clearAll(e: PointerEvent) {
    super.clearAll(e);
    this.movingItemOffsets = [];
  }
}

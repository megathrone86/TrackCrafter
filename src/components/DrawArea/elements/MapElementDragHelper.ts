import { Dispatch } from "react";
import { AnyAction } from "redux";
import { Point } from "../../shared/Point";
import { drawAreaClass } from "../DrawArea";
import { MapBaseItem, store } from "../../../store/store";
import { MouseDragHelper } from "../../../helpers/MouseDragHelper";
import { moveItems, setSelection } from "../../../store/actions";
import { GeometryHelper } from "../GeometryHelper";

interface MovingItem {
  item: MapBaseItem;
  offset: Point;
}

export class MapElementDragHelper extends MouseDragHelper {
  movingItemOffsets: MovingItem[] = [];

  constructor(
    private dispatch: Dispatch<AnyAction>,
    viewportRef: React.MutableRefObject<null>,
    private item: MapBaseItem,
    private geometryHelper: GeometryHelper
  ) {
    super(viewportRef);
  }

  protected getTarget() {
    const elements = document.getElementsByClassName(drawAreaClass);
    return elements[0] as HTMLElement;
  }

  protected onPointerDown(e: React.PointerEvent) {
    e.preventDefault();
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
    this.dispatch(setSelection({ item: this.item, isAdditive: e.ctrlKey }));
  }

  protected onDraggingStarted(mousePos: Point) {
    const selection = store.getState().track.items.filter((t) => t.selected);

    this.movingItemOffsets = selection.map((t) => ({
      item: t,
      offset: {
        x: this.item.model.x - t.model.x,
        y: this.item.model.y - t.model.y,
      },
    }));
  }

  protected onDraggingInsideTarget(mousePos: Point) {
    const worldPos = this.geometryHelper.mousePosToWord(mousePos, true);
    const movedItems = this.movingItemOffsets.map((t) => ({
      item: t.item,
      newPos: {
        x: worldPos.x - t.offset.x,
        y: worldPos.y - t.offset.y,
      },
    }));
    this.dispatch(moveItems(movedItems));
  }

  protected onDraggingOutsideTarget(mousePos: Point) {}

  protected onDraggingFinished() {}

  protected clearAll(e: PointerEvent) {
    super.clearAll(e);
    this.movingItemOffsets = [];
  }
}

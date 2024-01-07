import { Dispatch } from "react";
import { AnyAction } from "redux";
import { IPoint } from "../../shared/IPoint";
import { drawAreaClass } from "../DrawArea";
import { IMapBaseItem, IMapItem, store } from "../../../store/store";
import { MouseDragHelper } from "../../../helpers/MouseDragHelper";
import {
  moveItems,
  setDragging,
  setSelection,
  updateItemModelField,
} from "../../../store/actions";
import { GeometryHelper } from "../GeometryHelper";
import { TrackElementType } from "../../../models/ITrackElementModel";
import { ICurveModel, ICurvePointModel } from "../../../models/ICurveModel";

interface MovingItem {
  item: IMapBaseItem;
  offset: IPoint;
}

export class MapElementDragHelper extends MouseDragHelper {
  movingItemOffsets: MovingItem[] = [];

  constructor(
    protected dispatch: Dispatch<AnyAction>,
    viewportRef: React.MutableRefObject<null>,
    protected item: IMapBaseItem,
    protected geometryHelper: GeometryHelper,
    protected canDrag = true
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
    console.debug("MapElementDragHelper onPointerUp");
    if (this.draggingStarted) {
      super.onPointerUp(e);
    } else {
      if (e.target === this.viewportRef.current) {
        this.updateSelection(e);
      }
    }
  }

  private updateSelection(e: PointerEvent) {
    this.dispatch(
      setSelection({
        item: this.item,
        additiveMode: e.shiftKey,
        switchMode: e.ctrlKey,
      })
    );
  }

  protected onDraggingStarted(mousePos: IPoint) {
    if (!this.canDrag) return;

    const selectedItems = store
      .getState()
      .track.items.filter((t) => t.selected);

    this.movingItemOffsets = selectedItems.map((t) => ({
      item: t,
      offset: {
        x: this.item.model.x - t.model.x,
        y: this.item.model.y - t.model.y,
      },
    }));

    this.dispatch(setDragging({ item: this.item, dragging: true }));
  }

  protected onDraggingInsideTarget(mousePos: IPoint) {
    if (!this.canDrag) return;

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

  protected onDraggingOutsideTarget(mousePos: IPoint) {}

  protected onDraggingFinished() {
    this.dispatch(setDragging({ item: this.item, dragging: false }));
  }

  protected clearAll(e: PointerEvent) {
    super.clearAll(e);
    this.movingItemOffsets = [];
  }
}

export class CurvePointMapElementDragHelper extends MapElementDragHelper {
  protected onDraggingInsideTarget(mousePos: IPoint) {
    if (!this.canDrag) return;

    const items = store.getState().track.items;
    const parent = items.find(
      (t) =>
        t.model.type === TrackElementType.Curve &&
        (t.model as ICurveModel).points.some(
          (p) => p.uid === this.item.model.uid
        )
    ) as IMapItem<ICurveModel>;

    const worldPos = this.geometryHelper.mousePosToWord(mousePos, true);
    const newPoint: ICurvePointModel = {
      ...(this.item.model as ICurvePointModel),
      x: worldPos.x,
      y: worldPos.y,
    };

    this.dispatch(
      updateItemModelField({
        item: parent,
        propName: "points",
        propValue: parent?.model.points.map((t) =>
          t.uid === this.item.model.uid ? newPoint : t
        ),
      })
    );
  }

  protected onDraggingOutsideTarget(mousePos: IPoint) {}
}

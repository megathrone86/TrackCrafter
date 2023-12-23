import { Dispatch } from "react";
import { AnyAction } from "redux";
import { Point } from "../../shared/Point";
import { drawAreaClass } from "../DrawArea";
import { GeometryHelper } from "../GeometryHelper";
import { store } from "../../../store/store";
import { MouseDragHelper } from "../../../helpers/MouseDragHelper";
import { setSelection } from "../../../store/actions";
import { TrackElementModel } from "../../../models/TrackElementModel";

export class MapElementDragHelper extends MouseDragHelper {
  constructor(
    private dispatch: Dispatch<AnyAction>,
    viewportRef: React.MutableRefObject<null>,
    private element: TrackElementModel
  ) {
    super(viewportRef);
  }

  protected getTarget() {
    const elements = document.getElementsByClassName(drawAreaClass);
    return elements[0] as HTMLDivElement;
  }

  protected onPointerDown(e: React.PointerEvent) {
    e.stopPropagation();
  }

  protected onPointerUp(e: PointerEvent) {
    if (this.draggingStarted) {
      super.onPointerUp(e);
    } else {
      if (e.target === this.viewportRef.current) {
        this.updateSelection();
      }
    }
  }

  private updateSelection() {
    const selection = [this.element];
    this.dispatch(setSelection(selection));

    //TODO: добавить поддержку выделения по ctrl и shift
    // const selection = store.getState().track.selection;
    // if (selection.includes(this.element))

    //TODO: добавить поддержку выделения рамкой (на далекое будущее)
  }

  protected onDraggingStarted(mousePos: Point) {
    // this.dispatch(
    //   setAddingItem({
    //     screenPos: mousePos,
    //     model,
    //   })
    // );
  }

  protected onDraggingInsideTarget(mousePos: Point) {
    const camPos = store.getState().camPos;
    const gridSize = store.getState().gridSize.value;
    const helper = new GeometryHelper(camPos, gridSize);
    const x = helper.screenXToWorld(mousePos.x, true);
    const y = helper.screenYToWorld(mousePos.y, true);
    // this.dispatch(setAddingItemMapPosition({ x, y }));
  }

  protected onDraggingOutsideTarget(mousePos: Point) {
    // this.dispatch(setAddingItemScreenPosition(mousePos));
  }

  protected onDraggingFinished() {
    // const addingItem = store.getState().track.addingItem;
    // if (addingItem && !addingItem.screenPos) {
    //   this.dispatch(addItem(addingItem.model));
    // }
    // this.dispatch(setAddingItem(null));
  }
}

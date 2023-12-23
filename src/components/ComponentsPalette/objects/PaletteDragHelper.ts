import { Dispatch } from "react";
import { AnyAction } from "redux";
import { Point } from "../../shared/Point";
import {
  addItem,
  setAddingItem,
  setAddingItemMapPosition,
  setAddingItemScreenPosition,
} from "../../../store/actions";
import { TrackElementModel } from "../../../models/TrackElementModel";
import { drawAreaClass } from "../../DrawArea/DrawArea";
import { GeometryHelper } from "../../DrawArea/GeometryHelper";
import { store } from "../../../store/store";
import { MouseDragHelper } from "../../../helpers/MouseDragHelper";

export class PaletteDragHelper extends MouseDragHelper {
  constructor(
    private dispatch: Dispatch<AnyAction>,
    viewportRef: React.MutableRefObject<null>,
    private modelGenerator: () => TrackElementModel
  ) {
    super(viewportRef);
  }

  protected getTarget() {
    const elements = document.getElementsByClassName(drawAreaClass);
    return elements[0] as HTMLDivElement;
  }

  protected onDraggingStarted(mousePos: Point) {
    const model = this.modelGenerator();
    this.dispatch(
      setAddingItem({
        screenPos: mousePos,
        model,
      })
    );
  }

  protected onDraggingInsideTarget(mousePos: Point) {
    const camPos = store.getState().camPos;
    const gridSize = store.getState().gridSize.value;
    const helper = new GeometryHelper(camPos, gridSize);
    const x = helper.screenXToWorld(mousePos.x, true);
    const y = helper.screenYToWorld(mousePos.y, true);
    this.dispatch(setAddingItemMapPosition({ x, y }));
  }

  protected onDraggingOutsideTarget(mousePos: Point) {
    this.dispatch(setAddingItemScreenPosition(mousePos));
  }

  protected onDraggingFinished() {
    const addingItem = store.getState().track.addingItem;
    if (addingItem && !addingItem.screenPos) {
      this.dispatch(addItem(addingItem.model));
    }
    this.dispatch(setAddingItem(null));
  }
}

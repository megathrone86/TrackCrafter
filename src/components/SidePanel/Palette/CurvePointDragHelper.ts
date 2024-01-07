import { Dispatch } from "react";
import { AnyAction } from "redux";
import { IPoint } from "../../shared/IPoint";
import {
  setAddingItem,
  setAddingItemHidden,
  setAddingItemMapPosition,
  setAddingItemScreenPosition,
} from "../../../store/actions";
import { ITrackElementModel } from "../../../models/ITrackElementModel";
import { drawAreaClass } from "../../DrawArea/DrawArea";
import { MouseDragHelper } from "../../../helpers/MouseDragHelper";
import { GeometryHelper } from "../../DrawArea/GeometryHelper";
import { store } from "../../../store/store";

export class CurvePointDragHelper extends MouseDragHelper {
  constructor(
    private dispatch: Dispatch<AnyAction>,
    viewportRef: React.MutableRefObject<null>,
    private modelGenerator: () => ITrackElementModel,
    private geometryHelper: GeometryHelper
  ) {
    super(viewportRef);
  }

  protected getTarget() {
    const elements = document.getElementsByClassName(drawAreaClass);
    return elements[0] as HTMLElement;
  }

  public handlePointerDown(e: React.PointerEvent) {
    super.handlePointerDown(e);
  }

  public onPointerUp(e: PointerEvent) {
    this.startDragging({ x: e.clientX, y: e.clientY });
  }

  protected onDraggingStarted(mousePos: IPoint) {
    const model = this.modelGenerator();
    this.dispatch(
      setAddingItem({
        screenPos: mousePos,
        selected: false,
        model,
      })
    );
  }

  protected onDraggingInsideTarget(mousePos: IPoint) {
    if (!this.haltIfNeeded()) {
      console.debug("onDraggingInsideTarget");

      //т.к. камера могла быть перемещена
      this.geometryHelper.updateState();

      const worldPos = this.geometryHelper.mousePosToWord(mousePos, true);
      this.dispatch(setAddingItemMapPosition(worldPos));
    }
  }

  protected onDraggingOutsideTarget(mousePos: IPoint) {
    if (!this.haltIfNeeded()) {
      this.haltIfNeeded();

      console.debug("onDraggingOutsideTarget");
      // this.dispatch(setAddingItemScreenPosition(mousePos));
      this.dispatch(setAddingItemHidden(true));
    }
  }

  //костыль для того, чтобы завершить все обработчики жестов, когда пользователь отменил рисование
  protected haltIfNeeded() {
    const addingItem = store.getState().track.addingItem;
    if (!addingItem) {
      this.clearAll(null);
      return true;
    }
  }

  protected onDraggingFinished() {}

  protected handlePointerUp(e: PointerEvent) {}
}

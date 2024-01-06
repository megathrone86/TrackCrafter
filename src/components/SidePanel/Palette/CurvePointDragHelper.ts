import { Dispatch } from "react";
import { AnyAction } from "redux";
import { IPoint } from "../../shared/IPoint";
import {
  setAddingItem,
  setAddingItemMapPosition,
  setAddingItemScreenPosition,
} from "../../../store/actions";
import { ITrackElementModel } from "../../../models/ITrackElementModel";
import { drawAreaClass } from "../../DrawArea/DrawArea";
import { MouseDragHelper } from "../../../helpers/MouseDragHelper";
import { GeometryHelper } from "../../DrawArea/GeometryHelper";

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
    //т.к. камера могла быть перемещена
    this.geometryHelper.updateState();

    const worldPos = this.geometryHelper.mousePosToWord(mousePos, true);
    this.dispatch(setAddingItemMapPosition(worldPos));
  }

  protected onDraggingOutsideTarget(mousePos: IPoint) {
    this.dispatch(setAddingItemScreenPosition(mousePos));
  }

  protected onDraggingFinished() {}

  protected handlePointerUp(e: PointerEvent) {}
}
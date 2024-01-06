import { Dispatch } from "react";
import { IPoint } from "../shared/IPoint";
import {
  addItem,
  setAddingItem,
  setCamPos,
  updateItemModelField,
} from "../../store/actions";
import { MouseMoveHelper } from "../../helpers/MouseMoveHelper";
import { AnyAction } from "redux";
import { IMapBaseItem, store } from "../../store/store";
import {
  ITrackElementModel,
  TrackElementType,
  cloneTrackElementModel,
} from "../../models/ITrackElementModel";
import { ICurveModel, createCurveModel } from "../../models/ICurveModel";

export class MapDragHelper extends MouseMoveHelper {
  private camStartPos: IPoint | null = null;

  constructor(
    private dispatch: Dispatch<AnyAction>,
    viewportRef: React.MutableRefObject<null>
  ) {
    super(viewportRef);
  }

  protected onPointerMove(mousePos: IPoint, delta: IPoint) {
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

  protected onPointerUp(e: PointerEvent) {
    const camPos = store.getState().camPos;
    const addingItem = store.getState().track.addingItem;
    if (
      addingItem &&
      this.camStartPos &&
      camPos.x === this.camStartPos.x &&
      camPos.y === this.camStartPos.y
    ) {
      if (addingItem.model.type === TrackElementType.CurvePoint) {
        //точки кривой добавляются по особому (мышку держать не требуются), поэтому их добавление происходит по клику на карту
        createCurvePoint(this.dispatch, addingItem.model);
        this.camStartPos = null;
      } else {
        //в случае с конусами это нештатная ситуация. Скорее всего, курсор отпустили в другом окне и мы не поймали событие отпускания
        const addingItem = store.getState().track.addingItem;
        if (addingItem && !addingItem.screenPos) {
          this.dispatch(addItem(addingItem));
        }
        this.dispatch(setAddingItem(null));
      }
    }
  }
}

function createCurvePoint(
  dispatch: Dispatch<AnyAction>,
  model: ITrackElementModel
) {
  const items = store.getState().track.items;
  const selectedItems = items.filter((t) => t.selected);

  if (
    selectedItems.length === 1 &&
    selectedItems[0].model.type === TrackElementType.Curve
  ) {
    const curveModel = selectedItems[0].model as ICurveModel;
    const newPoints = [
      ...curveModel.points,
      cloneTrackElementModel(model, curveModel.points),
    ];

    dispatch(
      updateItemModelField({
        item: selectedItems[0],
        //TODO: use nameof
        propName: "points",
        propValue: newPoints,
      })
    );
  } else {
    const newCurve = createCurveModel();
    newCurve.points = [cloneTrackElementModel(model, [])];

    const newItem: IMapBaseItem = {
      model: newCurve,
      selected: false,
    };
    dispatch(addItem(newItem));
  }
  // dispatch(setAddingItem(null));
}

import { ITrackElementModel } from "../../../models/ITrackElementModel";
import { IMapItem } from "../../../store/store";

export interface ITrackElementProps<T> {
  item: IMapItem<T>;
}

export interface IBaseTrackElementProps
  extends ITrackElementProps<ITrackElementModel> {}

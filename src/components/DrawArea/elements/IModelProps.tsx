import { TrackElementModel } from "../../../models/TrackElementModel";
import { MapItem } from "../../../store/store";

export interface ITrackElementProps<T> {
  item: MapItem<T>;
}

export interface IBaseTrackElementProps
  extends ITrackElementProps<TrackElementModel> {}

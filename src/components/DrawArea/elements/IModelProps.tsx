import { TrackElementModel } from "../../../models/TrackElementModel";

export interface ITrackElementProps<T> {
  model: T;
}

export interface IBaseTrackElementProps
  extends ITrackElementProps<TrackElementModel> {}

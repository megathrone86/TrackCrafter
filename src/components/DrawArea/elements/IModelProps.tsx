import { TrackElementModel } from "../../../models/TrackElementModel";
import { CamPosition } from "../../shared/CamPosition";

export interface ITrackElementProps<T> {
  model: T;
  camPos: CamPosition;
}

export interface IBaseTrackElementProps
  extends ITrackElementProps<TrackElementModel> {}

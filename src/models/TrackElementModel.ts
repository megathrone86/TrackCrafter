export enum TrackElementType {
  Unknown = "",
  Cone = "Cone",
}

export abstract class TrackElementModel {
  public abstract get type(): TrackElementType;
  //   public type = TrackElementType.Unknown;
}

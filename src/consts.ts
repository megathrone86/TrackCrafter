import { IOption, getOptionFromNumber } from "./components/shared/IOption";

export const gridSizes: IOption<number>[] = [
  getOptionFromNumber(1),
  getOptionFromNumber(0.5),
  getOptionFromNumber(0.2),
  getOptionFromNumber(0.1),
];

export const pixelsToMeterRatio = 100;

import { Option, getOptionFromNumber } from "./components/shared/Option";

export const gridSizes: Option<number>[] = [
  getOptionFromNumber(1),
  getOptionFromNumber(0.5),
  getOptionFromNumber(0.2),
  getOptionFromNumber(0.1),
];

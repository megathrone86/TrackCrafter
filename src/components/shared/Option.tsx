import { Key } from "react";

export interface Option {
  key: Key;
  value: unknown;
  text: string;
}

export function getOptionFromString(value: string): Option {
  return { key: value, text: value, value };
}

export function getOptionFromNumber(value: number): Option {
  return { key: value, text: value.toString(), value };
}

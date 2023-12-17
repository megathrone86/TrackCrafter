import { Key } from "react";

export interface Option<T> {
  key: Key;
  value: T;
  text: string;
}

export interface BaseOption extends Option<unknown> {}

export function getOptionFromString<T>(value: T): Option<T> {
  return { key: `${value}`, text: `${value}`, value };
}

export function getOptionFromNumber<T>(value: T): Option<T> {
  return { key: `${value}`, text: `${value}`, value };
}

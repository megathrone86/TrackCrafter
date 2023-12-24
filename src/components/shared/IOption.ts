import { Key } from "react";

export interface IOption<T> {
  key: Key;
  value: T;
  text: string;
}

export interface IBaseOption extends IOption<unknown> {}

export function getOptionFromString<T>(value: T): IOption<T> {
  return { key: `${value}`, text: `${value}`, value };
}

export function getOptionFromNumber<T>(value: T): IOption<T> {
  return { key: `${value}`, text: `${value}`, value };
}

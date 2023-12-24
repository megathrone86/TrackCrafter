import { useState } from "react";
import "./RadioButtons.scss";
import { IOption } from "../IOption";

interface IProps<T> {
  options: IOption<T>[];
  selection?: IOption<T>;
  allowDeselect?: boolean;
  selectionChanged: (selection: IOption<T>) => void;
}

export function RadioButtons<T>(props: IProps<T>) {
  const [selection, setSelection] = useState<IOption<T> | null>(
    props.selection || null
  );

  return (
    <div className="tc-RadioButtons">
      {props.options.map((o) => (
        <div
          key={o.key}
          className={getOptionClass(o)}
          onClick={() => onOptionClick(o)}
        >
          <label>{o.text}</label>
        </div>
      ))}
    </div>
  );

  function onOptionClick(o: IOption<T>) {
    if (o !== selection) {
      setSelection(o);
      props.selectionChanged(o);
    } else if (props.allowDeselect) {
      setSelection(null);
    }
  }

  function getOptionClass(o: IOption<T>) {
    return o === selection
      ? "tc-RadioButtons-option tc-RadioButtons-selected"
      : "tc-RadioButtons-option";
  }
}

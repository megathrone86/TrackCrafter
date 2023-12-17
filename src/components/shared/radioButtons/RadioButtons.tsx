import { useState } from "react";
import "./RadioButtons.scss";
import { Option } from "../Option";

interface IProps<T> {
  options: Option<T>[];
  selection?: Option<T>;
  allowDeselect?: boolean;
  selectionChanged: (selection: Option<T>) => void;
}

export function RadioButtons<T>(props: IProps<T>) {
  const [selection, setSelection] = useState<Option<T> | null>(
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

  function onOptionClick(o: Option<T>) {
    if (o !== selection) {
      setSelection(o);
      props.selectionChanged(o);
    } else if (props.allowDeselect) {
      setSelection(null);
    }
  }

  function getOptionClass(o: Option<T>) {
    return o === selection
      ? "tc-RadioButtons-option tc-RadioButtons-selected"
      : "tc-RadioButtons-option";
  }
}

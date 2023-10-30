import { useState } from "react";
import "./RadioButtons.scss";
import { Option } from "./Option";

interface IProps {
  options: Option[];
  selection?: Option;
  allowDeselect?: boolean;
  selectionChanged: (selection: Option) => void;
}

export function RadioButtons(props: IProps) {
  const [selection, setSelection] = useState<Option | null>(
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

  function onOptionClick(o: Option) {
    if (o !== selection) {
      setSelection(o);
      props.selectionChanged(o);
    } else if (props.allowDeselect) {
      setSelection(null);
    }
  }

  function getOptionClass(o: Option) {
    return o === selection
      ? "tc-RadioButtons-option tc-RadioButtons-selected"
      : "tc-RadioButtons-option";
  }
}

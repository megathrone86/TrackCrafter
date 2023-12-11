import { useState } from "react";
import "./Cone.scss";
import { ConeModel } from "../../../../models/ConeModel";
import { GetConeColor } from "../../../DrawArea/elements/Cone/Cone";

interface IProps {
  title: string;
  prototypeModel: ConeModel;
}

export function Cone(props: IProps) {
  // const [selection, setSelection] = useState<Option | null>(
  //   props.selection || null
  // );

  return (
    <div className="tc-Palette-Cone">
      <div
        className="tc-Palette-Cone-circle"
        style={{ background: GetConeColor(props.prototypeModel) }}
      ></div>
      {/* {props.options.map((o) => (
        <div
          key={o.key}
          className={getOptionClass(o)}
          onClick={() => onOptionClick(o)}
        >
          <label>{o.text}</label>
        </div>
      ))} */}
    </div>
  );

  // function onOptionClick(o: Option) {
  //   if (o !== selection) {
  //     setSelection(o);
  //     props.selectionChanged(o);
  //   } else if (props.allowDeselect) {
  //     setSelection(null);
  //   }
  // }

  // function getOptionClass(o: Option) {
  //   return o === selection
  //     ? "tc-RadioButtons-option tc-RadioButtons-selected"
  //     : "tc-RadioButtons-option";
  // }
}

import "./SelectedItemProperties.scss";

import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../store/store";
import { TrackElementType } from "../../../models/ITrackElementModel";
import { updateItemField } from "../../../store/actions";
import { ReactNode } from "react";
import { IObject } from "../../../helpers/IObject";
import { ConeColor, coneColorNames } from "../../../models/IConeModel";
import { LineColor, lineColorNames } from "../../../models/ILineModel";

type PropertyField = "id" | "cone-color" | "line-color";

export function SelectedItemProperties() {
  const dispatch = useDispatch();

  const items = useSelector((state: IRootState) => state.track.items);
  const selectedItems = items.filter((t) => t.selected);

  if (selectedItems.length <= 0) return <>-объект не выбран-</>;
  if (selectedItems.length > 1) return <>-выбрано несколько-</>;

  const item = selectedItems[0];
  const rawModel = item.model as unknown as IObject;

  const properties = getItemProperties();

  const coneColors = Object.values(ConeColor);
  const lineColors = Object.values(LineColor);

  return (
    <div className="tc-SidePanel-SelectedItemProperties">
      <table border={0}>
        <tbody>
          {properties.map((propertyName) => renderProperty(propertyName))}
        </tbody>
      </table>
    </div>
  );

  function getItemProperties(): PropertyField[] {
    switch (item.model.type) {
      case TrackElementType.Cone:
        return ["id", "cone-color"];
      case TrackElementType.Line:
        return ["id", "line-color"];
      default:
        return [];
    }
  }

  function renderProperty(field: PropertyField): ReactNode {
    switch (field) {
      case "id":
        return renderInput(field, "ID");
      case "cone-color":
        return renderSelect(
          "color",
          "Цвет",
          coneColors,
          (c) => coneColorNames[c]
        );
      case "line-color":
        return renderSelect(
          "color",
          "Цвет",
          lineColors,
          (c) => lineColorNames[c]
        );
      default:
        return <></>;
    }
  }

  function renderInput(field: PropertyField, fieldName: string) {
    return (
      <tr key={field}>
        <td>{fieldName}</td>
        <td>
          <input
            value={getProperty(field)}
            onChange={(e) => setProperty(field, e.target.value)}
          ></input>
        </td>
      </tr>
    );
  }

  function renderSelect<T>(
    fieldName: string,
    fieldDescription: string,
    values: T[],
    getValueDescription: (t: T) => string
  ) {
    return (
      <tr key={fieldName}>
        <td>{fieldDescription}</td>
        <td>
          <select
            value={getProperty(fieldName)}
            onChange={(e) => setProperty(fieldName, e.target.value)}
          >
            {values.map((t) => (
              <option key={t as string} value={t as string}>
                {getValueDescription(t)}
              </option>
            ))}
          </select>
        </td>
      </tr>
    );
  }

  function getProperty(propName: string) {
    return rawModel[propName] as
      | string
      | number
      | readonly string[]
      | undefined;
  }

  function setProperty(propName: string, propValue: unknown) {
    dispatch(
      updateItemField({
        item,
        propName,
        propValue,
      })
    );
  }
}

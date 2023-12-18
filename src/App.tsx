import "./App.scss";
import { MainMenu } from "./components/MainMenu/MainMenu";
import { SidePanel } from "./components/ComponentsPalette/SidePanel";
import { DrawArea } from "./components/DrawArea/DrawArea";
import { useSelector } from "react-redux";
import { IRootState } from "./store/store";
import { BaseItem } from "./components/DrawArea/elements/BaseItem/BaseItem";
import { CSSProperties } from "react";

export function App() {
  const addingItem = useSelector((state: IRootState) => state.track.addingItem);

  return (
    <div className="tc-App">
      <MainMenu></MainMenu>
      <div className="tc-App-editArea">
        <SidePanel></SidePanel>
        <DrawArea></DrawArea>
      </div>

      {addingItem && addingItem.screenPos && (
        <div className="tc-App-addingItemContainer" style={getStyle()}>
          <BaseItem model={addingItem.model}></BaseItem>
        </div>
      )}
    </div>
  );

  function getStyle(): CSSProperties {
    return addingItem && addingItem.screenPos
      ? {
          left: `${addingItem.screenPos.x}px`,
          top: `${addingItem.screenPos.y}px`,
        }
      : {};
  }
}

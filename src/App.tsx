import "./App.scss";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { MainMenu } from "./components/MainMenu/MainMenu";
import { SidePanel } from "./components/ComponentsPalette/SidePanel";
import { DrawArea } from "./components/DrawArea/DrawArea";
import { useSelector } from "react-redux";
import { IRootState } from "./store/store";
import { BaseItem } from "./components/DrawArea/elements/BaseItem/BaseItem";
import { CSSProperties } from "react";
import { DialogContainer } from "./components/dialogs/DialogContainer/DialogContainer";

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
          <BaseItem item={addingItem}></BaseItem>
        </div>
      )}

      <DialogContainer />
      <ToastContainer />
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

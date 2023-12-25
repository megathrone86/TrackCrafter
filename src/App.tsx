import "./App.scss";
import { MainMenu } from "./components/MainMenu/MainMenu";
import { SidePanel } from "./components/ComponentsPalette/SidePanel";
import { DrawArea } from "./components/DrawArea/DrawArea";
import { useSelector } from "react-redux";
import { IRootState } from "./store/store";
import { BaseItem } from "./components/DrawArea/elements/BaseItem/BaseItem";
import { CSSProperties, useEffect } from "react";
import React from "react";
import { dialogService } from "./services/DialogService";

export function App() {
  const [dialogs, setDialogs] = React.useState(dialogService.dialogs);

  const addingItem = useSelector((state: IRootState) => state.track.addingItem);

  useEffect(() => {
    dialogService.subscribe((val) => setDialogs(val));
    return () => dialogService.clearSubscription();
  }, []);

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

      {/* //TODO: вынести в отдельный класс для отрисовки диалога */}
      {dialogs.map((dialog, i) => (
        <div className="tc-App-dialog" key={i}>
          <div className="tc-App-dialog-body">
            {dialog.component(dialog.props)}
          </div>
        </div>
      ))}
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

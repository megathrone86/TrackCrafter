import "./App.scss";
import { MainMenu } from "./components/MainMenu/MainMenu";
import { SidePanel } from "./components/ComponentsPalette/SidePanel";
import { DrawArea } from "./components/DrawArea/DrawArea";

export function App() {
  return (
    <div className="tc-App">
      <MainMenu></MainMenu>
      <div className="tc-App-editArea">
        <SidePanel></SidePanel>
        <DrawArea></DrawArea>
      </div>
    </div>
  );
}

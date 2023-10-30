import "./App.scss";
import { MainMenu } from "./components/MainMenu/MainMenu";
import { SidePanel } from "./components/ComponentsPalette/SidePanel";
import { DrawArea } from "./components/DrawArea/DrawArea";

export function App() {
  // const [gridSize, setGridSize] = useState<Option>(gridSizes[1]);
  // const [items, setItems] = useState<TrackElement>([]);

  return (
    <div className="tc-App">
      <MainMenu></MainMenu>
      <div className="tc-App-edit-area">
        <SidePanel></SidePanel>
        <DrawArea></DrawArea>
      </div>
    </div>
  );
}

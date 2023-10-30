import { useSelector } from "react-redux";
import "./DrawArea.scss";
import { IRootState } from "../../store/store";
import { useEffect, useRef, useState } from "react";

const pixelsToMeterRatio = 100;

export function DrawArea() {
  const viewportRef = useRef(null);
  const [viewportSize, setSize] = useState({ x: 0, y: 0 });

  const [camX, setCamX] = useState(0);
  const [camY, setCamY] = useState(0);

  const gridSize = useSelector((state: IRootState) => state.gridSize)
    .value as number;

  useEffect(() => {
    if (viewportRef.current) {
      const div = viewportRef.current as HTMLDivElement;
      setSize({ x: div.offsetWidth, y: div.offsetHeight });
    }
  }, []);

  const gridCellSize = pixelsToMeterRatio * gridSize;
  const gridColumnsStart =
    Math.trunc(camX / gridCellSize) * gridCellSize - gridCellSize - camX;
  const gridColumnsEnd =
    Math.trunc((viewportSize.x + camX) / gridCellSize) * gridCellSize +
    gridCellSize -
    camX;
  const gridRowsStart =
    Math.trunc(camY / gridCellSize) * gridCellSize - gridCellSize - camY;
  const gridRowsEnd =
    Math.trunc((viewportSize.y + camY) / gridCellSize) * gridCellSize +
    gridCellSize -
    camY;

  const columns = [];
  for (let x = gridColumnsStart; x <= gridColumnsEnd; x += gridCellSize) {
    columns.push(x);
  }
  const rows = [];
  for (let y = gridRowsStart; y <= gridRowsEnd; y += gridCellSize) {
    rows.push(y);
  }

  return (
    <div className="tc-DrawArea" ref={viewportRef}>
      <button onClick={test} style={{ zIndex: 999999 }}>
        test
      </button>

      <div className="tc-DrawArea-grid">
        {columns.map((x) => (
          <div
            className="tc-DrawArea-grid-vertical-line"
            style={{ left: `${x}px` }}
          ></div>
        ))}
        {rows.map((y) => (
          <div
            className="tc-DrawArea-grid-horizontal-line"
            style={{ top: `${y}px` }}
          ></div>
        ))}
      </div>

      <p>gridSize = {gridSize}</p>
      <p>
        viewportSize = {viewportSize.x}, {viewportSize.y}
      </p>
      <p>
        cam: {camX}, {camY}
      </p>
    </div>
  );

  function test() {
    // setCamX(camX + 5);
    setCamY(camY + 5);
  }
}

import { useSelector } from "react-redux";
import "./DrawArea.scss";
import { IRootState } from "../../store/store";
import { useEffect, useRef, useState } from "react";

type Point = { x: number; y: number };

const pixelsToMeterRatio = 100;

export function DrawArea() {
  const viewportRef = useRef(null);
  const [viewportSize, setSize] = useState<Point>({ x: 0, y: 0 });

  const [camPos, setCamPos] = useState<Point>({ x: 0, y: 0 });
  const [mouseStartPos, setMouseStartPos] = useState<Point | null>(null);

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
    Math.trunc(camPos.x / gridCellSize) * gridCellSize -
    gridCellSize -
    camPos.x;
  const gridColumnsEnd =
    Math.trunc((viewportSize.x + camPos.x) / gridCellSize) * gridCellSize +
    gridCellSize -
    camPos.x;
  const gridRowsStart =
    Math.trunc(camPos.y / gridCellSize) * gridCellSize -
    gridCellSize -
    camPos.y;
  const gridRowsEnd =
    Math.trunc((viewportSize.y + camPos.y) / gridCellSize) * gridCellSize +
    gridCellSize -
    camPos.y;

  const columns = [];
  for (let x = gridColumnsStart; x <= gridColumnsEnd; x += gridCellSize) {
    columns.push(x);
  }
  const rows = [];
  for (let y = gridRowsStart; y <= gridRowsEnd; y += gridCellSize) {
    rows.push(y);
  }

  return (
    <div
      className="tc-DrawArea"
      ref={viewportRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <button onClick={test} style={{ zIndex: 999999 }}>
        test
      </button>

      <div className="tc-DrawArea-grid">
        {columns.map((x) => (
          <div
            key={`v${x}`}
            className="tc-DrawArea-grid-vertical-line"
            style={{ left: `${x}px` }}
          ></div>
        ))}
        {rows.map((y) => (
          <div
            key={`h${y}`}
            className="tc-DrawArea-grid-horizontal-line"
            style={{ top: `${y}px` }}
          ></div>
        ))}
      </div>

      <div className="tc-DrawArea-debugInfo">
        <p>gridSize = {gridSize}</p>
        <p>
          viewportSize = {viewportSize.x}, {viewportSize.y}
        </p>
        <p>
          cam: {camPos.x}, {camPos.y}
        </p>
      </div>
    </div>
  );

  function handlePointerDown(e: React.PointerEvent) {
    if (viewportRef.current) {
      setMouseStartPos({ x: e.screenX, y: e.screenY });
      const element = viewportRef.current as HTMLDivElement;
      element.setPointerCapture(e.pointerId);
    }
  }

  function handlePointerMove(e: React.PointerEvent, release?: boolean) {
    if (mouseStartPos) {
      const delta = {
        x: e.screenX - mouseStartPos.x,
        y: e.screenY - mouseStartPos.y,
      };
      setMouseStartPos({ x: e.screenX, y: e.screenY });

      setCamPos({ x: camPos.x - delta.x, y: camPos.y - delta.y });

      if (release && viewportRef.current) {
        const element = viewportRef.current as HTMLDivElement;
        element.releasePointerCapture(e.pointerId);
        setMouseStartPos(null);
      }
    }
  }

  function handlePointerUp(e: React.PointerEvent) {
    handlePointerMove(e, true);
  }

  function test() {}
}

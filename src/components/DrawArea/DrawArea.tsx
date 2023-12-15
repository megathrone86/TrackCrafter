import { useSelector } from "react-redux";
import "./DrawArea.scss";
import { IRootState } from "../../store/store";
import { useEffect, useRef, useState } from "react";
import { BaseItem } from "./elements/BaseItem/BaseItem";
import { CamPosition } from "../shared/CamPosition";
import { Point } from "../shared/Point";

const pixelsToMeterRatio = 100;

//TODO: рассмотреть либу ReactFlow для отрисовки

export function DrawArea() {
  const viewportRef = useRef(null);
  const [viewportSize, setSize] = useState<Point>({ x: 0, y: 0 });

  const [camPos, setCamPos] = useState<CamPosition>({ x: 0, y: 0 });
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

  const items = useSelector((state: IRootState) => state.items);

  const helper = new GeometryHelper(
    viewportSize,
    camPos,
    gridSize,
    gridCellSize
  );

  return (
    <div
      className="tc-DrawArea"
      ref={viewportRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <div className="tc-DrawArea-grid">
        {columns.map((x) => (
          <div
            key={`v${x}`}
            className={getGridLineClassName(
              "tc-DrawArea-gridVerticalLine",
              "tc-DrawArea-gridVerticalLine_major",
              helper.screenXToWorld(x)
            )}
            style={{ left: `${x}px` }}
          ></div>
        ))}
        {rows.map((y) => (
          <div
            key={`h${y}`}
            className={getGridLineClassName(
              "tc-DrawArea-gridHorizontalLine",
              "tc-DrawArea-gridHorizontalLine_major",
              helper.screenYToWorld(y)
            )}
            style={{ top: `${y}px` }}
          ></div>
        ))}
      </div>

      <div className="tc-DrawArea-debugInfo">
        {/* <p>items = {items.length}</p> */}
      </div>

      {items.map((item, i) => (
        <BaseItem key={i} model={item} camPos={camPos}></BaseItem>
      ))}
    </div>
  );

  function getGridLineClassName(
    class1: string,
    class2: string,
    coordinate: number
  ) {
    return Number.isInteger(coordinate) ? `${class1} ${class2}` : class1;
  }

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
}

export class GeometryHelper {
  constructor(
    public viewportSize: Point,
    public camPos: CamPosition,
    public gridSize: number,
    public gridCellSize: number
  ) {}

  public screenXToWorld(screenX: number) {
    const ret = (screenX + this.camPos.x) / pixelsToMeterRatio;
    return ret;
  }
  public screenYToWorld(screenY: number) {
    return (screenY + this.camPos.y) / pixelsToMeterRatio;
  }
}

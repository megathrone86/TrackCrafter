import { useDispatch, useSelector } from "react-redux";
import "./DrawArea.scss";
import { IRootState } from "../../store/store";
import { useEffect, useRef, useState } from "react";
import { BaseItem } from "./elements/BaseItem/BaseItem";
import { Point } from "../shared/Point";
import { setCamPos } from "../../store/actions";
import { GeometryHelper } from "./GeometryHelper";

export const drawAreaClass = "tc-DrawArea";
export const pixelsToMeterRatio = 100;

//TODO: рассмотреть либу ReactFlow для отрисовки

export function DrawArea() {
  const dispatch = useDispatch();

  const viewportRef = useRef(null);
  const [viewportSize, setViewportSize] = useState<Point>({ x: 0, y: 0 });

  const [camStartPos, setCamStartPos] = useState<Point | null>(null);
  const [mouseStartPos, setMouseStartPos] = useState<Point | null>(null);

  const gridSize = useSelector((state: IRootState) => state.gridSize).value;
  const items = useSelector((state: IRootState) => state.track.items);
  const addingItem = useSelector((state: IRootState) => state.track.addingItem);
  const camPos = useSelector((state: IRootState) => state.camPos);

  useEffect(() => {
    if (viewportRef.current) {
      const div = viewportRef.current as HTMLDivElement;
      setViewportSize({ x: div.offsetWidth, y: div.offsetHeight });
    }
  }, []);

  const helper = new GeometryHelper(camPos, gridSize);

  const { columns, rows } = getGrid(helper);

  return (
    <div
      className={drawAreaClass}
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
        <p>camPos.y = {camPos.y}</p>
        {/* <p>items = {items.length}</p> */}
      </div>

      {items.map((item, i) => (
        <BaseItem key={i} model={item}></BaseItem>
      ))}

      {addingItem && !addingItem.screenPos && (
        <BaseItem model={addingItem.model}></BaseItem>
      )}
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
      setCamStartPos(camPos);
      setMouseStartPos({ x: e.clientX, y: e.clientY });
      const element = viewportRef.current as HTMLDivElement;
      element.setPointerCapture(e.pointerId);
    }
  }

  function handlePointerMove(e: React.PointerEvent, release?: boolean) {
    if (mouseStartPos && camStartPos) {
      const delta = {
        x: e.clientX - mouseStartPos.x,
        y: e.clientY - mouseStartPos.y,
      };

      dispatch(
        setCamPos({ x: camStartPos.x - delta.x, y: camStartPos.y - delta.y })
      );

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

  function getGrid(geometryHelper: GeometryHelper) {
    const gridCellSize = geometryHelper.getGridCellSize();
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

    return { columns, rows };
  }
}

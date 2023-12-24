import { useDispatch, useSelector } from "react-redux";
import "./DrawArea.scss";
import { IRootState } from "../../store/store";
import { useEffect, useRef, useState } from "react";
import { BaseItem } from "./elements/BaseItem/BaseItem";
import { IPoint } from "../shared/IPoint";
import { MapDragHelper } from "./MapDragHelper";
import { GeometryHelper } from "./GeometryHelper";
import { geometryHelperSelector } from "../../store/shared-selectors";

export const drawAreaClass = "tc-DrawArea";

//TODO: рассмотреть либу ReactFlow для отрисовки

export function DrawArea() {
  const dispatch = useDispatch();

  const viewportRef = useRef(null);
  const [viewportSize, setViewportSize] = useState<IPoint>({ x: 0, y: 0 });

  const camPos = useSelector((state: IRootState) => state.camPos);

  // const fuck = useSelector(geometryHelperSelector.selector, (a, b) => true);

  const geometryHelper = new GeometryHelper(
    useSelector(geometryHelperSelector.selector, geometryHelperSelector.equlity)
  );

  const [dragHelper] = useState(new MapDragHelper(dispatch, viewportRef));

  const items = useSelector((state: IRootState) => state.track.items);
  const addingItem = useSelector((state: IRootState) => state.track.addingItem);

  useEffect(() => {
    if (viewportRef.current) {
      const div = viewportRef.current as HTMLElement;
      setViewportSize({ x: div.offsetWidth, y: div.offsetHeight });
    }
  }, []);

  const { columns, rows } = getGrid();

  return (
    <div
      className={drawAreaClass}
      ref={viewportRef}
      onPointerDown={(e) => dragHelper.handlePointerDown(e)}
    >
      <div className="tc-DrawArea-grid">
        {columns.map((x) => (
          <div
            key={`v${x}`}
            className={getGridLineClassName(
              "tc-DrawArea-gridVerticalLine",
              "tc-DrawArea-gridVerticalLine_major",
              geometryHelper.screenXToWorld(x)
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
              geometryHelper.screenYToWorld(y)
            )}
            style={{ top: `${y}px` }}
          ></div>
        ))}
      </div>

      <div className="tc-DrawArea-debugInfo"></div>

      {items.map((item, i) => (
        <BaseItem key={i} item={item}></BaseItem>
      ))}

      {addingItem && !addingItem.screenPos && (
        <BaseItem item={addingItem}></BaseItem>
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

  function getGrid() {
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

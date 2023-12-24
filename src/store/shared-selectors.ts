import { IGeometryHelperParams } from "../components/DrawArea/GeometryHelper";
import { IRootState } from "./store";

interface ISharedSelector<T> {
  selector: (state: IRootState) => T;
  equlity: (a: T, b: T) => boolean;
}

export const geometryHelperSelector: ISharedSelector<IGeometryHelperParams> = {
  selector: (state: IRootState) => ({
    camPos: state.camPos,
    gridSize: state.gridSize.value,
  }),
  equlity: (a, b) => a.camPos === b.camPos && a.gridSize === b.gridSize,
};

//TODO: рассмотреть вариант замены equlity на универсальную функцию, которая будет сравнивать по ключам

import { IPoint } from "../components/shared/IPoint";

const pointerMoveDelay = 2;

export abstract class MouseMoveHelper {
  protected startMousePos: IPoint | null = null;
  private timeout: NodeJS.Timeout | null = null;

  constructor(protected viewportRef: React.MutableRefObject<null>) {}

  public handlePointerDown(e: React.PointerEvent) {
    if (this.viewportRef.current) {
      const element = this.viewportRef.current as HTMLElement;
      element.setPointerCapture(e.pointerId);

      this.startMousePos = { x: e.clientX, y: e.clientY };

      this.onPointerDown(e);

      document.onpointerup = (e) => this.handlePointerUp(e);
      document.onpointermove = (e) => this.handlePointerMove(e);
      document.onlostpointercapture = (e) => this.handlePointerUp(e);
    }
  }

  protected abstract onPointerDown(e: React.PointerEvent): void;

  private handlePointerMove(e: PointerEvent) {
    if (this.startMousePos) {
      const delta: IPoint = {
        x: e.clientX - this.startMousePos.x,
        y: e.clientY - this.startMousePos.y,
      };

      //TODO: setTimeout - простейший способ ограничить количество срабатываний в секунду до разумного. Подумать как сделать лучше
      this.timeout && clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.onPointerMove({ x: e.clientX, y: e.clientY }, delta);
      }, pointerMoveDelay);
    }
  }

  protected abstract onPointerMove(mousePos: IPoint, delta: IPoint): void;

  protected clearAll(e: PointerEvent) {
    document.onpointermove = null;
    document.onpointerup = null;
    document.onlostpointercapture = null;

    this.startMousePos = null;

    if (this.viewportRef.current) {
      const element = this.viewportRef.current as HTMLElement;
      element.releasePointerCapture(e.pointerId);
    }
  }

  private handlePointerUp(e: PointerEvent) {
    this.handlePointerMove(e);
    this.onPointerUp(e);
    this.clearAll(e);
  }

  protected abstract onPointerUp(e: PointerEvent): void;
}

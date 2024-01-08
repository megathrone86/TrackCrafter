import { IPoint } from "../components/shared/IPoint";

const pointerMoveDelay = 2;

export abstract class MouseMoveHelper {
  protected startMousePos: IPoint | null = null;
  private timeout: NodeJS.Timeout | null = null;
  private prev_onpointerup:
    | ((this: GlobalEventHandlers, ev: PointerEvent) => any)
    | null = null;
  private prev_onpointermove:
    | ((this: GlobalEventHandlers, ev: PointerEvent) => any)
    | null = null;

  constructor(protected viewportRef: React.MutableRefObject<null>) {}

  public handlePointerDown(e: React.PointerEvent) {
    if (this.viewportRef.current) {
      e.preventDefault();

      // const element = this.viewportRef.current as HTMLElement;
      // if (!element.hasPointerCapture(e.pointerId)) {
      //   console.debug("element.setPointerCapture");
      //   element.setPointerCapture(e.pointerId);
      // }

      this.startMousePos = { x: e.clientX, y: e.clientY };

      this.onPointerDown(e);

      this.prev_onpointerup = document.onpointerup;
      document.onpointerup = (e) => this.handlePointerUp(e);
      this.prev_onpointermove = document.onpointermove;
      document.onpointermove = (e) => this.handlePointerMove(e);
      // document.onlostpointercapture = (e) => this.handlePointerUp(e);
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
    return true;
  }

  protected abstract onPointerMove(mousePos: IPoint, delta: IPoint): void;

  protected clearAll(e: PointerEvent | null) {
    console.debug("clearAll");
    // document.onpointermove = null;
    // document.onpointerup = null;
    // document.onlostpointercapture = null;

    document.onpointermove = this.prev_onpointermove;
    document.onpointerup = this.prev_onpointerup;
    // document.onlostpointercapture = null;

    this.startMousePos = null;

    // if (this.viewportRef.current) {
    //   const element = this.viewportRef.current as HTMLElement;
    //   element.releasePointerCapture(e.pointerId);
    // }
  }

  protected handlePointerUp(e: PointerEvent) {
    this.handlePointerMove(e);
    this.onPointerUp(e);
    this.clearAll(e);
  }

  protected abstract onPointerUp(e: PointerEvent): void;
}

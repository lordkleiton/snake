import ElementUtils from "./element";

abstract class CanvasUtils {
  static get canvas(): HTMLCanvasElement {
    return ElementUtils.getCanvas();
  }

  static get context(): CanvasRenderingContext2D {
    return this.canvas.getContext("2d") || ({} as CanvasRenderingContext2D);
  }
}

export default CanvasUtils;

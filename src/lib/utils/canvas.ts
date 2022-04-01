import { ICanvasInfo } from "~/lib/interfaces";
import ElementUtils from "./element";

abstract class CanvasUtils {
  static get canvas(): HTMLCanvasElement {
    return ElementUtils.getCanvas();
  }

  static get context(): CanvasRenderingContext2D {
    return this.canvas.getContext("2d") || ({} as CanvasRenderingContext2D);
  }

  static get info(): ICanvasInfo {
    return {
      height: this.height,
      width: this.width,
    };
  }

  static get height(): number {
    return this.canvas.height;
  }

  static get width(): number {
    return this.canvas.width;
  }
}

export default CanvasUtils;

import { ICanvasInfo } from "~/lib/interfaces";
import { Snake } from "~/lib/models";
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

  static drawBackground(canvas_info: ICanvasInfo): void {
    const lightest = ElementUtils.getCssVariableValue("--lightest");

    this.context.fillStyle = lightest;

    this.context.fillRect(0, 0, canvas_info.width, canvas_info.height);
  }

  static drawSnake(snake: Snake, size: number, half_block: number): void {
    const darkest = ElementUtils.getCssVariableValue("--darkest");

    this.context.fillStyle = darkest;

    this.context.fillRect(
      snake.x - half_block,
      snake.y - half_block,
      size,
      size
    );

    this.context.fillStyle = "red";

    this.context.fillRect(snake.x - 5, snake.y - 5, 10, 10);
  }
}

export default CanvasUtils;

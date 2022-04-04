import { ICanvasInfo } from "~/lib/interfaces";
import { Snake } from "~/lib/models";
import { GameSettingsData } from "~/lib/data";
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

  static drawYGrid(spacing: number): void {
    const dark = ElementUtils.getCssVariableValue("--dark");
    const qty = Math.round(this.info.width / spacing);

    for (let i = 1; i < qty; i++) {
      const start_x = i * spacing;
      const end_x = i * spacing;
      const start_y = 0;
      const end_y = this.info.height;

      this.context.strokeStyle = dark;

      this.context.beginPath();

      this.context.moveTo(start_x, start_y);
      this.context.lineTo(end_x, end_y);

      this.context.stroke();
    }
  }

  static drawXGrid(spacing: number): void {
    const dark = ElementUtils.getCssVariableValue("--dark");
    const qty = Math.round(this.info.width / spacing);

    for (let i = 1; i < qty; i++) {
      const start_x = 0;
      const end_x = this.info.width;
      const start_y = i * spacing;
      const end_y = i * spacing;

      this.context.strokeStyle = dark;

      this.context.beginPath();

      this.context.moveTo(start_x, start_y);
      this.context.lineTo(end_x, end_y);

      this.context.stroke();
    }
  }

  static drawGrid({
    x_spacing,
    y_spacing,
  }: { x_spacing?: number; y_spacing?: number } = {}): void {
    const x = x_spacing || GameSettingsData.block_size;
    const y = y_spacing || GameSettingsData.block_size;

    this.drawXGrid(x);

    this.drawYGrid(y);
  }
}

export default CanvasUtils;

import { ICanvasInfo } from "~/lib/interfaces";
import { Food, Snake, SnakeSegment } from "~/lib/models";
import { GameSettingsData } from "~/lib/data";
import ElementUtils from "./element";

abstract class CanvasUtils {
  private static getCanvasContext(
    canvas: HTMLCanvasElement
  ): CanvasRenderingContext2D {
    return canvas.getContext("2d") || ({} as CanvasRenderingContext2D);
  }

  static get canvas(): HTMLCanvasElement {
    return ElementUtils.getCanvas();
  }

  static get context(): CanvasRenderingContext2D {
    return this.getCanvasContext(this.canvas);
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

  private static drawBackground(canvas_info: ICanvasInfo): void {
    const lightest = ElementUtils.getCssVariableValue("--lightest");

    this.context.fillStyle = lightest;

    this.context.fillRect(0, 0, canvas_info.width, canvas_info.height);
  }

  private static drawLine(
    start_x: number,
    end_x: number,
    start_y: number,
    end_y: number,
    color: string
  ): void {
    this.context.strokeStyle = color;

    this.context.beginPath();

    this.context.moveTo(start_x, start_y);
    this.context.lineTo(end_x, end_y);

    this.context.stroke();
  }

  private static drawSnakeSegment(
    snake: SnakeSegment,
    size: number,
    half_block: number
  ): void {
    const dark = ElementUtils.getCssVariableValue("--dark");

    this.context.fillStyle = dark;

    this.context.fillRect(
      snake.x - half_block,
      snake.y - half_block,
      size,
      size
    );
  }

  static drawFood(food: Food, size: number, half_block: number): void {
    const dark = ElementUtils.getCssVariableValue("--dark");

    this.context.fillStyle = dark;

    this.context.fillRect(food.x - half_block, food.y - half_block, size, size);
  }

  static drawYGrid(spacing: number): void {
    const dark = ElementUtils.getCssVariableValue("--dark");
    const qty = Math.round(this.info.width / spacing);

    for (let i = 1; i < qty; i++) {
      const x_spacing = i * spacing;
      const start_x = x_spacing;
      const end_x = x_spacing;
      const start_y = 0;
      const end_y = this.info.height;

      this.drawLine(start_x, end_x, start_y, end_y, dark);
    }
  }

  static drawXGrid(spacing: number): void {
    const dark = ElementUtils.getCssVariableValue("--dark");
    const qty = Math.round(this.info.width / spacing);

    for (let i = 1; i < qty; i++) {
      const y_spacing = i * spacing;
      const start_x = 0;
      const end_x = this.info.width;
      const start_y = y_spacing;
      const end_y = y_spacing;

      this.drawLine(start_x, end_x, start_y, end_y, dark);
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

  static drawSnake(snake: Snake): void {
    const info = CanvasUtils.info;

    CanvasUtils.drawBackground(info);

    CanvasUtils.drawGrid();

    snake.body.forEach(segment =>
      CanvasUtils.drawSnakeSegment(
        segment,
        GameSettingsData.block_size,
        GameSettingsData.half_block
      )
    );
  }
}

export default CanvasUtils;

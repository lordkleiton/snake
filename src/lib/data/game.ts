import { DirectionsEnum } from "~/lib/enums";
import { SnakeSegment } from "~/lib/models";
import { CanvasUtils, SnakeUtils } from "~/lib/utils";
import { ICoordinates } from "~/lib/interfaces";
import GameSettingsData from "./game_settings";

class GameData {
  snake_direction: DirectionsEnum = DirectionsEnum.right;

  private static _instance: GameData;
  private _snake: SnakeSegment;
  private _canvas_info = CanvasUtils.info;
  private _block_size = GameSettingsData.block_size;
  private _half_block = GameSettingsData.half_block;
  private _movement_speed = GameSettingsData.movement_speed;

  private constructor() {
    const { x, y } = this.getInitialSnakeCoordinates();

    const snake = new SnakeSegment(x, y);

    this._snake = snake;
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  startGame() {
    const tick_time = 90;

    const gameTick = () => {
      const current_snake = SnakeUtils.handlePositioning(
        this._snake,
        this._half_block,
        this.snake_direction,
        this._canvas_info
      );

      CanvasUtils.drawBackground(this._canvas_info);

      CanvasUtils.drawGrid();

      CanvasUtils.drawSnake(current_snake, this._block_size, this._half_block);

      this._snake = SnakeUtils.handleAcceleration(
        current_snake,
        this.snake_direction,
        this._movement_speed
      );

      setTimeout(gameTick, tick_time);
    };

    setTimeout(gameTick, tick_time);
  }

  private transformCoordinate(axis_size: number): number {
    const units = axis_size / this._block_size;
    const units_half = Math.floor(units / 2);
    const axis_half = units_half * this._block_size;
    const correct_position = axis_half - this._half_block;

    return correct_position;
  }

  private getInitialSnakeCoordinates(): ICoordinates {
    const { height, width } = this._canvas_info;
    const x = this.transformCoordinate(width);
    const y = this.transformCoordinate(height);

    return { x, y };
  }
}

export default GameData;

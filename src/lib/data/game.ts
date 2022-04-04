import { DirectionsEnum } from "~/lib/enums";
import { Snake } from "~/lib/models";
import { CanvasUtils, SnakeUtils } from "~/lib/utils";
import GameSettingsData from "./game_settings";

class GameData {
  snake_direction: DirectionsEnum = DirectionsEnum.right;

  private static _instance: GameData;
  private _snake: Snake;
  private _canvas_info = CanvasUtils.info;
  private _block_size = GameSettingsData.block_size;
  private _half_block = GameSettingsData.half_block;
  private _movement_speed = GameSettingsData.movement_speed;

  private constructor() {
    const snake = new Snake(
      this._canvas_info.width / 2 - this._half_block,
      this._canvas_info.height / 2 - this._half_block
    );

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
}

export default GameData;

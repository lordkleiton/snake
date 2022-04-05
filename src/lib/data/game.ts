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
    const head = SnakeUtils.generateFirstHead();
    const snake = new Snake(head);

    this._snake = snake;
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  startGame() {
    const tick_time = 100;
    this._snake.addSegment(this.snake_direction, this._block_size);
    this._snake.addSegment(this.snake_direction, this._block_size);
    this._snake.addSegment(this.snake_direction, this._block_size);
    this._snake.addSegment(this.snake_direction, this._block_size);
    this._snake.addSegment(this.snake_direction, this._block_size);
    this._snake.addSegment(this.snake_direction, this._block_size);

    const gameTick = () => {
      const head = this._snake.head;

      const current_head = SnakeUtils.handlePositioning(
        head,
        this._half_block,
        this.snake_direction,
        this._canvas_info
      );

      CanvasUtils.drawBackground(this._canvas_info);

      CanvasUtils.drawGrid();

      this._snake.body.forEach(segment =>
        CanvasUtils.drawSnake(segment, this._block_size, this._half_block)
      );

      const new_head = SnakeUtils.handleAcceleration(
        current_head,
        this.snake_direction,
        this._movement_speed
      );

      this._snake.updateBodyMovement(new_head);

      setTimeout(gameTick, tick_time);
    };

    setTimeout(gameTick, tick_time);
  }
}

export default GameData;

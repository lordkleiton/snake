import { DirectionsEnum } from "~/lib/enums";
import { Snake, Food } from "~/lib/models";
import { CanvasUtils, FoodUtils, SnakeUtils } from "~/lib/utils";
import GameSettingsData from "./game_settings";

class GameData {
  snake_direction: DirectionsEnum = DirectionsEnum.right;

  private static _instance: GameData;
  private _snake: Snake;
  private _food: Food;
  private _block_size = GameSettingsData.block_size;

  private constructor() {
    const head = SnakeUtils.generateFirstHead();
    const snake = new Snake(head);

    this._food = new Food(this._block_size / 2, this._block_size / 2);
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
      const current_head = SnakeUtils.getCurrentHead(
        this._snake,
        this.snake_direction
      );
      const next_head = SnakeUtils.getNextHead(
        current_head,
        this.snake_direction
      );
      const food_eaten = FoodUtils.collisionOccurred(this._food, next_head);

      CanvasUtils.drawSnake(this._snake);

      CanvasUtils.drawFood(
        this._food,
        GameSettingsData.block_size,
        GameSettingsData.half_block
      );

      if (food_eaten) {
        this._snake.addSegment(this.snake_direction, this._block_size);
      }

      const game_over = SnakeUtils.collisionOccurred(this._snake);

      if (game_over) console.log("game over");

      SnakeUtils.updateSnake(this._snake, next_head);

      setTimeout(gameTick, tick_time);
    };

    setTimeout(gameTick, tick_time);
  }
}

export default GameData;

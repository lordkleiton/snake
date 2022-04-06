import { DirectionsEnum } from "~/lib/enums";
import { Snake, Food } from "~/lib/models";
import { ElementUtils, CanvasUtils, FoodUtils, SnakeUtils } from "~/lib/utils";
import GameSettingsData from "./game_settings";

class GameData {
  snake_direction: DirectionsEnum = DirectionsEnum.right;

  private static _instance: GameData;
  private _snake: Snake;
  private _food: Food;
  private _tick_time: number = 100;
  private _food_tracker: number = 0;

  private constructor() {
    const head = SnakeUtils.generateFirstHead();
    const snake = new Snake(head);

    this._food = FoodUtils.generateFood(snake);
    this._snake = snake;
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public get tick_time(): number {
    return this._tick_time;
  }

  private handleGameSpeed(): void {
    this._food_tracker++;

    if (this._food_tracker % 5 === 0 && this._tick_time > 30) {
      this._tick_time -= 3;

      console.log("gotta go fast: ", this._tick_time);
    }
  }

  startGame() {
    const block_size = GameSettingsData.block_size;

    this._snake.addSegment(this.snake_direction, block_size);

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
        SnakeUtils.eat(this._snake, this._food);

        this.handleGameSpeed();

        ElementUtils.updateScore(this._food_tracker);

        this._food = FoodUtils.generateFood(this._snake);
      } else {
        SnakeUtils.updateSnake(this._snake, next_head);
      }

      const game_over = SnakeUtils.collisionOccurred(this._snake);

      if (game_over) {
        CanvasUtils.drawGameOver();

        return;
      }

      setTimeout(gameTick, this.tick_time);
    };

    setTimeout(gameTick, this.tick_time);
  }
}

export default GameData;

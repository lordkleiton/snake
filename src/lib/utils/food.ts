import { Food, Snake, SnakeSegment } from "~/lib/models";
import { GameSettingsData } from "~/lib/data";
import CanvasUtils from "./canvas";
import GameSettingsUtils from "./game_settings";

abstract class FoodUtils {
  static collisionOccurred(food: Food, next_head: SnakeSegment): boolean {
    return food.x == next_head.x && food.y == next_head.y;
  }

  static generateFood(snake: Snake): Food {
    const { height, width } = CanvasUtils.info;
    const { block_size, half_block } = GameSettingsData;
    const x_units = GameSettingsUtils.getTotalUnits(width);
    const y_units = GameSettingsUtils.getTotalUnits(height);
    let result: Food;

    do {
      const random_x = Math.random();
      const random_y = Math.random();
      const generated_x = Math.floor(random_x * x_units) + 1;
      const generated_y = Math.floor(random_y * y_units) + 1;
      const x = generated_x * block_size - half_block;
      const y = generated_y * block_size - half_block;

      result = { x, y };
    } while (this.collisionOccurred(result, snake.head));

    return result;
  }
}

export default FoodUtils;

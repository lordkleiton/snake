import { Food, SnakeSegment } from "~/lib/models";

abstract class FoodUtils {
  static collisionOccurred(food: Food, next_head: SnakeSegment): boolean {
    return food.x == next_head.x && food.y == next_head.y;
  }
}

export default FoodUtils;

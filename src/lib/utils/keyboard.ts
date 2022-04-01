import { GameData } from "~/lib/data";
import { DirectionsEnum } from "~/lib/enums";

abstract class KeyboardUtils {
  static keyboardHandler = (event: KeyboardEvent) => {
    const instance = GameData.Instance;

    switch (event.key) {
      case "ArrowDown":
        instance.snake_direction = DirectionsEnum.down;
        break;
      case "ArrowLeft":
        instance.snake_direction = DirectionsEnum.left;
        break;
      case "ArrowRight":
        instance.snake_direction = DirectionsEnum.right;
        break;
      case "ArrowUp":
        instance.snake_direction = DirectionsEnum.up;
        break;
      default:
        instance.snake_direction = instance.snake_direction;
    }
  };
}

export default KeyboardUtils;

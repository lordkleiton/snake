import { GameData } from "~/lib/data";
import { DirectionsEnum } from "~/lib/enums";

abstract class KeyboardUtils {
  static keyboardHandler = (event: KeyboardEvent) => {
    const { Instance: instance } = GameData;
    const { key } = event;
    const direction = instance.snake_direction;
    const down = "ArrowDown";
    const up = "ArrowUp";
    const left = "ArrowLeft";
    const right = "ArrowRight";

    if (direction != DirectionsEnum.left && key == right) {
      instance.snake_direction = DirectionsEnum.right;
    }

    if (direction != DirectionsEnum.right && key == left) {
      instance.snake_direction = DirectionsEnum.left;
    }

    if (direction != DirectionsEnum.up && key == down) {
      instance.snake_direction = DirectionsEnum.down;
    }

    if (direction != DirectionsEnum.down && key == up) {
      instance.snake_direction = DirectionsEnum.up;
    }
  };
}

export default KeyboardUtils;

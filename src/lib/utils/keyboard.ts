import { GameData } from "~/lib/data";
import { DirectionsEnum } from "~/lib/enums";
import DateUtils from "./date";

abstract class KeyboardUtils {
  private static _last_press: Date = new Date();

  static keyboardHandler = (event: KeyboardEvent) => {
    const { Instance: instance } = GameData;
    const now = new Date();
    const diff = DateUtils.getTimeDifferenceInMs(now, this._last_press);
    const time_to_compare = instance.tick_time / 3;

    if (diff < time_to_compare) return;

    this._last_press = now;

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

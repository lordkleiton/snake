import { GameData } from "~/lib/data";
import { DirectionsEnum } from "~/lib/enums";
import DateUtils from "./date";

abstract class KeyboardUtils {
  private static _last_press: Date;

  static keyboardHandler = (event: KeyboardEvent) => {
    const now = new Date();
    const { Instance: instance } = GameData;

    if (!this._last_press) {
      this._last_press = now;
    }

    const diff = DateUtils.getTimeDifferenceInMs(now, this._last_press);

    if (diff < instance.tick_time) return;

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

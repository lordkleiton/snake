import { Snake } from "~/lib/models";
import { DirectionsEnum } from "~/lib/enums";
import { ICanvasInfo } from "~/lib/interfaces";

abstract class SnakeUtils {
  static handleAcceleration(
    snake: Snake,
    snake_direction: DirectionsEnum,
    movement_speed: number
  ): Snake {
    switch (snake_direction) {
      case DirectionsEnum.down:
        return new Snake(snake.x, snake.y + movement_speed);
      case DirectionsEnum.up:
        return new Snake(snake.x, snake.y - movement_speed);
      case DirectionsEnum.left:
        return new Snake(snake.x - movement_speed, snake.y);
      case DirectionsEnum.right:
        return new Snake(snake.x + movement_speed, snake.y);
    }
  }

  static handleTeleport(
    snake: Snake,
    half_block: number,
    canvas_info: ICanvasInfo
  ): Snake {
    const top = snake.y - half_block;
    const bottom = snake.y + half_block;
    const right = snake.x + half_block;
    const left = snake.x - half_block;

    let result = snake;

    if (right < 0) {
      result = new Snake(canvas_info.width, snake.y);
    }

    if (left > canvas_info.width) {
      result = new Snake(0, snake.y);
    }

    if (bottom < 0) {
      result = new Snake(snake.x, canvas_info.height);
    }

    if (top > canvas_info.height) {
      result = new Snake(snake.x, 0);
    }

    return result;
  }

  static handleConstraints(
    snake: Snake,
    half_block: number,
    snake_direction: DirectionsEnum,
    canvas_info: ICanvasInfo
  ): Snake {
    const top = snake.y - half_block;
    const bottom = snake.y + half_block;
    const right = snake.x + half_block;
    const left = snake.x - half_block;

    let result = snake;

    if (
      snake_direction == DirectionsEnum.left ||
      snake_direction == DirectionsEnum.right
    ) {
      if (top <= 0) {
        result = new Snake(snake.x, half_block);
      }

      if (bottom >= canvas_info.height) {
        result = new Snake(snake.x, canvas_info.height - half_block);
      }
    }

    if (
      snake_direction == DirectionsEnum.up ||
      snake_direction == DirectionsEnum.down
    ) {
      if (left <= 0) {
        result = new Snake(half_block, snake.y);
      }

      if (right >= canvas_info.width) {
        result = new Snake(canvas_info.width - half_block, snake.y);
      }
    }

    return result;
  }

  static handlePositioning(
    snake: Snake,
    half_block: number,
    snake_direction: DirectionsEnum,
    canvas_info: ICanvasInfo
  ): Snake {
    let result = this.handleTeleport(snake, half_block, canvas_info);

    result = this.handleConstraints(
      result,
      half_block,
      snake_direction,
      canvas_info
    );

    return result;
  }
}

export default SnakeUtils;

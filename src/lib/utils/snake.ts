import { SnakeSegment, Snake, Food } from "~/lib/models";
import { DirectionsEnum } from "~/lib/enums";
import { ICanvasInfo } from "~/lib/interfaces";
import GameSettingsUtils from "./game_settings";
import CanvasUtils from "./canvas";
import { GameSettingsData } from "~/lib/data";

abstract class SnakeUtils {
  private static handleAcceleration(
    snake: SnakeSegment,
    snake_direction: DirectionsEnum,
    movement_speed: number
  ): SnakeSegment {
    switch (snake_direction) {
      case DirectionsEnum.down:
        return new SnakeSegment(snake.x, snake.y + movement_speed);
      case DirectionsEnum.up:
        return new SnakeSegment(snake.x, snake.y - movement_speed);
      case DirectionsEnum.left:
        return new SnakeSegment(snake.x - movement_speed, snake.y);
      case DirectionsEnum.right:
        return new SnakeSegment(snake.x + movement_speed, snake.y);
    }
  }

  private static handleTeleport(
    snake: SnakeSegment,
    half_block: number,
    canvas_info: ICanvasInfo
  ): SnakeSegment {
    const top = snake.y - half_block;
    const bottom = snake.y + half_block;
    const right = snake.x + half_block;
    const left = snake.x - half_block;

    let result = snake;

    // ponta direita sai da tela pela esquerda
    // "teleporta direita"
    if (right <= 0) {
      result = new SnakeSegment(canvas_info.width + half_block, snake.y);
    }

    // ponta esquerda sai da tela pela direita
    // "teleporta esquerda"
    if (left >= canvas_info.width) {
      result = new SnakeSegment(0 - half_block, snake.y);
    }

    // ponta de baixo sai por cima da tela
    // "teleporta baixo"
    if (bottom <= 0) {
      result = new SnakeSegment(snake.x, canvas_info.height + half_block);
    }

    // ponta de cima sai por baixo da tela
    // "teleporta cima"
    if (top >= canvas_info.height) {
      result = new SnakeSegment(snake.x, 0 - half_block);
    }

    return result;
  }

  private static handleConstraints(
    snake: SnakeSegment,
    half_block: number,
    snake_direction: DirectionsEnum,
    canvas_info: ICanvasInfo
  ): SnakeSegment {
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
        result = new SnakeSegment(snake.x, half_block);
      }

      if (bottom >= canvas_info.height) {
        result = new SnakeSegment(snake.x, canvas_info.height - half_block);
      }
    }

    if (
      snake_direction == DirectionsEnum.up ||
      snake_direction == DirectionsEnum.down
    ) {
      if (left <= 0) {
        result = new SnakeSegment(half_block, snake.y);
      }

      if (right >= canvas_info.width) {
        result = new SnakeSegment(canvas_info.width - half_block, snake.y);
      }
    }

    return result;
  }

  private static handlePositioning(
    snake: SnakeSegment,
    half_block: number,
    snake_direction: DirectionsEnum,
    canvas_info: ICanvasInfo
  ): SnakeSegment {
    let result = this.handleTeleport(snake, half_block, canvas_info);

    result = this.handleConstraints(
      result,
      half_block,
      snake_direction,
      canvas_info
    );

    return result;
  }

  static generateFirstHead(): SnakeSegment {
    const { height, width } = CanvasUtils.info;
    const x = GameSettingsUtils.getMiddleCoordinate(width);
    const y = GameSettingsUtils.getMiddleCoordinate(height);

    return { x, y };
  }

  static getCurrentHead(snake: Snake, direction: DirectionsEnum): SnakeSegment {
    const head = snake.head;
    const info = CanvasUtils.info;
    const current_head = this.handlePositioning(
      head,
      GameSettingsData.half_block,
      direction,
      info
    );

    return current_head;
  }

  static getNextHead(
    current_head: SnakeSegment,
    direction: DirectionsEnum
  ): SnakeSegment {
    const next_head = this.handleAcceleration(
      current_head,
      direction,
      GameSettingsData.movement_speed
    );

    return next_head;
  }

  static updateSnake(snake: Snake, next_head: SnakeSegment): void {
    snake.updateBodyMovement(next_head);
  }

  static collisionOccurred(snake: Snake): boolean {
    const { x, y } = snake.head;
    const body = snake.body.slice(1);
    const result = body.find(segment => segment.x == x && segment.y == y);

    return !!result;
  }

  static eat(snake: Snake, food: Food): void {
    snake.eat(food);
  }
}

export default SnakeUtils;

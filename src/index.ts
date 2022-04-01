import {
  CanvasUtils,
  ElementUtils,
  KeyboardUtils,
  SnakeUtils,
} from "~/lib/utils";
import { Snake } from "~/lib/models";
import { GameData } from "~/lib/data";

// canvas stuff
const canvas_info = CanvasUtils.info;

const instance = GameData.Instance;

window.document.addEventListener("keydown", KeyboardUtils.keyboardHandler);

// update screen

const gameTick = () => {
  const current_snake = SnakeUtils.handlePositioning(
    snake,
    half_block,
    instance.snake_direction,
    canvas_info
  );

  CanvasUtils.drawBackground(canvas_info);

  CanvasUtils.drawSnake(current_snake, block_size, half_block);

  snake = SnakeUtils.handleAcceleration(
    current_snake,
    instance.snake_direction,
    movement_speed
  );

  requestAnimationFrame(gameTick);
};

requestAnimationFrame(gameTick);

// outros

const block_size = ElementUtils.remToPixels(1);
const half_block = block_size / 2;
const movement_speed = block_size / 10;

let snake = new Snake(
  canvas_info.width / 2 - half_block,
  canvas_info.height / 2 - half_block
);

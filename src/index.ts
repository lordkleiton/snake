import { CanvasUtils, ElementUtils, SnakeUtils } from "~/lib/utils";
import { Snake } from "~/lib/models";
import { ICanvasInfo } from "~lib/interfaces";
import { DirectionsEnum } from "~/lib/enums";

// canvas stuff
const context = CanvasUtils.context;
const canvas_info = CanvasUtils.info;

// css stuff
const lightest = ElementUtils.getCssVariableValue("--lightest");
const darkest = ElementUtils.getCssVariableValue("--darkest");

// drawing stuff

const drawBackground = (
  canvas_info: ICanvasInfo,
  context: CanvasRenderingContext2D
) => {
  context.fillStyle = lightest;

  context.fillRect(0, 0, canvas_info.width, canvas_info.height);
};

const drawSnake = (
  snake: Snake,
  size: number,
  context: CanvasRenderingContext2D
) => {
  context.fillStyle = darkest;

  context.fillRect(snake.x - half_block, snake.y - half_block, size, size);

  context.fillStyle = "red";

  context.fillRect(snake.x - 5, snake.y - 5, 10, 10);
};

// movement stuff

let snake_direction: DirectionsEnum = DirectionsEnum.right;

const changeDirection = (direction: DirectionsEnum) => {
  if (snake_direction != direction) snake_direction = direction;
};

const keyboardHandler = (event: KeyboardEvent) => {
  switch (event.key) {
    case "ArrowDown":
      changeDirection(DirectionsEnum.down);
      break;
    case "ArrowLeft":
      changeDirection(DirectionsEnum.left);
      break;
    case "ArrowRight":
      changeDirection(DirectionsEnum.right);
      break;
    case "ArrowUp":
      changeDirection(DirectionsEnum.up);
      break;
    default:
      changeDirection(snake_direction);
  }
};

window.document.addEventListener("keydown", keyboardHandler);

// update screen

const gameTick = () => {
  drawBackground(canvas_info, context);

  const current_snake = SnakeUtils.handlePositioning(
    snake,
    half_block,
    snake_direction,
    canvas_info
  );

  drawSnake(current_snake, block_size, context);

  snake = SnakeUtils.handleAcceleration(
    current_snake,
    snake_direction,
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

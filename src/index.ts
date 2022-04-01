import { CanvasUtils, ElementUtils } from "~/lib/utils";
import { Snake } from "~/lib/models";

// canvas stuff
const canvas = CanvasUtils.canvas;
const context = CanvasUtils.context;
const sizes = ElementUtils.getElementSizes(canvas);

// css stuff
const lightest = ElementUtils.getCssVariableValue("--lightest");
const darkest = ElementUtils.getCssVariableValue("--darkest");

// drawing stuff

const drawBackground = (context: CanvasRenderingContext2D) => {
  context.fillStyle = lightest;

  context.fillRect(0, 0, sizes.width, sizes.height);
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

enum DirectionsEnum {
  left = "left",
  right = "right",
  up = "up",
  down = "down",
}

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

const handleSnakeAcceleration = (
  snake: Snake,
  snake_direction: DirectionsEnum,
  movement_speed: number
) => {
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
};

const handleSnakeTeleport = (
  snake: Snake,
  half_block: number,
  canvas: HTMLCanvasElement
) => {
  const top = snake.y - half_block;
  const bottom = snake.y + half_block;
  const right = snake.x + half_block;
  const left = snake.x - half_block;

  let result_snake = snake;

  if (right < 0) {
    result_snake = new Snake(canvas.width, snake.y);
  }

  if (left > canvas.width) {
    result_snake = new Snake(0, snake.y);
  }

  if (bottom < 0) {
    result_snake = new Snake(snake.x, canvas.height);
  }

  if (top > canvas.height) {
    result_snake = new Snake(snake.x, 0);
  }

  return result_snake;
};

const handleSnakeConstraints = (
  snake: Snake,
  half_block: number,
  snake_direction: DirectionsEnum,
  canvas: HTMLCanvasElement
) => {
  const top = snake.y - half_block;
  const bottom = snake.y + half_block;
  const right = snake.x + half_block;
  const left = snake.x - half_block;

  let snake_result = snake;

  if (
    snake_direction == DirectionsEnum.left ||
    snake_direction == DirectionsEnum.right
  ) {
    if (top <= 0) {
      snake_result = new Snake(snake.x, half_block);
    }

    if (bottom >= canvas.height) {
      snake_result = new Snake(snake.x, canvas.height - half_block);
    }
  }

  if (
    snake_direction == DirectionsEnum.up ||
    snake_direction == DirectionsEnum.down
  ) {
    if (left <= 0) {
      snake_result = new Snake(half_block, snake.y);
    }

    if (right >= canvas.width) {
      snake_result = new Snake(canvas.width - half_block, snake.y);
    }
  }

  return snake_result;
};

const gameTick = () => {
  drawBackground(context);

  snake = handleSnakeTeleport(snake, half_block, canvas);

  snake = handleSnakeConstraints(snake, half_block, snake_direction, canvas);

  drawSnake(snake, block_size, context);

  snake = handleSnakeAcceleration(snake, snake_direction, movement_speed);

  requestAnimationFrame(gameTick);
};

requestAnimationFrame(gameTick);

// outros

const block_size = ElementUtils.remToPixels(1);
const half_block = block_size / 2;
const movement_speed = block_size / 10;

let snake = new Snake(
  canvas.width / 2 - half_block,
  canvas.height / 2 - half_block
);

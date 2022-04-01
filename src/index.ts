import { CanvasUtils, ElementUtils } from "~/lib/utils";

// canvas stuff
const canvas = CanvasUtils.canvas;
const context = CanvasUtils.context;
const sizes = ElementUtils.getElementSizes(canvas);

// css stuff
const lightest = ElementUtils.getCssVariableValue("--lightest");

// drawing stuff

const drawBackground = () => {
  context.fillStyle = lightest;

  context.fillRect(0, 0, sizes.width, sizes.height);
};

// movement stuff

enum DirectionsEnum {
  left = "left",
  right = "right",
  up = "up",
  down = "down",
}

let snake_direction: DirectionsEnum = DirectionsEnum.left;

const changeDirection = (direction: DirectionsEnum) => {
  if (snake_direction != direction) snake_direction = direction;

  console.log(direction);
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
  drawBackground();

  requestAnimationFrame(gameTick);
};

requestAnimationFrame(gameTick);

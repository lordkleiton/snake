import { CanvasUtils, ElementUtils } from "~/lib/utils";

// canvas stuff
const canvas = CanvasUtils.canvas;
const context = CanvasUtils.context;
const sizes = ElementUtils.getElementSizes(canvas);

// css stuff
const lightest = ElementUtils.getCssVariableValue("--lightest");

// console.log(canvas);

// console.log(ElementUtils.rem_size_in_pixels);

// console.log(ElementUtils.remToPixels(10));

// console.log(ElementUtils.pixelsToRem(16));

// console.log(ElementUtils.getElementSizes(canvas));

// const gameTick = (a: number) => {
//   console.log(a);

//   requestAnimationFrame(gameTick);
// };

// requestAnimationFrame(gameTick);

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

const drawBackground = () => {
  context.fillStyle = lightest;

  context.fillRect(0, 0, sizes.width, sizes.height);
};

window.document.addEventListener("keydown", keyboardHandler);

const gameTick = () => {
  drawBackground();

  requestAnimationFrame(gameTick);
};

requestAnimationFrame(gameTick);

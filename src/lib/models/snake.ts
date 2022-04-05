import { DirectionsEnum } from "~/lib/enums";
import SnakeSegment from "./snake_segment";

class Snake {
  private _body: SnakeSegment[] = [];

  get body(): SnakeSegment[] {
    return [...this._body];
  }

  get head(): SnakeSegment {
    return this._body[0];
  }

  constructor(head: SnakeSegment) {
    this._body = [head];
  }

  updateBodyMovement(head: SnakeSegment): void {
    this._body.shift();

    this._body.unshift(head);
  }

  addSegment(direction: DirectionsEnum, block_size: number): void {
    const head = this.head;

    let new_segment: SnakeSegment;

    switch (direction) {
      case DirectionsEnum.up:
        new_segment = new SnakeSegment(head.x, head.y - block_size);
        break;
      case DirectionsEnum.down:
        new_segment = new SnakeSegment(head.x, head.y + block_size);
        break;
      case DirectionsEnum.left:
        new_segment = new SnakeSegment(head.x - block_size, head.y);
        break;
      case DirectionsEnum.right:
        new_segment = new SnakeSegment(head.x + block_size, head.y);
        break;
    }

    this._body.unshift(new_segment);
  }
}

export default Snake;

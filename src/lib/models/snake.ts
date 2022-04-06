import { DirectionsEnum } from "~/lib/enums";
import Food from "./food";
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
    const new_body: SnakeSegment[] = [];

    for (let i = 1; i < this._body.length; i++) {
      new_body.push(this._body[i - 1]);
    }

    new_body.unshift(head);

    this._body = new_body;
  }

  eat(food: Food): void {
    const new_head = food as SnakeSegment;

    this._body = [new_head, ...this._body];
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

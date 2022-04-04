import SnakeSegment from "./snake_segment";

class Snake {
  head: SnakeSegment;
  private _body: SnakeSegment[] = [];

  get body(): SnakeSegment[] {
    return [...this._body];
  }

  constructor(head: SnakeSegment) {
    this.head = head;
  }

  addNewHeadSegment(head: SnakeSegment): void {
    this._body = [this.head, ...this.body];

    this.head = head;
  }
}

export default Snake;

class SnakeSegment {
  constructor(readonly x: number, readonly y: number) {}

  static copy(segment: SnakeSegment): SnakeSegment {
    return { x: segment.x, y: segment.y };
  }
}

export default SnakeSegment;

import { ICoordinates } from "~/lib/interfaces";

class Food implements ICoordinates {
  constructor(readonly x: number, readonly y: number) {}
}

export default Food;

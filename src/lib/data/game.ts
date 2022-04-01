import { DirectionsEnum } from "~/lib/enums";

class GameData {
  snake_direction: DirectionsEnum = DirectionsEnum.right;

  private static _instance: GameData;

  private constructor() {}

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }
}

export default GameData;

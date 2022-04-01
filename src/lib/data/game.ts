class GameData {
  private static _instance: GameData;

  private constructor() {}

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }
}

export default GameData;

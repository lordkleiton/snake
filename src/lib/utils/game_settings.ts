import { GameSettingsData } from "~/lib/data";

abstract class GameSettingsUtils {
  static getMiddleCoordinate(axis_size: number): number {
    const units = axis_size / GameSettingsData.block_size;
    const units_half = Math.floor(units / 2);
    const axis_half = units_half * GameSettingsData.block_size;
    const correct_position = axis_half - GameSettingsData.half_block;

    return correct_position;
  }
}

export default GameSettingsUtils;

import { ElementUtils } from "~/lib/utils";

abstract class GameSettingsData {
  static readonly block_size = ElementUtils.remToPixels(0.5);
  static readonly half_block = this.block_size / 2;
  static readonly movement_speed = this.block_size;
}

export default GameSettingsData;

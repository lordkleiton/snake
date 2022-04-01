import { KeyboardUtils } from "~/lib/utils";
import { GameData } from "~/lib/data";

window.document.addEventListener("keydown", KeyboardUtils.keyboardHandler);

const instance = GameData.Instance;

instance.startGame();

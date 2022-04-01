import { ElementUtils } from "~/lib/utils";

const canvas = ElementUtils.getCanvas();

console.log(ElementUtils.rem_size_in_pixels);

console.log(ElementUtils.remToPixels(10));

console.log(ElementUtils.pixelsToRem(16));

console.log(ElementUtils.getElementSizes(canvas));

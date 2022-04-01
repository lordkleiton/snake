abstract class ElementUtils {
  static get rem_size_in_pixels(): number {
    return parseFloat(getComputedStyle(document.documentElement).fontSize);
  }

  static remToPixels(size: number): number {
    return this.rem_size_in_pixels * size;
  }

  static pixelsToRem(size: number): number {
    return size / this.rem_size_in_pixels;
  }

  static appendElementToBody(element: HTMLElement): void {
    const body = window.document.body;

    body.appendChild(element);
  }

  static getCanvas(): HTMLCanvasElement {
    const canvas = window.document.querySelector("#field");

    if (!canvas) {
      const new_canvas = window.document.createElement("canvas");

      new_canvas.id = "field";

      this.appendElementToBody(new_canvas);

      return new_canvas;
    }

    return canvas as HTMLCanvasElement;
  }

  static getElementSizes(element: HTMLElement) {
    return element.getBoundingClientRect();
  }
}

export default ElementUtils;

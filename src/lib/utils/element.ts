abstract class ElementUtils {
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
}

export default ElementUtils;

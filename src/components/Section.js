export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items || []; // Ensure items is an array
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item); // Pass item to the renderer function
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}

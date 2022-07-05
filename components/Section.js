export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  };

  addItem(item) {
    console.log('пришел объект для карточки ', item)
    console.log('контейнер', this._container)
    this._container.prepend(item);
  };

  render() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  };
}

export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  };

  addItem(item, order = 'prepend') {
    if(order === 'append'){
      this._container.append(item);
    } else{
      this._container.prepend(item);
    }

  };

  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }
}

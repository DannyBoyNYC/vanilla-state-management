class Component {
  constructor(selector, options) {
    this.selector = selector;
    this.data = options.data;
    this.template = options.template;
  }

  // Render the template into the DOM
  render() {
    var target = document.querySelector(this.selector);
    if (!target) return;
    target.innerHTML = this.template(this.data);
  }

  // Reactively update the data - @param {Object} obj The new data
  setData(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        this.data[key] = obj[key];
      }
    }
    this.render();
  }

  //  Get an immutable copy of the data
  getData() {
    return JSON.parse(JSON.stringify(this.data));
  }
}

import { ComponenteReactivo, CustomElement } from "../Utils/reactivity.js";

const dashboardElements = (config = {}) => {
  return {
    parent: CustomElement.create(
      "div",
      {
        className:
          "bg-green-200 w-full h-full flex justify-center items-center",
        id: "Dashboard",
      },
      [
        CustomElement.create(
          "h1",
          { className: "font-sans font-bold text-5xl", innerHTML: "Dashboard" },
          []
        ),
      ]
    ),
  };
};

function _Dashboard(elements) {
  this.state = {
    state1: "state1",
  };
  this.element = elements.parent;
  this.parent = elements.parent;

  this.template = function () {
    const state = JSON.parse(JSON.stringify(this.state));
    const { state1 } = state;

    return [this.parent];
  };
}
_Dashboard.prototype = Object.create(ComponenteReactivo.prototype);
_Dashboard.prototype.constructor = _Dashboard;

const Dashboard = ((config = {}) => {
  const elements = dashboardElements(config);
  const component = new _Dashboard(elements);

  return {
    container: () => elements.parent,
    elements: () => elements,
    get: (elementName) => elements[elementName],
    getComponent: () => component,
  };
})();
export { Dashboard };

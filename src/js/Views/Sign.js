import { ComponenteReactivo, CustomElement } from "../Utils/reactivity.js";
import { Login } from "./Login.js";

const signElements = (config = {}) => {
  return {
    parent: CustomElement.create("div", {
      className: "w-full h-full bg-blue-500",
      id: "Sign",
    }),
    form: CustomElement.create("div", {
      className: "w-1/2 h-full bg-red-500",
      id: "Sign",
    }), //Login.container, //|| Register.Container,
  };
};

function _Sign(elements) {
  this.state = {
    currentForm: false,
  };

  this.element = elements.parent;
  this.form = elements.form;

  this.template = function () {
    const state = JSON.parse(JSON.stringify(this.state));
    const { currentForm } = state;
    return [this.form];
  };
}
_Sign.prototype = Object.create(ComponenteReactivo.prototype);
_Sign.prototype.constructor = _Sign;

const Sign = ((config = {}) => {
  const elements = signElements(config);
  elements.parent.appendChild(elements.form);

  const component = new _Sign(elements);
  component.render();

  return {
    container: () => elements.parent,
    elements: () => elements,
    changeForm: (form) => component.setState({ form: form }),
    get: (elementName) => elements[elementName],
  };
})();
export { Sign };

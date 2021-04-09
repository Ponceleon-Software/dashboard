import { ComponenteReactivo, CustomElement } from "../../Utils/reactivity.js";
import { Login } from "../../Components/Login/Login.js";
import { Register } from "../../Components/Register.js";
import { switchView } from "./Sign_utilities.js";
const signElements = (config = {}) => {
  return {
    parent: CustomElement.create(
      "div",
      { className: "bg-purple-500 w-3/4 h-full", id: "Sign" },
      []
    ),
    form: Login.get("form"), //Login.container, //|| Register.Container,
  };
};

function _Sign(elements) {
  this.state = {
    currentForm: Login.get("form"),
  };
  this.element = elements.parent;
  this.form = elements.form;

  this.template = function () {
    const state = JSON.parse(JSON.stringify(this.state));
    const { currentForm } = state;
    this.form = this.state.currentForm;
    return [this.form];
  };
}
_Sign.prototype = Object.create(ComponenteReactivo.prototype);
_Sign.prototype.constructor = _Sign;

const Sign = (config = {}) => {
  const elements = signElements(config);
  elements.parent.appendChild(elements.form);
  const component = new _Sign(elements);
  switchView(component, Register.getComponent(), Login.getComponent());
  return {
    container: () => elements.parent,
    elements: () => elements,
    changeForm: (form) => component.setState({ form: form }),
    get: (elementName) => elements[elementName],
    //switch: () => switchView(component, Register, Login),
  };
};
export { Sign };

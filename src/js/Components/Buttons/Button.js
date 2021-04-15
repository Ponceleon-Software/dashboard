import { ComponenteReactivo, CustomElement } from "../../Utils/reactivity.js";

const buttonElements = (
  config = {
    buttonText: "text",
    action: "undefined",
    id: "id_here",
    className: "",
    type: "button",
    form: "",
  }
) => {
  const { className, buttonText, id, type, form } = config;

  const C = CustomElement;
  const button_config = {
    className: `btn ${className}`,
    innerHTML: buttonText,
    id: id,
    type: type,
  };
  let stopReload;
  if (config.type == "submit")
    stopReload = (e) => {
      e.preventDefault();
      var ele = document.getElementById(form);
      var chk_status = ele.checkValidity();
      ele.reportValidity();
    };

  return {
    button: C.create("button", button_config, [], stopReload),
  };
};

function _Button(elements) {
  this.state = {
    isDisabled: false,
    action: () => console.log(`Click desde el botón ${this}`),
    isLoading: false,
  };
  this.element = elements.button;

  this.template = function () {
    const state = JSON.parse(JSON.stringify(this.state));
    const { isDisabled, action, isLoading } = state;
    return [this.button];
  };
}

_Button.prototype = Object.create(ComponenteReactivo.prototype);
_Button.prototype.constructor = _Button;

const Button = (config = {}) => {
  const elements = buttonElements(config);
  const component = new _Button(elements);
  return {
    container: () => elements.element,
    elements: () => elements,
    get: (elementName) => elements[elementName],
    getComponent: () => component,
  };
};
export { Button };

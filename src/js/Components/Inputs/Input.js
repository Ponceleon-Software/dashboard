import { ComponenteReactivo, CustomElement } from "../../Utils/reactivity.js";
import { initValidateInput } from "./input_Utilities.js";

const inputElements = (
  config = {
    type: "text",
    placeholder: "placeholder aquí",
    labelText: "Titulo",
    className: "w-full",
    fieldsetClass: "w-3/4",
    hasLabel: true,
    pattern: "",
    isRequired: false,
    name: "",
  }
) => {
  const { labelText } = config;
  const pattern = config.pattern || "";
  if (pattern) config.pattern = pattern;
  config.className =
    `${
      config.className ? config.className : " "
    } input input-bordered w-full` || "w-full";
  config.fieldsetClass = config.fieldsetClass || "w-3/4";

  const C = CustomElement;
  return {
    parent: C.create("fieldset", { className: config.fieldsetClass }),
    label: C.create("label", { className: "label" }, [
      C.create("span", {
        className: "label-text font-bold font-sans",
        innerHTML: labelText,
      }),
    ]),
    input: C.create("input", config),
  };
};

function _Input(elements) {
  this.state = {
    isValid: false,
    type: "text",
    placeholder: "placeholder",
    labelText: "Titulo",
  };
  this.parent = elements.parent;
  this.label = elements.label;
  this.input = elements.input;
  this.element = elements.parent.append(elements.label, elements.input);

  this.template = function () {
    const state = JSON.parse(JSON.stringify(this.state));
    const { isValid, type, placeholder, labelText } = state;
    return [this.parent, this.label, this.input];
  };
}

_Input.prototype = Object.create(ComponenteReactivo.prototype);
_Input.prototype.constructor = _Input;

const Input = (config = {}) => {
  const elements = inputElements(config);
  const component = new _Input(elements);
  initValidateInput(elements.input);
  return {
    container: () => elements.element,
    elements: () => elements,
    get: (elementName) => elements[elementName],
    getComponent: () => component,
  };
};
export { Input };

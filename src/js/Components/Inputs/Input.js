import { ComponenteReactivo, CustomElement } from "../../Utils/reactivity.js";

const inputElements = (
  config = {
    type: "text",
    placeholder: "placeholder aquí",
    labelText: "Titulo",
    className: "w-full",
    fieldsetClass: "w-3/4",
    hasLabel: true,
    pattern: "",
  }
) => {
  const { type, pattern, placeholder, labelText } = config;
  const className = config.className ? config.className : "w-full";
  const fieldsetClass = config.fieldsetClass ? config.fieldsetClass : "w-3/4";
  const C = CustomElement;
  return {
    parent: C.create("fieldset", { className: fieldsetClass }),
    label: C.create("label", { className: "label" }, [
      C.create("span", {
        className: "label-text font-bold font-sans",
        innerHTML: labelText,
      }),
    ]),
    input: C.create("input", {
      pattern: pattern,
      type: type,
      className: `${className} input input-bordered`,
      placeholder: placeholder,
    }),
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
  return {
    container: () => elements.element,
    elements: () => elements,
    get: (elementName) => elements[elementName],
    getComponent: () => component,
  };
};
export { Input };

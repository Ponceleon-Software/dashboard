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
    name: "heregoesthename",
  }
) => {
  const { type, placeholder, labelText, isRequired, name } = config;
  const pattern = config.pattern ? config.pattern : "";
  const className = config.className ? config.className : "w-full";
  const fieldsetClass = config.fieldsetClass ? config.fieldsetClass : "w-3/4";
  const inputConfig = {
    name: name,
    fieldsetClass: fieldsetClass,
    required: isRequired,
    type: type,
    className: `${className} input input-bordered`,
    placeholder: placeholder,
  };
  if (pattern) inputConfig.pattern = pattern;
  let stopReload = (e) => {
    e.preventDefault();
    console.log(e.target);
    var ele = e;
    console.log(ele);
    var chk_status = ele.checkValidity();
    ele.reportValidity();
  };
  const C = CustomElement;
  return {
    parent: C.create("fieldset", { className: fieldsetClass }),
    label: C.create("label", { className: "label" }, [
      C.create("span", {
        className: "label-text font-bold font-sans",
        innerHTML: labelText,
      }),
    ]),
    inputDiv: C.create("div", { className: "flex space-x-2" }),
    input: C.create("input", inputConfig),
    hint: C.create(
      "button",
      { className: "btn btn-circle btn-xs bg-red-500 inline flex" },
      [
        C.fromHTML(
          '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-4 h-4 stroke-current"><path stroke-linecap="round" stroke-linejoin="round"stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>'
        ),
      ],
      stopReload
    ),
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
  this.inputDiv = elements.inputDiv;
  elements.inputDiv.append(elements.input, elements.hint);
  this.hint = elements.hint;
  this.label = elements.label;
  this.input = elements.input;
  this.element = elements.parent.append(elements.label, elements.inputDiv);

  this.template = function () {
    const state = JSON.parse(JSON.stringify(this.state));
    const { isValid, type, placeholder, labelText } = state;
    return [this.parent, this.label, this.input, this.hint];
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

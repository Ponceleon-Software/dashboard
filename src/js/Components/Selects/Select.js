import { ComponenteReactivo, CustomElement } from "../../Utils/reactivity.js";

const selectElements = (
  config = {
    selectName: "Nombre",
    labelText: "Titulo",
    className: "w-full",
    fieldsetClass: "w-3/4",
    hasLabel: true,
    options: [],
  }
) => {
  const { hasLabel, selectName, labelText, options } = config;
  const className = config.className ? config.className : "w-full";
  const fieldsetClass = config.fieldsetClass ? config.fieldsetClass : "w-3/4";
  const C = CustomElement;
  const optionsElements = options.map((e, i, a) => {
    const option = C.create("option", { value: e, innerHTML: e });
    return option;
  });
  const elements = {
    parent: C.create("fieldset", { className: fieldsetClass }),
    label: C.create("label", { className: "label" }, [
      C.create("span", {
        className: "label-text font-bold font-sans",
        innerHTML: labelText,
      }),
    ]),
    select: C.create(
      "select",
      {
        name: selectName,
        className: `${className} input input-bordered`,
      },
      [...optionsElements]
    ),
  };
  if (!hasLabel) delete elements.label;

  return elements;
};

function _Select(elements) {
  this.state = {
    selectName: "Nombre",
    labelText: "Titulo",
    className: "w-full",
    fieldsetClass: "w-3/4",
  };
  this.parent = elements.parent;
  this.select = elements.select;
  if (elements.label) elements.parent.append(elements.label);
  this.element = elements.parent.append(elements.select);

  this.template = function () {
    const state = JSON.parse(JSON.stringify(this.state));
    const { selectName, labelText, className, fieldsetClass } = state;
    return [this.parent, this.label, this.select];
  };
}

_Select.prototype = Object.create(ComponenteReactivo.prototype);
_Select.prototype.constructor = _Select;

const Select = (config = {}) => {
  const elements = selectElements(config);
  const component = new _Select(elements);
  return {
    container: () => elements.element,
    elements: () => elements,
    get: (elementName) => elements[elementName],
    getComponent: () => component,
  };
};
export { Select };

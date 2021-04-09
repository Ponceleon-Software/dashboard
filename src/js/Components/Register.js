import { ComponenteReactivo, CustomElement } from "../Utils/reactivity.js";
/* import { title } from "../Components/Title.js";
import { form } from "../Components/Form.js"; */

/**
 * Agrupa todos los elementos que definen el Componente de Login
 * Hace uso de los siguientes componentes hijos:
 * @typedef {ComponenteReactivo} title
 * @typedef {ComponenteReactivo} form
 *
 * @param {any} config Un objeto con datos que condicionen la creación
 * de los elementos
 */

const registerElements = (config = {}) => {
  return {
    form: CustomElement.create(
      "div",
      { className: "bg-green-300 w-96 h-96", id: "register" },
      []
    ), //Login.container, //|| Register.Container,
  };
};

function _Register(elements) {
  this.state = {
    isValidRegister: false,
  };
  this.element = elements.form;
  this.form = elements.form;

  this.template = function () {
    const state = JSON.parse(JSON.stringify(this.state));
    const { isValidRegister } = state;
    return [this.form];
  };
}
_Register.prototype = Object.create(ComponenteReactivo.prototype);
_Register.prototype.constructor = _Register;

const Register = ((config = {}) => {
  const elements = registerElements(config);
  const component = new _Register(elements);

  return {
    container: () => elements.form,
    elements: () => elements,
    changeForm: (form) => component.setState({ form: form }),
    get: (elementName) => elements[elementName],
    getComponent: () => component,
  };
})();
export { Register };

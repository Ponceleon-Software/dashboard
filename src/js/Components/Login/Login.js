import { ComponenteReactivo, CustomElement } from "../../Utils/reactivity.js";
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

const loginElements = (config = {}) => {
  return {
    form: CustomElement.create(
      "div",
      { className: "bg-red-300 w-96 h-96", id: "Login" },
      []
    ),
    button: CustomElement.create(
      "button",
      { className: "bg-yellow-300 w-12 h-12", id: "Iniciar_sesion" },
      []
    ), //Login.container, //|| Register.Container,
  };
};

function _Login(elements) {
  this.state = {
    isValid: false,
  };
  this.form = elements.form;
  this.button = elements.button;
  this.element = elements.form.appendChild(elements.button);

  this.template = function () {
    const state = JSON.parse(JSON.stringify(this.state));
    const { isValid } = state;
    return [this.form, this.button];
  };
}
_Login.prototype = Object.create(ComponenteReactivo.prototype);
_Login.prototype.constructor = _Login;

const Login = ((config = {}) => {
  const elements = loginElements(config);
  const component = new _Login(elements);
  return {
    container: () => elements.element,
    elements: () => elements,
    changeForm: (form) => component.setState({ form: form }),
    get: (elementName) => elements[elementName],
    getComponent: () => component,
  };
})();
export { Login };

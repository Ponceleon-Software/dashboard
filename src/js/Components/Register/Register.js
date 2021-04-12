import { ComponenteReactivo, CustomElement } from "../../Utils/reactivity.js";
import { RegisterForm } from "../Forms/RegsiterForm.js";

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
  const C = CustomElement;
  return {
    parent: C.create(
      "div",
      {
        className:
          "py-4 artboard artboard-demo bg-base-300 w-1/2 h-full form-control flex flex-col rounded-none",
        id: "Register",
      },
      []
    ),
    form: RegisterForm,
    logo: C.create(
      "div",
      {
        className: "w-full h-20 flex items-center",
      },
      [
        C.create(
          "img",
          {
            className: "h-16",
            src: "../../../src/assets/img/logo-ponceleon.svg",
          },
          []
        ),
      ]
    ),
    title: C.create("h1", {
      className: "text-5xl font-bold font-sans  my-10",
      innerHTML: "Registrarse",
    }),
  };
};

function _Register(elements) {
  this.state = {
    isValidRegister: false,
  };
  this.parent = elements.parent;
  this.form = elements.form;
  this.logo = elements.logo;
  this.title = elements.title;
  this.element = elements.parent.append(
    elements.logo,
    elements.title,
    elements.form.get("form")
  );

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

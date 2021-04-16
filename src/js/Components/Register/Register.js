import { ComponenteReactivo, CustomElement } from "../../Utils/reactivity.js";
import { RegisterForm } from "../Forms/RegisterForm.js";
import { samePasswords } from "../Forms/registerForm_Utilities.js";

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
          "py-4 artboard artboard-demo bg-base-200 w-1/2 h-full form-control flex flex-col rounded-none",
        id: "Register",
      },
      []
    ),
    form: RegisterForm,
    logo: C.create(
      "div",
      {
        className: "w-4/5 h-20 mt-5 flex items-center",
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
      className: "text-3xl font-bold font-sans  mt-6 mb-3",
      innerHTML: "Registrarse",
    }),
    alreadyHaveAccount: C.create(
      "p",
      { className: "mt-3 text-xs", innerHTML: "¿Ya Tienes una cuenta?" },
      [
        C.create("a", {
          className: "font-bold cursor-pointer underline",
          innerHTML: "Iniciar Sesión",
        }),
      ]
    ),
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
  this.alreadyHaveAccount = elements.alreadyHaveAccount;
  this.element = elements.parent.append(
    elements.logo,
    elements.title,
    elements.form.get("form"),
    elements.alreadyHaveAccount
  );

  this.template = function () {
    const state = JSON.parse(JSON.stringify(this.state));
    const { isValidRegister } = state;
    return [
      this.form,
      this.logo,
      this.parent,
      this.title,
      this.alreadyHaveAccount,
    ];
  };
}
_Register.prototype = Object.create(ComponenteReactivo.prototype);
_Register.prototype.constructor = _Register;

const Register = ((config = {}) => {
  const elements = registerElements(config);
  const component = new _Register(elements);
  samePasswords();

  return {
    container: () => elements.element,
    elements: () => elements,
    get: (elementName) => elements[elementName],
    getComponent: () => component,
  };
})();
export { Register };

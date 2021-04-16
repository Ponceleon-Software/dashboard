import { ComponenteReactivo, CustomElement } from "../../Utils/reactivity.js";
import { RegisterForm } from "../Forms/RegisterForm.js";
import { samePasswords } from "../Forms/registerForm_Utilities.js";

/**
 * Regresa el objeto con los elementos hijos del Componente de Register
 * @type {function}
 * @param {Object} config Define las propiedades asociadas a los elementos creados dentro de este Componente
 * @returns {Object}
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

/**
 * Definición del estado de Register
 * @typedef {Object} Register_state
 * @property {Boolean} isValidRegister
 */

/**
 * Define las propiedades del estado del Componente Register y regresa en el template los elementos hijos del Componente
 * @param {Object} elements Objeto con los elementos del
 * @property {HTMLElement} parent Div Contenedor Padre de los componentes de Register
 * @property {HTMLElement} form Formulario de inicio de sesión
 * @property {HTMLElement} logo Logo de la empresa
 * @property {HTMLElement} title Titulo del Formulario
 * @property {HTMLElement} alreadyHaveAccount Link para cambiar a  la vista de Login
 * @property {HTMLElement} element Contenedor de los elementos de Register que servirá para instanciar el componente
 * @param {Register_state} state Estado inicial del componente
 */

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

/**
 * Definición del tipo RegisterMethods
 * @typedef {Object} RegisterMethods
 * @property {HTMLElement} container - Contenedor Padre
 * @property {HTMLElement[]} elements - Array de los elementos del Componente
 * @property {function(string):HTMLElement}  get  Regresa un elemento de los hijos del componente
 * @property {ComponenteReactivo} getComponent Regresa el componente
 */

/**
 * Componente con la vista de Registro
 * @type {ComponenteReactivo}
 * @param {Object} config Configuración para instanciar el Componente
 * @returns {RegisterMethods}
 */

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

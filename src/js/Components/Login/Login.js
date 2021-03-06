/**
 * @file Define el Componente de Login
 * @author Cesar Pérez
 */

import { ComponenteReactivo, CustomElement } from "../../Utils/reactivity.js";
import { LoginForm } from "../Forms/LoginForm.js";

/**
 * Regresa el objeto con los elementos hijos del Componente de Login
 * @type {function}
 * @param {Object} config Define las propiedades asociadas a los elementos creados dentro de este Componente
 * @returns {Object}
 */

const loginElements = (config = {}) => {
  const C = CustomElement;
  return {
    parent: C.create(
      "div",
      {
        className:
          "py-4 artboard artboard-demo bg-base-200 w-full md:w-1/2 h-full form-control flex flex-col rounded-none",
        id: "Login",
      },
      []
    ),
    form: LoginForm,
    logo: C.create(
      "div",
      {
        className: "w-4/5 h-20 flex items-center",
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
      className: "text-3xl font-bold font-sans  my-10",
      innerHTML: "Iniciar Sesión",
    }),
    dontHaveAccount: C.create(
      "p",
      { innerHTML: "¿Aún no tienes una cuenta? " },
      [
        C.create("a", {
          className: "font-bold cursor-pointer underline",
          innerHTML: "Regístrate",
        }),
      ]
    ),
  };
};

/**
 * Definición del estado de Login
 * @typedef {Object} Login_state
 * @property {Boolean} isLogged
 */

/**
 * Define las propiedades del estado del Componente Login y regresa en el template los elementos hijos del Componente
 * @param {Object} elements Objeto con los elementos del
 * @property {HTMLElement} parent Div Contenedor Padre de los componentes de Login
 * @property {HTMLElement} form Formulario de inicio de sesión
 * @property {HTMLElement} logo Logo de la empresa
 * @property {HTMLElement} title Titulo del Formulario
 * @property {HTMLElement} dontHaveAccount Link para cambiar a la vista de Register
 * @param {Login_state} state Estado inicial del componente
 */
function _Login(elements) {
  this.state = {
    isLogged: false,
  };
  this.parent = elements.parent;
  this.form = elements.form;
  this.logo = elements.logo;
  this.title = elements.title;
  this.dontHaveAccount = elements.dontHaveAccount;
  this.element = elements.parent.append(
    elements.logo,
    elements.title,
    elements.form.get("form"),
    elements.dontHaveAccount
  );

  this.template = function () {
    const state = JSON.parse(JSON.stringify(this.state));
    const { isLogged } = state;
    return [
      this.form,
      this.logo,
      this.parent,
      this.title,
      this.dontHaveAccount,
    ];
  };
}
_Login.prototype = Object.create(ComponenteReactivo.prototype);
_Login.prototype.constructor = _Login;

/**
 * Definición del tipo LoginMethods
 * @typedef {Object} LoginMethods
 * @property {HTMLElement} container - Contenedor Padre
 * @property {HTMLElement[]} elements - Array de los elementos del Componente
 * @property {function(string):HTMLElement}  get  Regresa un elemento de los hijos del componente
 * @property {ComponenteReactivo} getComponent Regresa el componente
 */

/**
 * Componente con la Vista de inicio de Sesión
 * @type {ComponenteReactivo}
 * @param {Object} config Configuración para instanciar el Componente
 * @returns {LoginMethods}
 */
const Login = ((config = {}) => {
  const elements = loginElements(config);
  const component = new _Login(elements);

  return {
    container: () => elements.element,
    elements: () => elements,
    get: (elementName) => elements[elementName],
    getComponent: () => component,
  };
})();
export { Login };

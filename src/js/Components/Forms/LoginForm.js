import { ComponenteReactivo, CustomElement } from "../../Utils/reactivity.js";
import { Input } from "../Inputs/Input.js";
import { Button } from "../Buttons/Button.js";

/**
 * Regresa el objeto con los elementos hijos del Componente de LoginForm
 * @type {function}
 * @param {Object} config Define las propiedades asociadas a los elementos creados dentro de este Componente
 * @returns {Object}
 */

const loginFormElements = (config = {}) => {
  const C = CustomElement;
  const user_input = Input({
    type: "email",
    placeholder: "Correo Electrónico",
    labelText: "Correo Electrónico",
    isRequired: true,
  });
  const password_input = Input({
    type: "password",
    placeholder: "Contraseña",
    labelText: "Contraseña",
    isRequired: true,
  });
  const login_button = Button({
    buttonText: "Iniciar Sesión",
    action: "undefined",
    id: "btn_login",
    className: "mt-10 bg-black",
    type: "submit",
    form: "login_form",
  });

  return {
    form: C.create("form", {
      className:
        "h-3/5 bg-base-200 rounded-md w-3/5 flex flex-col items-center",
      id: "login_form",
    }),
    username_field: user_input.get("parent"),
    password_field: password_input.get("parent"),
    button: login_button.get("button"),
  };
};

/**
 * Definición del estado de LoginForm
 * @typedef {Object} LoginForm_state
 * @property {Boolean} allFieldsValid
 */

/**
 * Define las propiedades del estado del Componente Login y regresa en el template los elementos hijos del Componente
 * @param {Object} elements Objeto con los elementos del
 * @property {HTMLElement} form  Formulario de inicio de Sesión, Padre de los componentes de LoginForm
 * @property {HTMLElement} button Botón para iniciar sesión
 * @property {HTMLElement} username_field Input para correo Electrónico
 * @property {HTMLElement} password_field Input para contraseña
 * @param {LoginForm_state} state Estado inicial del componente
 */

function _LoginForm(elements) {
  this.state = {
    allFieldsValid: false,
  };
  this.form = elements.form;
  this.button = elements.button;
  this.username_field = elements.username_field;
  this.password_field = elements.password_field;
  elements.form.append(
    elements.username_field,
    elements.password_field,
    elements.button
  );
  this.element = elements.form;
  this.template = function () {
    const state = JSON.parse(JSON.stringify(this.state));
    const { allFieldsValid } = state;
    return [this.button, this.form, this.password_field, this.username_field];
  };
}
_LoginForm.prototype = Object.create(ComponenteReactivo.prototype);
_LoginForm.prototype.constructor = _LoginForm;

/**
 * Definición del tipo LoginFormMethods
 * @typedef {Object} LoginFormMethods
 * @property {HTMLElement} container - Contenedor Padre
 * @property {HTMLElement[]} elements - Array de los elementos del Componente
 * @property {function(string):HTMLElement} get  Regresa un elemento de los hijos del componente
 * @property {ComponenteReactivo} getComponent Regresa el componente
 */

/**
 * Componente con el Formulario para Inicio de Sesión
 * @type {ComponenteReactivo}
 * @param {Object} config Configuración para instanciar el Componente
 * @returns {LoginMethods}
 */

const LoginForm = ((config = {}) => {
  const elements = loginFormElements(config);
  const component = new _LoginForm(elements);

  return {
    container: () => elements.element,
    elements: () => elements,
    get: (elementName) => elements[elementName],
    getComponent: () => component,
  };
})();
export { LoginForm };

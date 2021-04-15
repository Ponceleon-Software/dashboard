import { ComponenteReactivo, CustomElement } from "../../Utils/reactivity.js";
import { Input } from "../Inputs/Input.js";
import { Button } from "../Buttons/Button.js";
import { getData } from "./loginForm_Utilities.js";

/**
 * Agrupa todos los elementos que definen el Componente de Login
 * Hace uso de los siguientes componentes hijos:
 * @typedef {ComponenteReactivo} title
 * @typedef {ComponenteReactivo} form
 *
 * @param {any} config Un objeto con datos que condicionen la creación
 * de los elementos
 */

const loginFormElements = (config = {}) => {
  const C = CustomElement;
  const user_input = Input({
    type: "email",
    placeholder: "Correo Electrónico",
    labelText: "Correo Electrónico",
    isRequired: true,
    name: "email",
  });
  const password_input = Input({
    type: "password",
    placeholder: "Contraseña",
    labelText: "Contraseña",
    isRequired: true,
    name: "password",
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

function _LoginForm(elements) {
  this.state = {
    allFieldsValid: true,
  };
  this.form = elements.form;
  elements.form.append(
    elements.username_field,
    elements.password_field,
    elements.button
  );
  this.element = elements.form;
  this.button = elements.button;
  this.template = function () {
    const state = JSON.parse(JSON.stringify(this.state));
    const { allFieldsValid } = state;
    return [this.button, this.form, this.password_field, this.username_field];
  };
}
_LoginForm.prototype = Object.create(ComponenteReactivo.prototype);
_LoginForm.prototype.constructor = _LoginForm;

const LoginForm = ((config = {}) => {
  const elements = loginFormElements(config);
  const component = new _LoginForm(elements);

  return {
    container: () => elements.element,
    elements: () => elements,
    get: (elementName) => elements[elementName],
    getElements: () => elements,
    getComponent: () => component,
    validateFields: () => true,
    getData: () => getData(),
  };
})();
export { LoginForm };

import { ComponenteReactivo, CustomElement } from "../../Utils/reactivity.js";
import { Input } from "../Inputs/Input.js";
import { Button } from "../Buttons/Button.js";
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

const loginFormElements = (config = {}) => {
  const C = CustomElement;
  const user_input = Input({
    type: "text",
    placeholder: "Nombre de Usuario",
    labelText: "Usuario",
  });
  const password_input = Input({
    type: "password",
    placeholder: "Contraseña",
    labelText: "Contraseña",
  });
  const login_button = Button({
    buttonText: "Iniciar Sesión",
    action: "undefined",
    id: "btn_login",
    className: "mt-10 bg-black",
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
    allFieldsValid: false,
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
    return [this.form, this.username_field, this.password_field, this.button];
  };
}
_LoginForm.prototype = Object.create(ComponenteReactivo.prototype);
_LoginForm.prototype.constructor = _LoginForm;

const LoginForm = ((config = {}) => {
  const elements = loginFormElements(config);
  const component = new _LoginForm(elements);

  return {
    container: () => elements.form,
    elements: () => elements,
    get: (elementName) => elements[elementName],
    getElements: () => elements,
    getComponent: () => component,
  };
})();
export { LoginForm };

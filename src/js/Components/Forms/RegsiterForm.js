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

const registerFormElements = (config = {}) => {
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
    className: "",
    fieldsetClass: "w-full",
  });
  const repeat_password_input = Input({
    type: "password",
    placeholder: "Repita la Contraseña",
    labelText: "Repetir Contraseña",
    className: "",
    fieldsetClass: "w-full",
  });
  const register_button = Button({
    buttonText: "Registrarme",
    action: "undefined",
    id: "btn_login",
    className: "mt-10 bg-black",
  });

  return {
    form: C.create("form", {
      className:
        "h-4/5 bg-base-200 rounded-md shadow-2xl w-3/5 flex flex-col justify-center items-center",
      id: "login_form",
    }),
    username_field: user_input.get("parent"),
    password_fields: C.create("div", { className: "flex w-3/4" }, [
      password_input.get("parent"),
      repeat_password_input.get("parent"),
    ]),
    button: register_button.get("button"),
  };
};

function _RegisterForm(elements) {
  this.state = {
    allFieldsValid: false,
  };
  this.form = elements.form;
  elements.form.append(
    elements.username_field,
    elements.password_fields,
    //elements.repeat_password_field,
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
_RegisterForm.prototype = Object.create(ComponenteReactivo.prototype);
_RegisterForm.prototype.constructor = _RegisterForm;

const RegisterForm = ((config = {}) => {
  const elements = registerFormElements(config);
  const component = new _RegisterForm(elements);

  return {
    container: () => elements.form,
    elements: () => elements,
    get: (elementName) => elements[elementName],
    getElements: () => elements,
    getComponent: () => component,
  };
})();
export { RegisterForm };

import { ComponenteReactivo, CustomElement } from "../../Utils/reactivity.js";
import { Input } from "../Inputs/Input.js";
import { Button } from "../Buttons/Button.js";
import { Select } from "../Selects/Select.js";

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
  const username_input = Input({
    type: "text",
    placeholder: "Nombre de Usuario",
    labelText: "Usuario",
  });
  const email_input = Input({
    type: "email",
    placeholder: "Dirección de correo",
    labelText: "Correo Electrónico",
  });
  const password_input = Input({
    type: "password",
    placeholder: "Contraseña",
    labelText: "Contraseña",
    fieldsetClass: "w-38",
  });
  const repeat_password_input = Input({
    type: "password",
    placeholder: "Repita la Contraseña",
    labelText: "Repetir Contraseña",
    fieldsetClass: "w-38",
  });
  const register_button = Button({
    buttonText: "Registrarme",
    action: "undefined",
    id: "btn_login",
    className: "mt-6 bg-black",
  });
  const phone_input = Input({
    type: "tel",
    placeholder: "456-7892",
    labelText: "Teléfono de Contacto",
    fieldsetClass: "w-2/3",
    pattern: "[0-9]{7}",
  });

  const phone_code_input = Select({
    selectName: "codigo_de_area",
    labelText: "Cod. País",
    className: "w-full",
    fieldsetClass: "w-1/3",
    hasLabel: true,
    options: ["🇻🇪+58", "🇨🇴+57"],
  });

  return {
    form: C.create("form", {
      className:
        "h-4/5 bg-base-200 rounded-md w-3/5 flex flex-col justify-center items-center",
      id: "login_form",
    }),
    username_field: username_input.get("parent"),
    password_fields: C.create(
      "div",
      { className: "flex justify-between items-center w-3/4" },
      [password_input.get("parent"), repeat_password_input.get("parent")]
    ),
    email_field: email_input.get("parent"),
    phone_fields: C.create(
      "div",
      { className: "flex justify-between items-end w-3/4" },
      [phone_code_input.get("parent"), phone_input.get("parent")]
    ),
    button: register_button.get("button"),
  };
};

function _RegisterForm(elements) {
  this.state = {
    allFieldsValid: false,
  };
  this.form = elements.form;
  this.password_fields = elements.password_fields;
  this.email_field = elements.email_field;
  this.phone_fields = elements.phone_field;
  elements.form.append(
    elements.username_field,
    elements.email_field,
    elements.password_fields,
    elements.phone_fields,
    elements.button
  );
  this.element = elements.form;
  this.button = elements.button;
  this.template = function () {
    const state = JSON.parse(JSON.stringify(this.state));
    const { allFieldsValid } = state;
    return [
      this.form,
      this.username_field,
      this.password_fields,
      this.email_field,
      this.button,
    ];
  };
}
_RegisterForm.prototype = Object.create(ComponenteReactivo.prototype);
_RegisterForm.prototype.constructor = _RegisterForm;

const RegisterForm = ((config = {}) => {
  const elements = registerFormElements(config);
  const component = new _RegisterForm(elements);

  return {
    container: () => elements.element,
    elements: () => elements,
    get: (elementName) => elements[elementName],
    getElements: () => elements,
    getComponent: () => component,
  };
})();
export { RegisterForm };

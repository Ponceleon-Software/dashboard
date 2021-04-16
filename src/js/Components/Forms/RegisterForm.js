import { ComponenteReactivo, CustomElement } from "../../Utils/reactivity.js";
import { Input } from "../Inputs/Input.js";
import { Button } from "../Buttons/Button.js";
import { Select } from "../Selects/Select.js";
import {
  validate_register_fields,
  getData,
  samePasswords,
} from "./registerForm_Utilities.js";

/**
 * @typedef {import('./registerForm_Utilities').RegisterData} RegisterData
 */

/**
 * Regresa el objeto con los elementos hijos del Componente de RegisterForm
 * @type {function}
 * @param {Object} config Define las propiedades asociadas a los elementos creados dentro de este Componente
 * @returns {Object}
 */

const registerFormElements = (config = {}) => {
  const C = CustomElement;
  const username_input = Input({
    type: "text",
    placeholder: "Nombre de Usuario",
    labelText: "Usuario",
    pattern: "^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$",
    isRequired: true,
    name: "user",
  });
  const email_input = Input({
    type: "email",
    placeholder: "Dirección de correo",
    labelText: "Correo Electrónico",
    isRequired: true,
    name: "email",
    pattern:
      "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$",
  });
  const password_input = Input({
    type: "password",
    placeholder: "Contraseña",
    labelText: "Contraseña",
    fieldsetClass: "w-38",
    name: "password",
    pattern: "", //regex: (?=^.{8,}$)((?=.*d)|(?=.*W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$   // min: 8char,1Uppercase,1symbol/number
    isRequired: true,
  });
  const repeat_password_input = Input({
    type: "password",
    placeholder: "Repita la Contraseña",
    labelText: "Repetir Contraseña",
    fieldsetClass: "w-38",
    name: "repeat_password",
    pattern: "",
    isRequired: true,
  });
  const register_button = Button({
    buttonText: "Registrarme",
    action: "undefined",
    id: "btn_register",
    className: "mt-6 bg-black",
    type: "submit",
    form: "register_form",
  });
  const phone_input = Input({
    type: "tel",
    placeholder: "456-7892",
    labelText: "Teléfono de Contacto",
    fieldsetClass: "w-2/3",
    pattern: "[0-9]{7}",
    name: "phone",
  });

  const phone_code_input = Select({
    selectName: "codigo_de_area",
    labelText: "Cod. País",
    className: "w-full",
    fieldsetClass: "w-1/3",
    hasLabel: true,
    options: ["🇻🇪+58", "🇨🇴+57"],
    name: "phone_code",
  });

  return {
    form: C.create("form", {
      className:
        "h-4/5 bg-base-200 rounded-md w-3/5 flex flex-col justify-center items-center",
      id: "register_form",
      method: "post",
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

/**
 * Definición del estado de RegisterForm
 * @typedef {Object} RegisterForm_state
 * @property {Boolean} allFieldsValid
 */

/**
 * Define las propiedades del estado del Componente Login y regresa en el template los elementos hijos del Componente
 * @param {Object} elements Objeto con los elementos del
 * @property {HTMLElement} form  Formulario de inicio de Sesión, Padre de los componentes de RegisterForm
 * @property {HTMLElement} button Botón para iniciar sesión
 * @property {HTMLElement} username_field Input para correo Electrónico
 * @property {HTMLElement} password_fields Div con Inputs para contraseña
 * @property {HTMLElement} phone_fields Div con Inputs para teléfono y codigo de area
 * @param {RegisterForm_state} state Estado inicial del componente
 */

function _RegisterForm(elements) {
  this.state = {
    allFieldsValid: false,
  };
  this.form = elements.form;
  this.username_field = elements.username_field;
  this.email_field = elements.email_field;
  this.password_fields = elements.password_fields;
  this.phone_fields = elements.phone_fields;
  this.button = elements.button;
  elements.form.append(
    elements.username_field,
    elements.email_field,
    elements.password_fields,
    elements.phone_fields,
    elements.button
  );
  this.element = elements.form;
  this.template = function () {
    const state = JSON.parse(JSON.stringify(this.state));
    const { allFieldsValid } = state;

    return [
      this.username_field,
      this.email_field,
      this.password_fields,
      this.phone_fields,
      this.button,
    ];
  };
}
_RegisterForm.prototype = Object.create(ComponenteReactivo.prototype);
_RegisterForm.prototype.constructor = _RegisterForm;

/**
 * Definición del tipo RegisterFormMethods
 * @typedef {Object} RegisterFormMethods
 * @property {HTMLElement} container - Contenedor Padre
 * @property {HTMLElement[]} elements - Array de los elementos del Componente
 * @property {function(string):HTMLElement} get  Regresa un elemento de los hijos del componente
 * @property {function():HTMLElement[]} getFields  Regresa un array de los inputs del componente
 * @property {function():void} validateFields  Llama al util validate_register_fields()
 * @property {function():RegisterData} getData Llama al util getData() y devuelve un objeto con los datos de los campos
 * @property {function():void} setValid Cambia el estado de allFieldsValid a true
 */

/**
 * Componente con el Formulario para Registro de Usuario
 * @type {ComponenteReactivo}
 * @param {Object} config Configuración para instanciar el Componente
 * @returns {RegisterFormMethods}
 */

const RegisterForm = ((config = {}) => {
  const elements = registerFormElements(config);
  const component = new _RegisterForm(elements);

  return {
    container: () => elements.element,
    elements: () => elements,
    get: (elementName) => elements[elementName],
    getComponent: () => component,
    getFields: () => [
      elements.username_field,
      elements.email_field,
      elements.password_fields,
      elements.phone_fields,
    ],
    validateFields: () => validate_register_fields(),
    getData: () => getData(),
    setValid: (valid = true) => component.setState({ allFieldsValid: valid }),
    samePasswords: () => samePasswords(),
  };
})();
export { RegisterForm };

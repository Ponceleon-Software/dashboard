import { ComponenteReactivo, CustomElement } from "../../Utils/reactivity.js";
import { LoginForm } from "../Forms/LoginForm.js";
//import {logoponceleon} from "../../../assets/img/logo-ponceleon.svg"
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

function _Login(elements) {
  this.state = {
    isLogged: false,
  };
  this.parent = elements.parent;
  this.form = elements.form;
  this.logo = elements.logo;
  this.title = elements.title;
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

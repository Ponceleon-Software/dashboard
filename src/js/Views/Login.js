import { CustomElement } from "../Utils/reactivity.js";
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

const LoginElements = (config = {}) => {
  const elements = {
    parent: CustomElement.create("div", { className: "flex flex-col" }),
    title: CustomElement.create("h2", {
      className: "font-bold",
      innerText: "Hola mundo",
    }),
    form: CustomElement.create("div", { className: "bg-red-300 w-96 h-96" }, [
      CustomElement.create("form", { className: "" }, [
        CustomElement.create("input", { type: "text" }),
      ]),
    ]),
  };
  return CustomElement.create("div", { className: "bg-red-300 w-96 h-96" });
};

const Login = LoginElements();
export { Login };

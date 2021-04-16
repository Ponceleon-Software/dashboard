import { ComponenteReactivo, CustomElement } from "../../Utils/reactivity.js";
import { Login } from "../../Components/Login/Login.js";
import { Register } from "../../Components/Register/Register.js";
import {
  initSwitchView,
  randomWallpaperImg,
  initRegister,
  initLogin,
} from "./Sign_utilities.js";

/**
 * Instancia el Componente con que contendrá las Vistas de Inicio de Sesión y Registro
 * @type {function}
 * @param {Object} config Define las propiedades asociadas a los elementos creados dentro de este Componente
 * @returns {Object}
 */

const signElements = (config = {}) => {
  return {
    parent: CustomElement.create(
      "div",
      { className: "bg-gray-200 w-full h-full flex", id: "Sign" },
      []
    ),
    form: Login.get("parent"), //Login.container, //|| Register.Container,
    background: CustomElement.create("img", {
      src: randomWallpaperImg(),
      className: "w-50 h-full bg-cover",
    }),
  };
};

/**
 * Definición del estado de Sign
 * @typedef {Object} Sign_state
 * @property {HTMLElement} currentForm - Contenedor Padre
 * @property {String} background -
 * @property {Boolean} isLogged
 */

/**
 * Define las propiedades del estado del Componente Sign y regresa en el template los elementos hijos del Componente
 * @param {Object} elements Objeto con los elementos del
 * @property {HTMLElement} form Vista de Login o Registro
 * @property {HTMLElement} background Imagen aleatoria de fondo
 * @property {HTMLElement} element Contenedor de los elementos de login que servirá para instanciar el componente
 * @param {Sign_state} state Estado inicial del componente
 */

function _Sign(elements) {
  this.state = {
    currentForm: Login.get("parent"),
    currentWallpaper: elements.background.src,
    isLogged: false,
    token: "",
  };
  this.element = elements.parent;
  this.form = elements.form;
  this.background = elements.background;

  this.template = function () {
    const state = JSON.parse(JSON.stringify(this.state));
    const { currentForm, currentWallpaper, isLogged, token } = state;
    console.log(isLogged);
    this.background.src = randomWallpaperImg(currentWallpaper);
    this.form = this.state.currentForm;

    return [this.form, this.background];
  };
}
_Sign.prototype = Object.create(ComponenteReactivo.prototype);
_Sign.prototype.constructor = _Sign;

/**
 * Definición del tipo SignMethods
 * @typedef {Object} SignMethods
 * @property {HTMLElement} container - Contenedor Padre
 * @property {HTMLElement[]} elements - Array de los elementos del Componente
 * @property {function(string):void}  changeWallpaper  Cambia el estado currentWallpaper para cambiar la imagen de fondo a partir de una imagen pasada
 * @property {function(string):HTMLElement}  get  Regresa un elemento de los hijos del componente
 * @property {ComponenteReactivo} getComponent Regresa el componente
 */

/**
 * Componente contenedor de las vistas de Login y Register
 * @type {ComponenteReactivo}
 * @param {Object} config Configuración para instanciar el Componente
 * @returns {SignMethods}
 */
const Sign = ((config = {}) => {
  const elements = signElements(config);
  elements.parent.appendChild(elements.form);
  elements.parent.appendChild(elements.background);
  const component = new _Sign(elements);
  initSwitchView(component, Register, Login);
  initRegister(Register);
  initLogin(Login);
  return {
    container: () => elements.parent,
    elements: () => elements,
    changeWallpaper: (wallpaper) =>
      component.setState({ currentWallpaper: wallpaper }),
    get: (elementName) => elements[elementName],
    getComponent: () => component,
  };
})();
export { Sign };

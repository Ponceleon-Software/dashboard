import { ComponenteReactivo, CustomElement } from "../../Utils/reactivity.js";
import { Login } from "../../Components/Login/Login.js";
import { Register } from "../../Components/Register/Register.js";
import {
  initSwitchView,
  randomWallpaperImg,
  initRegister,
  initLogin,
} from "./Sign_utilities.js";

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

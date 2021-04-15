import { ComponenteReactivo, CustomElement } from "../Utils/reactivity.js";
import { App } from "./App.js";

const changeMainView = () => {
  App().changeView({
    currentView: CustomElement.create(
      "div",
      {
        className: "bg-green-200 w-full h-full flex",
        id: "Dashboard",
        innerHtml: "Bienvenido",
      },
      []
    ),
  });
};

export { changeMainView };

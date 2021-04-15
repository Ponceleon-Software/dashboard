import { ComponenteReactivo, CustomElement } from "../Utils/reactivity.js";
import { Sign } from "../Views/Sign/Sign.js";

const appElements = (config = {}) => {
  const signForm = Sign.get("parent");
  return {
    appContainer: CustomElement.create("div", {
      className: "w-full h-full bg-blue-500",
      id: "App",
    }),
    view: signForm,
  };
};

function _App(elements) {
  this.state = {
    isLogged: false,
    currentView: elements.view,
  };

  this.element = elements.appContainer;
  this.view = elements.view;

  this.template = function () {
    const state = JSON.parse(JSON.stringify(this.state));
    const { isLogged, currentView } = state;
    /*this.currentView = this.view;
     this.isLogged= false; //PENDIENTE*/
    if (this.state.currentView.currentView) {
      console.log(this.state.currentView.currentView);
      this.view = this.state.currentView.currentView;
    }
    elements.appContainer.appendChild(this.view);
    //this.view = this.state.currentView.outerHTML;
    //this.view=this.state.currentView;
    return [this.view];
  };
}
_App.prototype = Object.create(ComponenteReactivo.prototype);
_App.prototype.constructor = _App;

const App = (config = {}) => {
  const elements = appElements(config);
  elements.appContainer.appendChild(elements.view);

  const component = new _App(elements);
  component.render();

  return {
    container: () => elements.appContainer,
    elements: () => elements,
    changeView: (view) => component.setState({ currentView: view }),
    get: (elementName) => elements[elementName],
  };
};
export { App };

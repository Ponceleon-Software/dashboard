import { CustomElement } from "../Utils/reactivity.js";
import { Sign } from "../Views/SignIn-Up.js";
const App = () => {
  const container = CustomElement.create("div", { innerText: "Hola" });
  const SignIn = Sign.container;
  container.appendChild(SignIn);
  return {
    container: () => container,
  };
};
export { App };

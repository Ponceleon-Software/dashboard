import { CustomElement } from "../Utils/reactivity.js";
import { Login } from "../Views/Login.js";

const SignIn = () => {
  console.log(Login);
  return {
    parent: CustomElement.create("div", { className: "flex bg-red-200" }),
    container: Login, //Acá se hará el cambio entre login/register
  };
};
const Sign = SignIn();
export { Sign };

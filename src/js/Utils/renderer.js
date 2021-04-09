import { App } from "../Components/Main.js";
window.addEventListener("DOMContentLoaded", (e) => {
  const root = document.getElementById("root");
  const AppFunction = App();
  const main = AppFunction.container();
  root.appendChild(main);
});
console.log("Hola!");

import { App } from "../Components/App.js";
window.addEventListener("DOMContentLoaded", (e) => {
  const root = document.getElementById("root");
  const AppObject = App;
  const main = AppObject.get("appContainer");
  root.appendChild(main);
});

import { App } from "./App.js";
import { Dashboard } from "../Views/Dashboard.js";
const changeMainView = () => {
  App.changeView(Dashboard.get("parent"));
};

export { changeMainView };

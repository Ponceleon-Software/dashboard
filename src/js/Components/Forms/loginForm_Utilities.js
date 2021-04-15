import { LoginForm } from "./LoginForm.js";
const getData = () => {
  const form = LoginForm.getElements("form").form;
  const fields = Array.prototype.slice.call(form.getElementsByTagName("input"));
  const data = {};
  fields.forEach((el) => {
    data[el.getAttribute("name")] = el.value;
  });
  return data;
};

const samePasswords = () => {};
export { getData };

import { RegisterForm } from "./RegisterForm.js";

const validate_register_fields = () => {
  const form = RegisterForm.getElements("form").form;
  const fields = Array.prototype.slice.call(form.getElementsByTagName("input"));
  const validityArray = [];
  fields.forEach((el) => {
    validityArray.push(el.checkValidity());
  });

  let allValid = validityArray.every(Boolean);
  //if (allValid) RegisterForm.setValid(true);
  return allValid;
};

const getData = () => {
  const form = RegisterForm.getElements("form").form;
  const fields = Array.prototype.slice.call(form.getElementsByTagName("input"));
  const data = {};
  fields.forEach((el) => {
    data[el.getAttribute("name")] = el.value;
  });
  return data;
};
export { validate_register_fields, getData };

import { RegisterForm } from "./RegisterForm.js";

const validate_register_fields = () => {
  const form = RegisterForm.getElements("form").form;
  const fields = Array.prototype.slice.call(form.getElementsByTagName("input"));
  const validityArray = [];
  fields.forEach((el) => {
    if (el.getAttribute("type") == "password") {
      const password_fields = RegisterForm.get(
        "password_fields"
      ).getElementsByTagName("input");
      if (password_fields[0].value == password_fields[1].value)
        validityArray.push(el.checkValidity());
      return;
    }
    validityArray.push(el.checkValidity());
  });
  console.log(validityArray);
  let allValid = validityArray.every(Boolean);
  if (allValid) RegisterForm.setValid(true);
  return allValid;
};

/**
 * Definición del tipo RegisterFormMethods
 * @typedef {Object} RegisterData
 * @property {string} username Nombre de usuario
 * @property {string} email  Correo Electrónico
 * @property {string} password  Contraseña
 * @property {number} phone  Numero de teléfono
 
 */

const getData = () => {
  const form = RegisterForm.getElements("form").form;
  const fields = Array.prototype.slice.call(form.getElementsByTagName("input"));
  const data = {};
  fields.forEach((el) => {
    data[el.getAttribute("name")] = el.value;
  });
  return data;
};

const samePasswords = () => {};
export { validate_register_fields, getData };

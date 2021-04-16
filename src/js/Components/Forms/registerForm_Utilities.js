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

const getData = () => {
  const form = RegisterForm.getElements("form").form;
  const fields = Array.prototype.slice.call(form.getElementsByTagName("input"));
  const data = {};
  fields.forEach((el) => {
    data[el.getAttribute("name")] = el.value;
  });
  return data;
};

const samePasswords = () => {
  const form = RegisterForm.getElements("form").form;
  const fields = Array.prototype.slice.call(form.getElementsByTagName("input"));
  const pw_fields = fields.filter((el) => {
    if (el.getAttribute("type") == "password") return el;
  });
  pw_fields.forEach((el, i, ar) => {
    el.addEventListener("input", function (e) {
      checkPassword(...ar);
    });
  });
};

function checkPassword(pw_field1, pw_field2) {
  const password1 = pw_field1.value;
  const password2 = pw_field2.value;
  pw_field1.classList.remove("input-success", "input-warning", "input-error");
  pw_field2.classList.remove("input-success", "input-warning", "input-error");

  if (password1 == "") {
    pw_field1.setCustomValidity("Por favor, ingresa una contraseña.");
    pw_field1.classList.add("input-error");
  }

  // If confirm password not entered
  else if (password2 == "") {
    pw_field2.setCustomValidity("Por favor, repite la contraseña.");
    pw_field2.classList.add("input-error");
  }
  // If Not same return False.
  else if (password1 != password2) {
    pw_field1.classList.add("input-warning");
    pw_field2.classList.add("input-warning");
    pw_field1.setCustomValidity("\n Las contraseñas no coinciden");
    pw_field2.setCustomValidity("\n Las contraseñas no coinciden");
  } else if (!/[0-9a-zA-Z]{6,}/.test(password1)) {
    console.log("hola");
    pw_field1.classList.add("input-warning");
    pw_field2.classList.add("input-warning");
    pw_field1.setCustomValidity("\n Min: 6char");
    pw_field2.setCustomValidity("\n Min: 6char");
  }

  // If same return True.
  else {
    pw_field1.setCustomValidity("");
    pw_field2.setCustomValidity("");
    pw_field1.classList.add("input-success");
    pw_field2.classList.add("input-success");

    return true;
  }
}

export { validate_register_fields, getData, samePasswords };

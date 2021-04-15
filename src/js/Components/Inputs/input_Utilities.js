import { Input } from "./Input.js";

const validateInput = (input) => {
  if (input.checkValidity()) {
    input.classList.remove("input-warning");
    input.classList.add("input-success");
    return;
  }
  input.classList.remove("input-error");
  input.classList.remove("input-success");
  input.classList.add("input-warning");
};

const initValidateInput = (input) => {
  if (input.getAttribute("pattern") == "") return;
  input.addEventListener("keyup", function (e) {
    validateInput(input);
  });
  input.addEventListener("focusout", function (e) {
    validateAfterFocus(input);
  });
};

const validateAfterFocus = (input) => {
  if (!input.checkValidity()) {
    input.classList.remove("input-warning");
    input.classList.add("input-error");
  }
};
export { initValidateInput };

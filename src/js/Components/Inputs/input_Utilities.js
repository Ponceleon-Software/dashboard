const validateInput = (input) => {
  if (input.checkValidity()) {
    input.classList.add("input-success");
    input.classList.remove("input-error");
    return;
  }
  input.classList.remove("input-success");
  input.classList.add("input-error");
};

const initValidateInput = (input) => {
  if (input.getAttribute("pattern") == "") return;
  input.addEventListener("input", function (e) {
    validateInput(input);
  });
};

export { initValidateInput };

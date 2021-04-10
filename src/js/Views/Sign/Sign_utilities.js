/**
 * Cambia la vista al formulario de Registro
 * del panel
 *
 * @param {Sign} Sign El componente reactivo del panel
 */
const switchView = (Sign, Register, Login) => {
  const isInLogin = Sign.state.currentForm == Login.form;
  const View = isInLogin ? Register : Login;
  const button = !isInLogin ? Register.button : Login.button;
  button.addEventListener("click", function (e) {
    changeView(e, View);
  });

  const changeView = (e, View) => {
    Sign.setState({ currentForm: View.form });
  };
};

export { switchView };

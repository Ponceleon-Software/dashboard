/**
 * Cambia la vista al formulario de Registro
 * del panel
 *
 * @param {Sign} Sign El componente reactivo del panel
 */
const switchView = (Sign, Register, Login) => {
  const isInLogin = Sign.state.currentForm == Login.form;
  const View = isInLogin ? Register : Login;
  console.log(Sign.form);

  Sign.form.addEventListener("click", function aff(e) {
    changeView(e, View);
  });

  const changeView = (e, View) => {
    Sign.setState({ currentForm: View.form });
  };
};

export { switchView };

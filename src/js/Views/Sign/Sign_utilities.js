/**
 * Cambia la vista al formulario de Registro
 * del panel
 *
 * @param {Sign} Sign El componente reactivo del panel
 */
/* const switchView = (Sign, Register, Login) => {
  const isInLogin = Sign.state.currentForm == Login.getComponent().parent;
  const View = isInLogin ? Register.getComponent() : Login.getComponent();
  const View2 = isInLogin ? Login : Register;
  const button = View2.elements().form.get("button"); //!isInLogin ? Register.button : Login.button;
  button.addEventListener("click", function (e) {
    changeView(e, View);
  });
}; */

const initSwitchView = (Sign, Register, Login) => {
  const button_login = Login.elements().form.get("button");
  const button_register = Register.elements().form.get("button");
  button_login.addEventListener("click", function (e) {
    changeView(e, Register.getComponent());
  });
  button_register.addEventListener("click", function (e) {
    changeView(e, Login.getComponent());
  });
  const changeView = (e, View) => {
    Sign.setState({ currentForm: View.parent });
  };
};

export { initSwitchView };

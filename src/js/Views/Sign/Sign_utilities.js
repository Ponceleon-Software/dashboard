/**
 * Cambia la vista al formulario de Registro
 * del panel
 *
 * @param {Sign} Sign El componente reactivo del panel
 */

const initSwitchView = (Sign, Register, Login) => {
  const anchor_goToRegister = Login.elements().dontHaveAccount.childNodes[1];
  const anchor_goToLogin = Register.elements().alreadyHaveAccount.childNodes[1];
  anchor_goToRegister.addEventListener("click", function (e) {
    changeView(e, Register.getComponent());
  });
  anchor_goToLogin.addEventListener("click", function (e) {
    changeView(e, Login.getComponent());
  });
  const changeView = (e, View) => {
    Sign.setState({ currentForm: View.parent });
  };
};

const randomWallpaperImg = (el) => {
  const getRandEl = function (array) {
    let arrayWithoutActual = array.slice();
    if (el) {
      arrayWithoutActual = array.filter(function (x) {
        return x !== el;
      });
    }

    return arrayWithoutActual[Math.floor(Math.random() * array.length)];
  };
  const refPath = "../../src/assets/img/backgrounds/";
  const imgs = ["orange-forest", "beach-trip", "clouds", "nebula"];
  const result = getRandEl(imgs);
  const img = `${refPath + result}.webp`;
  return img;
};

/* const Login(username,password)=()=>{
  //const url=
}
 */
export { initSwitchView, randomWallpaperImg };

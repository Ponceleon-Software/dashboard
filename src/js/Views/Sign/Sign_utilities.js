/**
 * Cambia la vista al formulario de Registro
 * del panel
 *
 * @param {Sign} Sign El componente reactivo del panel
 */
import { changeMainView } from "../../Components/app_utilities.js";

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
const initRegister = (Register) => {
  const button_register = Register.elements().form.elements().button;

  button_register.addEventListener("click", function (e) {
    Register.elements().form.validateFields();
    const fieldsValid = Register.elements().form.getComponent().state
      .allFieldsValid;
    if (fieldsValid) {
      const data = Register.elements().form.getData();
      const { email, password } = data;
      createAccount(email, password);
    }
  });
};

const createAccount = async (email, password) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      //Sign.setState({ isLogged: true, token: user });
      changeMainView();
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error, errorMessage);
      // ..
    });

  //changeMainView();
};
const initLogin = (Login) => {
  const button_login = Login.elements().form.elements().button;

  button_login.addEventListener("click", function (e) {
    Login.elements().form.validateFields();
    const fieldsValid = Login.elements().form.getComponent().state
      .allFieldsValid;
    if (fieldsValid) {
      const data = Login.elements().form.getData();
      const { email, password } = data;
      login(email, password);
    }
  });
};
const login = async (email, password) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log(user);
      changeMainView();
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
};

export { initSwitchView, randomWallpaperImg, initRegister, initLogin };

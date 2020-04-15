import { changeView } from '../view-controler/router.js';

export default () => {
  const viewLogin = `
    <form>
    <input type="email" placeholder="Email" id="emailText"> </input>
    <input type="password" placeholder="Password" id="passwordText"> </input>
    <button class="btn" id="loginBtn"> Login </button>
    <button class="btn" id="logoutBtn"> Logout </button>
    </form>
  `;

  // nodes (for the creation of the HTML elements)
  const divElement = document.createElement('div');
  divElement.innerHTML = viewLogin;

  // nodes (to get the DOM elements inside the form and initialize the login function)
  const emailText = divElement.querySelector('#emailText');
  const passwordText = divElement.querySelector('#passwordText');
  const loginBtn = divElement.querySelector('#loginBtn');
  const auth = firebase.auth();

  // login event
  loginBtn.addEventListener('click', (e) => {
    const email = emailText.value;
    const pass = passwordText.value;

    // sign in with firebase functions
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.then(e => changeView('#/home'));
    promise.catch(e => console.log(alert(e.message)));
  });

  // logout
  const logout = divElement.querySelector('#logoutBtn');
  logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
      console.log('user signed out');
      alert('Come back soon!');
    });
  });

  return divElement;
};

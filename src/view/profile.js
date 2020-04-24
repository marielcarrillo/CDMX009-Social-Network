// eslint-disable-next-line import/no-cycle
import { changeView } from '../view-controler/router.js';

export default () => {
  const viewProfile = `
      <h1>Aquí va el profile☆</h1>
      <div id="profile"></div>
  `;
  // nodos
  const divElement = document.createElement('div');
  divElement.innerHTML = viewProfile;
  const db = firebase.firestore();
  const auth = firebase.auth();

  // elementos del DOM
  const showInfo = divElement.querySelector('#profile');

  // get the info
  const user = firebase.auth().currentUser;
  if (user != null) {
    const profileInfo = `
   <div> Logged in as ${user.email} </div>`;
    showInfo.innerHTML = profileInfo;
  }
  return divElement;
};

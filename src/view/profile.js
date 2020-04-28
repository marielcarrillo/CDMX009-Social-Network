// eslint-disable-next-line import/no-cycle
import { changeView } from '../view-controler/router.js';

export default () => {
  const viewProfile = `
      <h1>Aquí va el profile☆</h1>
      <div id="profile"></div>
      <div id="posts"></div>
  `;
  // nodos
  const divElement = document.createElement('div');
  divElement.innerHTML = viewProfile;
  const db = firebase.firestore();
  const postsRef = db.collection('posts');

  // elementos del DOM
  const showInfo = divElement.querySelector('#profile');
  const userPosts = divElement.querySelector('#posts');

  // get the info
  const user = firebase.auth().currentUser;
  if (user != null) {
    const profileInfo = `
   <div> 
   <img src="${user.photoURL}" width="320"> 
   <p> Name: ${user.displayName} </p>
   <p> Bio: ${user.bio} </p>
   </div>
   `;
    showInfo.innerHTML = profileInfo;
    console.log(user);
  }

  // calling the docs and adding to the html
  postsRef.onSnapshot((snap) => {
    userPosts.innerHTML = '';
    snap.forEach((doc) => {
      const div = `<div>
              <p>${doc.data().user}</p>
              <p>${doc.data().date}</p>
              <img width="200" src="${doc.data().postimg}" />
              <p>${doc.data().description}</p>
              <p>${doc.data().location}</p>
          </div>`;
      const nodo = document.createElement('div');
      nodo.innerHTML = div;
      userPosts.appendChild(nodo);
    });
  });
  return divElement;
};

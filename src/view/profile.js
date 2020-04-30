// eslint-disable-next-line import/no-cycle
import { changeView } from '../view-controler/router.js';

export default () => {
  const viewProfile = `
      <h1>Aquí va el profile☆</h1>
      <button id="editProfile" type="submit" class="btn"> Edit Profile </button>
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

  // get the Profile info
  const user = firebase.auth().currentUser;
  if (user != null) {
    const profileInfo = `
   <div> 
   <img src="${user.photoURL}" width="320"> 
   <p> Name: ${user.displayName} </p>
   </div>
   `;
    showInfo.innerHTML = profileInfo;
    console.log(user);
  }

  // setting posts info
  function renderPost(doc) {
    const div = document.createElement('div');
    const image = document.createElement('img');
    const description = document.createElement('p');
    const location = document.createElement('p');
    const cross = document.createElement('button');

    div.setAttribute('data-id', doc.id);
    image.src = doc.data().postimg;
    description.textContent = doc.data().description;
    location.textContent = doc.data().location;
    cross.textContent = 'DELETE';

    div.appendChild(image);
    div.appendChild(description);
    div.appendChild(location);
    div.appendChild(cross);

    userPosts.appendChild(div);

    console.log(div);
    // delete the data
    cross.addEventListener('click', (e) => {
      const id = e.target.parentElement.getAttribute('data-id');
      postsRef.doc(id).delete();
    });
  }
  // get the data
  postsRef.where('user', '==', 'Azul').onSnapshot((snap) => {
    const changes = snap.docChanges();
    changes.forEach((change) => {
      if (change.type === 'added') {
        renderPost(change.doc);
      } else if (change.type === 'removed') {
        const div = userPosts.querySelector('[data-id=' + change.doc.id + ']');
        renderPost.removeChild(div);
      }
    });
  });

  return divElement;
};

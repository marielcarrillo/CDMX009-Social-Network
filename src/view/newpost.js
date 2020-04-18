export default () => {
  const viewNewPost = `<div class = "gridContainer">
  <main>
      <form class = "inputForm">
          <input type="file" id="imgUpload" name="img" accept="image/*">
          <img src="" id="newPost">
          <input class = "registerInput" type = "text" placeholder = "Descripción" required>
          <input class = "registerInput" type = "text" placeholder = "Ubicación" required>
          <button class= "btn" id = "btnShare"> Share </button>
          <button class="btn" id="btnLoad"> Load </button>
      </form>
  </main>
  <footer>
      <div class = "feedOptions">
      <button class = "btn" id = "homeSH"> home </button>
      <button class = "btn" id= "profileSH"> profile </button>
      </div>
  </footer>
</div>`;

  // nodos
  const divElement = document.createElement('div');
  divElement.innerHTML = viewNewPost;

  // firestore elements
  const firestore = firebase.firestore();
  const docRef = firestore.doc('samples/bichos');

  // get the div elements
  const uploadImg = divElement.querySelector('#imgUpload');
  const newImg = divElement.querySelector('#newPost');
  const shareImg = divElement.querySelector('#btnShare');
  const loadImg = divElement.querySelector('#btnLoad');

  shareImg.addEventListener('click', (e) => {
    const imgToSave = uploadImg.value;
    console.log(imgToSave);
    docRef.set({
      newImg: imgToSave,
    }).then((e) => {
      console.log(':) OK!');
    }).catch((e) => {
      console.log(':( notOk!');
    });
  });

  // with LOAD button
  loadImg.addEventListener('click', (e) => {
    docRef.get().then((doc) => {
      if (doc && doc.exists) {
        const myData = doc.data();
        newImg.src = myData;
      }
    });
  });

  return divElement;
};

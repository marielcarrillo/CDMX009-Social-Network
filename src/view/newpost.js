export default () => {
// var globales
// var db = firebase.firestore();
  const storage = firebase.storage();
  let url;

  const viewNewPost = `<div class = "gridContainer">
  <main>
      <form class = "inputForm">
          <input type="file" id="imgUpload" name="img" accept="image/*">
          <input id="registerDescription" type = "text" placeholder = "Descripción" required>
          <input id="registerLocation" type = "text" placeholder = "Ubicación" required>
          <button class="btn" id = "btnShare"> Share </button>
          <button class="btn" id="btnLoad"> Load </button>

         <div>
         <img src="" id="newPost" width="300px" height="200px">
         </div>
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

  // get the div elements
  const imgUpload = divElement.querySelector('#imgUpload');
  const loadImg = divElement.querySelector('#btnLoad');
  // const registerDescription = divElement.querySelector('#registerDescription')
  // const registerLocation = divElement.querySelector('#registerLocation')

  // func + listener for uploading the image to storage

  imgUpload.addEventListener('change', (e) => {
    // get file
    const image = divElement.querySelector('#imgUpload').files[0];
    const imageName = image.name;

    // create storage reference --where the images will be uploaded and saved--
    const storageRef = storage.ref(`images/${imageName}`);

    // upload the image to storage
    storageRef.put(image)
      .then(snap => snap.ref.getDownloadURL())
      .then((link) => {
        url = link;
        console.log(url);
      });
  });

  // Get the url into a blob. Documentación de firebase
  function load() {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = (e) => {
      const blob = xhr.response;
    };
    xhr.open('GET', url);
    xhr.send();

    // Insert into an <img> element:
    const img = divElement.querySelector('#newPost');
    img.src = url;
  }

  loadImg.addEventListener('click', load);


  // func + listener to upload the info to firestore
  /* loadImg.addEventListener('click', e =>{
    const docRef = db.doc("posts/feed")
    const descriptionValue = registerDescription.value
    const locationValue = registerLocation.value
    docRef.set({
      description: descriptionValue,
      location: locationValue
    }).then((e) => {
      console.log(':) OK!');
    }).catch((e) => {
      console.log(':( notOk!');
    });
  });
  /*func + listener to upload the info to realtime database
  loadImg.addEventListener('click', e =>{
    //create database reference

    const databaseRef = database.ref('post-data')
    const data = {
      description: registerDescription.value,
      location: registerLocation.value
    }
    databaseRef.push(data)
  }) */


  return divElement;
};

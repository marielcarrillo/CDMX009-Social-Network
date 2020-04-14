export default () => {
  const viewNewUser = `
  <div class = "gridContainer" id = "signupForm">
        <div class = "about">
            <h3> Sign Up!</h3>
        </div>
        <div class = "formContainer">
            <form class = "inputForm" id = "form">
                <input type="file" id="img" name="img" accept="image/*">
                <input class = "registerInput" id = "signupUser" type = "text" placeholder = "Username" required>
                <input class = "registerInput" id = "signupEmail" type = "email" placeholder = "Email" required> 
                <input class = "registerInput" id = "signupPassword" type = "password" placeholder = "Password" required> 
                <button class= "btn" id = "signup"> Sign up! </button>
            </form>
        </div> 
        <div class = "createAccout">
            <p> Sign up with </p>
        </div>
        <div class = "fbYG">
            <button> fb </button>
            <button> google </button>
        </div>   
  </div>`;

  // nodes Render
  const divElement = document.createElement('div');
  divElement.innerHTML = viewNewUser;

  // Nodes from DOM elements inside the form
  const emailText = divElement.querySelector('#signupEmail');
  const passwordText = divElement.querySelector('#signupPassword');
  const signupBtn = divElement.querySelector('#signup');

  // signup Event
  signupBtn.addEventListener('click', (e) => {
    const email = emailText.value;
    const pass = passwordText.value;
    const auth = firebase.auth();

    // sign up User
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.then((cred) => {
      console.log(cred);
    });
  });
  return divElement;
};

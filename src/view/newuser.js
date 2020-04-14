
export default () => {
  const viewNewUser = `
  <form id="sign-up">
  <input type="email" placeholder="Email" id="emailText"> </input>
  <input type="password" placeholder="Password" id="passwordText"> </input>
  <button type="submit" class="btn" id="loginBtn"> Sign Up </button>
  </form>
  `;
  // nodes
  const divElement = document.createElement('div')
  divElement.innerHTML = viewNewUser

  // the sign up form
  const signupForm = divElement.querySelector('#sign-up');
  signupForm.addEventListener('submit', (e) => {
   e.preventDefault(); 

   // get user info
   const email = signupForm['emailText'].value;
   const password = signupForm['passwordText'].value;
   const auth = firebase.auth();

   // sign up the user
   auth.createUserWithEmailAndPassword(email, password).then(cred => {
     console.log(cred.user)
   }) 
  })


  return divElement
}

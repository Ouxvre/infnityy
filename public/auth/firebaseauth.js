import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from"https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import {getFirestore, setDoc, doc} from"https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js"
const firebaseConfig = {
  apiKey: "AIzaSyCp0R4n9fYQpRBulLCsA37A8bwxN5IlMZQ",
  authDomain: "infnityy-f38cb.firebaseapp.com",
  projectId: "infnityy-f38cb",
  storageBucket: "infnityy-f38cb.firebasestorage.app",
  messagingSenderId: "279800249737",
  appId: "1:279800249737:web:383e54473b10f290ea7558",
  measurementId: "G-62VW8S5R82"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function showMessage(message, divId){
  var messageDiv=document.getElementById(divId);
  messageDiv.style.display="block";
  messageDiv.innerHTML=message;
  messageDiv.style.opacity=1;
  setTimeout(function(){
      messageDiv.style.opacity=0;
  },5000);
}
const signUp=document.getElementById('submitSignUp');
signUp.addEventListener('click', (event)=>{
  event.preventDefault();
  const email=document.getElementById('rEmail').value;
  const password=document.getElementById('rPassword').value;
  const firstName=document.getElementById('fName').value;
  const lastName=document.getElementById('lName').value;

  const auth=getAuth();
  const db=getFirestore();

  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential)=>{
      const user=userCredential.user;
      const userData={
          email: email,
          firstName: firstName,
          lastName:lastName
      };
      showMessage('Account Created Successfully', 'signUpMessage');
      const docRef=doc(db, "users", user.uid);
      setDoc(docRef,userData)
      .then(()=>{
          window.location.href='index.html';
      })
      .catch((error)=>{
          console.error("error writing document", error);

      });
  })
  .catch((error)=>{
      const errorCode=error.code;
      if(errorCode=='auth/email-already-in-use'){
          showMessage('Email Address Already Exists !!!', 'signUpMessage');
      }
      else{
          showMessage('unable to create User', 'signUpMessage');
      }
  })
});

const signIn=document.getElementById('submitSignIn');
signIn.addEventListener('click', (event)=>{
  event.preventDefault();
  const email=document.getElementById('email').value;
  const password=document.getElementById('password').value;
  const auth=getAuth();

  signInWithEmailAndPassword(auth, email,password)
  .then((userCredential)=>{
      showMessage('login is successful', 'signInMessage');
      const user=userCredential.user;
      localStorage.setItem('loggedInUserId', user.uid);
      window.location.href='product.html';
  })
  .catch((error)=>{
      const errorCode=error.code;
      if(errorCode==='auth/invalid-credential'){
          showMessage('Incorrect Email or Password', 'signInMessage');
      }
      else{
          showMessage('Account does not Exist', 'signInMessage');
      }
  })
}) 
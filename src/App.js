import "./App.css";
import app from "./firebase.init";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";
import { GithubAuthProvider } from "firebase/auth";


const auth = getAuth(app);
function App() {
  const [user , setUser] = useState({});
  const googleProvider = new GoogleAuthProvider();
  const provider = new GithubAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth , googleProvider)
    .then ((result) => {
      const user = result.user;
      setUser(user);
      console.log(user);
    } ) 
    .catch((error)=> {
      console.log(error)
    })
  }

  const handleGithubSignIn = () => {
      signInWithPopup(auth , provider)
      .then(result => {
        const user = result.user;
        setUser (user) 
        console.log(user)
      })
      .catch(error => {
        console.error(error);
      })
  }
  const handleSignOut = () => {
    signOut(auth).then(() => {
      setUser({});
    })
    .catch(error => {
      setUser({});
    })
  }
  return <div className="App">
 {
      user.email?<button onClick={handleSignOut}>Sign Out</button>
      :
      <div>
      <button onClick = {handleGoogleSignIn} >Google SIgn In</button>
      <button onClick={handleGithubSignIn}>Github Sign In</button>
      </div>
  
      
 }
    <h2>Name:{user.displayName}</h2>
    <p>I know Your Email : {user.email}</p>
    <img src={user.photoURL} alt="" />
  
  </div>;
}

export default App;

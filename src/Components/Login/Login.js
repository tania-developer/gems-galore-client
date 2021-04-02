import React, { useContext, useState } from 'react';
import './Login.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';

const Login = () => {
    const [newUser, setNewUser] = useState(true);

    if(firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });

    

    //context api
  
    const provider = new firebase.auth.GoogleAuthProvider();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

   //redirect from user came 
   const history = useHistory();
   const location = useLocation();
   let {from} = location.state || {from: {pathname: "/"}};


    const handleGoogleSingIn = () => {
        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                const { displayName, email } = result.user;
                const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email
                }
                setUser(signedInUser);
                setLoggedInUser(signedInUser);
                history.replace(from);
                console.log(displayName, email);
            })

            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                console.log(errorCode, errorMessage, email, credential);
            });


    }


    const handleBlur = (e) => {
        let isFormValid = true;
        if (e.target.name === 'email') {
            isFormValid = /\S+@\S+\.\S+/.test(e.target.value);

        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 3;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFormValid = (isPasswordValid && passwordHasNumber);
        }
        if (e.target.name === 'name') {
            isFormValid = /^[A-Za-z]+/.test(e.target.value);

        }
        if (isFormValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }

    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then((res) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    updateUserName(user.name);
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }
        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((res) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                    console.log('sing in ', res.user);
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });

        }

        e.preventDefault();
    }

    const updateUserName = name => {
        var user = firebase.auth().currentUser;

        user.updateProfile({
        displayName: name,
        }).then(function() {
        console.log("user name update successfully");
        }).catch(function(error) {
        console.log(error);
        });
    }


    return (
        <div className="body">
            <div className="login-form">
                <h4>{newUser?'Create an account' : 'Login'}</h4> 
                <form onSubmit={handleSubmit}>
                    {newUser && <input type="text" required placeholder="Name" className="login-form-field" name="name" onBlur={handleBlur} />}
                    <br />
                    <input type="email" required className="login-form-field" placeholder="Username or Email" name="email" onBlur={handleBlur} />
                    <br />
                    <input type="password" required className="login-form-field" placeholder="Password" name="password" onBlur={handleBlur} />
                    <br />

                    {newUser ? <input type="submit" className="login-btn" value="Create an account" /> :
                        <input type="submit" className="login-btn" value="Login" />}
                </form>
                <p style={{ color: 'red' }}>{user.error}</p>
                {user.success && <p style={{ color: 'green' }}>Submit successfully</p>}
                <p>{newUser ? 'Already' : "Don't"} have an account? <a href="#" onClick={() => setNewUser(!newUser)}> {newUser ? 'login' : 'create an account'}</a></p>
            </div>
            <br />
            <button className="custom-btn" onClick={handleGoogleSingIn}>Continue with Goggle</button>
        </div>

    );
};

export default Login;
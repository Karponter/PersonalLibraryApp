import React, {useContext, useRef, useState} from 'react';
import './style.css';
import {FirebaseContext} from '../Firebase';

export default function Authorization() {
    const firebase = useContext(FirebaseContext);
    const [errMsg, setErrMsg] = useState();
    const loginRef = useRef();
    const passwordRef = useRef();

    const signUp = () => {
        firebase.createUser(loginRef.current.value, passwordRef.current.value)
            .catch((err) => {
                setErrMsg(err.message);
            });
    };

    const signIn = () => {
        firebase.signIn(loginRef.current.value, passwordRef.current.value)
            .catch((err) => {
                setErrMsg(err.message);
            });
    };
    return (
        <div className="container">
            <div className="input-container">
                <label form="login">Login</label>
                <input ref={loginRef} id="login" type="text"/>
                <label form="password">Password</label>
                <input ref={passwordRef} id="password" type="password"/>
                <div className="controls">
                    <button onClick={signUp}>Sign Up</button>
                    <button onClick={signIn}>Log In</button>
                </div>
                <p>{errMsg}</p>
            </div>
        </div>
    );
}
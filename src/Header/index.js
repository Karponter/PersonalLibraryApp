import React, {useContext} from 'react';
import './style.css';
import {Link} from "react-router-dom";
import FirebaseContext from '../FirebaseContext';

export default function Header({userEmail}) {
    const firebase = useContext(FirebaseContext);


    return (
        <nav>
            <Link to="/">
                <h1>
                    MyLib
                </h1>
            </Link>
            {userEmail !== ''
                ? <div>
                    <span>{userEmail}</span>
                    <Link to="/">
                        <button onClick={firebase.signOut}>Log out</button>
                    </Link>
                </div>
                : ''}
        </nav>
    );
}
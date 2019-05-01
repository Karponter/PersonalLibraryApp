import React, {useContext, useState} from 'react';
import './App.css';

import {library} from '@fortawesome/fontawesome-svg-core'
import {
    faStar as faStarSolid,
    faSortUp,
    faSortDown
} from '@fortawesome/free-solid-svg-icons'
import {faStar as faStarRegular} from '@fortawesome/free-regular-svg-icons'

import Header from './Header';
import Authorization from './Authorization';
import LibraryContainer from './LibraryContainer';
import FirebaseContext from './FirebaseContext';
import Loading from "./Loading";

library.add(
    faStarSolid,
    faStarRegular,
    faSortUp,
    faSortDown);

export default function Library() {
    const [userEmail, setUserEmail] = useState(null);
    const firebase = useContext(FirebaseContext);
    firebase.onUserStateChange((data) => setUserEmail(data ? data.email : ''));

    return (
        <div className="App">
            <Header userEmail={userEmail}/>
            {userEmail === null
                ? <Loading/>
                : userEmail === ''
                    ? <Authorization/>
                    : <LibraryContainer/>}
        </div>
    );

}


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Library from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router} from 'react-router-dom';
import LibraryContext from './LibraryContext';
import BookLibrary from "./LibC";

ReactDOM.render(
    <LibraryContext.Provider value={new BookLibrary(20)}>
        <Router>
            <Library/>
        </Router>
    </LibraryContext.Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

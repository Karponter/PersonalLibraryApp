import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

const initialState = {
    searchValue: '',
    paginationValue: '',
    currentPageValue: 0
};

function book(state = initialState, action) {
    if (action.type === 'CHANGE_PAGINATION_VALUE') {
        return Object.assign({}, state, {paginationValue: action.payload});
    }
    if (action.type === 'CHANGE_SEARCH_VALUE') {
        return Object.assign({}, state, {searchValue: action.payload});
    }
    return state;
}

const store = createStore(book, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


//
// store.subscribe(() => {
//     console.log(store.getState());
// });
//
// store.dispatch({
//     type: 'ADD_TRACK',
//     payload: 'test'
// });
// store.dispatch({
//     type: 'ADD_TRACK',
//     payload: 'test2'
// });
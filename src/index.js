import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

const initialState = {
    sortValue: true,
    sortPropertyValue: 'none',
    searchValue: '',
    paginationValue: '',
    readValue: 'All',
    filteredLibSizeValue: 0,
    bookValue: null,
    booksValue: [],
    asideValue: 'MENU'
};

function book(state = initialState, action) {
    if (action.type === 'CHANGE_ASIDE_VALUE') {
        return Object.assign({}, state, {asideValue: action.payload});
    }
    if (action.type === 'CHANGE_BOOK') {
        return Object.assign({}, state, {bookValue: action.payload});
    }
    if (action.type === 'CHANGE_BOOKS') {
        return Object.assign({}, state, {booksValue: action.payload});
    }
    if (action.type === 'CHANGE_PAGINATION_VALUE') {
        return Object.assign({}, state, {paginationValue: action.payload});
    }
    if (action.type === 'CHANGE_SEARCH_VALUE') {
        return Object.assign({}, state, {searchValue: action.payload});
    }
    if (action.type === 'CHANGE_READ_VALUE') {
        return Object.assign({}, state, {readValue: action.payload});
    }
    if (action.type === 'CHANGE_SORT_VALUE') {
        return Object.assign({}, state, {sortValue: action.payload});
    }
    if (action.type === 'CHANGE_SORT_PROPERTY_VALUE') {
        return Object.assign({}, state, {sortPropertyValue: action.payload});
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
import React, {Component} from 'react';
import './App.css';
import Header from './Header';
import MainContent from './MainContent';
import {connect} from 'react-redux';
import './App.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar as faStarSolid, faSortUp, faSortDown, faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarRegular} from '@fortawesome/free-regular-svg-icons'

library.add(
    faStarSolid,
    faStarRegular,
    faSortUp,
    faSortDown,
    faChevronLeft,
    faChevronRight);

class App extends Component {

    render() {
        return (
            <div className="App">
                <Header/>
                <MainContent/>
            </div>
        );
    }
}

// export default App;
export default connect(
    state => ({
        testStore: state
    }),
    dispatch => ({}))(App);
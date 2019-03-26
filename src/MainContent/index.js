import React, {Component} from 'react';
import './style.css'
import SideMenu from '../SideMenu';
import BooksLibrary from '../BooksLibrary';
import {connect} from 'react-redux';
import SideEditor from "../SideEditor";

class MainContent extends Component{

    render() {
        return (
            <section className="container">
                <BooksLibrary/>
                {(this.props.aside === 'MENU') ? <SideMenu/> : ''}
                {(this.props.aside === 'EDIT') ? <SideEditor/> : ''}
            </section>
        );
    }
}

export default connect(
    state => ({
        aside: state.asideValue
    }),
    dispatch => ({}))(MainContent);
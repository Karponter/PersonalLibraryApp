import React, {Component} from 'react';
import './style.css'
import SideMenu from '../SideMenu';
import BooksLibrary from '../BooksLibrary';

export default class MainContent extends Component{

    render() {
        return (
            <section className="container">
                <BooksLibrary/>
                <SideMenu/>
            </section>
        );
    }

}
import React, {Component} from 'react';
import './style.css';

export default class Header extends Component {
    render(){
        return (
            <nav>
                <h1>
                    MyLib
                </h1>
                <div>
                    <span>testuser@test.com</span>
                    <button>Log out</button>
                </div>
            </nav>
        );
    }
}
import React from 'react';
import './style.css';
import {Link} from "react-router-dom";

export default function Header() {
    return (
        <nav>
            <Link to="/">
                <h1>
                    MyLib
                </h1>
            </Link>
            <div>
                <span>testuser@test.com</span>
                <button>Log out</button>
            </div>
        </nav>
    );
}
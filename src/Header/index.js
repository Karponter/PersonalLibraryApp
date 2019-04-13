import React from 'react';
import './style.css';

export default function Header() {
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
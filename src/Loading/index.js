import React from 'react';
import './style.css';

export default function Loading() {
    return (
        <div className="container">
            <div className="spinner">
                <div className="rect1"/>
                <div className="rect2"/>
                <div className="rect3"/>
                <div className="rect4"/>
                <div className="rect5"/>
            </div>
        </div>
    );
}
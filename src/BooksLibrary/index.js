import React, {Component} from 'react';
import './style.css';

export default class BooksLibrary extends Component {
    render () {
        return (
            <main>
                <div className="book">
                    +
                    <div className="book__rate"></div>
                    <div className="book__title"></div>

                </div>
                <div className="book">
                    <div className="book__rate">3</div>
                    <div className="book__title">tst</div>

                </div>
                <div className="book">
                    <div className="book__rate">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="far fa-star"></i>
                    </div>
                    <div className="book__title">est23</div>

                </div>
                <div className="book">
                    <div className="book__rate">1</div>
                    <div className="book__title">test2342</div>

                </div>
            </main>
        );
    }
}
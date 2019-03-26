import React, {Component} from 'react';
import './style.css';
import {connect} from 'react-redux';
import LibGenerator from '../BooksLibrary/LibGenerator';

const DEFAULT_BOOK = {
    date: LibGenerator.randomDate(new Date(1900), new Date()),
    id: null,
    imgUrl: '',
    author: '',
    name: '',
    notes: '',
    rate: 0,
    read: false
};

class SideEditor extends Component {

    constructor(props) {
        super();
        this.state = {
            book: (props.book === null) ? DEFAULT_BOOK : props.book
        };
    }

    render() {
        return (
            <aside>
                <p>
                    <label htmlFor="bookName">Book Name</label>
                    <input className={this.state.book.name ? '' : 'red'} value={this.state.book.name}
                           onChange={(el) => {
                               this.setState({book: Object.assign({}, this.state.book, {name: el.target.value})});
                           }} type="text" placeholder="e.g.: Alice in wonderland" id="bookName"/>
                </p>
                <p>
                    <label htmlFor="bookAuthor">Author</label>
                    <input className={this.state.book.author ? '' : 'red'} value={this.state.book.author}
                           onChange={(el) => {
                               this.setState({book: Object.assign({}, this.state.book, {author: el.target.value})});
                           }} type="text" placeholder="e.g.: Lewis Carroll" id="bookAuthor"/>
                </p>
                <p>
                    <label htmlFor="bookRating">Book Rating</label>
                    <input className={this.rateIsOk() ? '' : 'red'} value={this.state.book.rate}
                           onChange={(el) => {
                               this.setState({book: Object.assign({}, this.state.book, {rate: el.target.value})});
                           }} type="number" placeholder="e.g.: 77 " id="bookRating"/>
                </p>
                <p>
                    <label htmlFor="bookImage">Background image url</label>
                    <input className={this.imageURLIsOk() ? '' : 'red'} value={this.state.book.imgUrl}
                           onChange={(el) => {
                               this.setState({book: Object.assign({}, this.state.book, {imgUrl: el.target.value})});
                           }} type="text" placeholder="e.g.: http://somehost.com/logo.png" id="bookImage"/>
                </p>
                <p>
                    <button
                        className={this.inputValuesOk() ? '' : 'red'}
                        onClick={this.saveBook.bind(this)}>Save
                    </button>
                    <button onClick={() => {
                        this.props.onAsideChange('MENU');
                    }}>Cancel
                    </button>
                </p>
            </aside>
        )
    }

    inputValuesOk() {
        return this.state.book.author
            && this.state.book.author
            && this.rateIsOk()
            && this.imageURLIsOk();
    }

    rateIsOk() {
        return (!isNaN(parseInt(this.state.book.rate))) && this.state.book.rate >= 0 && this.state.book.rate <= 100;
    }

    imageURLIsOk() {
        return (this.state.book.imgUrl.match(/^(http|ftp|https).*(\/).*\.(jpg|jpeg|png|gif)$/) !== null);
    }


    saveBook() {
        fetch('https://cors-anywhere.herokuapp.com/' + this.state.book.imgUrl)
            .then((response) => {
                if (response.status !== 200) {
                    console.log('Image don\'t exist');
                    return;
                }

                let newBooks = this.props.books;

                if (this.state.book.id === null) {
                    newBooks = [this.state.book, ...newBooks];
                } else {
                    newBooks = this.props.books.map((book, index) => {
                        if (book.id === this.state.book.id) {
                            return this.state.book;
                        }
                        return book;
                    });
                }
                this.props.onBooksChange(newBooks);

            })
            .catch((e) => {
                console.log('Image test request error');
            });


    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.book === null) {
            this.setState({book: DEFAULT_BOOK});
        } else if (nextProps.book.id !== this.state.book.id) {
            this.setState({book: nextProps.book});
        }
        this.setState({books: nextProps.books});
    }
}


export default connect(
    state => ({
        book: state.bookValue,
        books: state.booksValue
    }),
    dispatch => ({
        onBooksChange: (booksValue) => {
            dispatch({type: 'CHANGE_BOOKS', payload: booksValue})
        },
        onAsideChange: (asideValue) => {
            dispatch({type: 'CHANGE_ASIDE_VALUE', payload: asideValue})
        }
    }))(SideEditor);

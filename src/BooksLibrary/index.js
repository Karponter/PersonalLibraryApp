import React, {Component} from 'react';
import './style.css';
import {connect} from "react-redux";
import LibGenerator from './LibGenerator';
import Rate from './Rate';
import Pagination from './Pagination';

const DEFAULT_ITEM_COUNT = 6;
const DEFAULT_BOOKS_COUNT = 5;

class BooksLibrary extends Component {
    state = {
        currentPage: 0
    };

    render() {
        const filteredBooks = this.getFilteredBooks(this.props.books);
        return (
            <main>
                <div className="pages-control">
                    <Pagination setPage={this.setPage.bind(this)}
                                pagination={(this.props.pagination === '') ? DEFAULT_ITEM_COUNT : this.props.pagination}
                                libSize={filteredBooks.length}/>
                </div>
                <div className="books-list">
                    {this.state.currentPage === 0 ? this.showAddButton() : ''}
                    {this.getBooks(filteredBooks)}
                </div>
            </main>
        );
    }

    async componentDidMount() {
        this.props.onBooksChange(await LibGenerator.getLibrary(DEFAULT_BOOKS_COUNT));
    }

    setPage(pageId) {
        this.setState({currentPage: pageId});
    };

    showAddButton() {
        return (<div onClick={() => {
            this.props.onAsideChange('EDIT');
            this.props.onBookChange(null);
        }} className="book">
            +
            <div className="book__rate"/>
            <div className="book__name">Add new book</div>
        </div>);
    }

    changeBookReadState(bookId) {
        this.setState({
            data:
                this.state.data.map((book, index) => {
                    if (book.id === bookId) {
                        book.read = !book.read;
                    }
                    return book;
                })
        });
    }

    getFilteredBooks(books) {
        if (books.length === 0) {
            return [];
        }
        let filteredBooks = books;

        if (this.props.search !== '') {
            filteredBooks = books.filter((book, index) => {
                return book.name.indexOf(this.props.search) !== -1;
            });
        }

        if (this.props.read !== 'All') {
            filteredBooks = filteredBooks.filter((book, index) => {
                return book.read === (this.props.read === 'Read');
            });
        }
        return filteredBooks;
    }

    getBooks(books) {
        if (books.length === 0) {
            return;
        }
        const pagination = (this.props.pagination === '') ? DEFAULT_ITEM_COUNT : Number(this.props.pagination);
        let filteredBooks = this.getFilteredBooks(books);

        if (this.props.sortProperty !== 'none') {
            filteredBooks = filteredBooks.sort((a, b) => {
                const sort = (this.props.sort) ? -1 : 1;

                if (typeof a[this.props.sortProperty] === 'string') {
                    return sort * b[this.props.sortProperty].localeCompare(a[this.props.sortProperty]);
                }
                if (typeof a[this.props.sortProperty] === 'number') {
                    return sort * b[this.props.sortProperty] - a[this.props.sortProperty];
                }
                return true;
            });
        }

        const booksToShow = [];
        const firstItem = (this.state.currentPage === 0) ? 0 : (this.state.currentPage * pagination) - 1;
        let lastItem = firstItem + pagination;
        lastItem = (this.state.currentPage === 0) ? lastItem - 1 : lastItem;
        lastItem = (lastItem < filteredBooks.length) ? lastItem : filteredBooks.length;

        for (let bookItem = firstItem; bookItem < lastItem; bookItem++) {
            booksToShow.push(
                <div onClick={() => {
                    this.props.onAsideChange('EDIT');
                    this.props.onBookChange(filteredBooks[bookItem]);
                }} className='book' key={bookItem}>
                    <div className='book__read'>{filteredBooks[bookItem].read ? 'read' : 'unread'}</div>
                    <div className='book__date'>{(new Date(filteredBooks[bookItem].date)).getFullYear()}
                    </div>
                    <img src={filteredBooks[bookItem].imgUrl} alt=''/>
                    <Rate rate={filteredBooks[bookItem].rate}/>
                    <div className='book__name'>{filteredBooks[bookItem].name}</div>
                </div>
            );
        }
        return booksToShow;
    }
}

export default connect(
    state => ({
        search: state.searchValue,
        pagination: state.paginationValue,
        read: state.readValue,
        sort: state.sortValue,
        sortProperty: state.sortPropertyValue,
        books: state.booksValue
    }),
    dispatch => ({
        onBookChange: (bookValue) => {
            dispatch({type: 'CHANGE_BOOK', payload: bookValue})
        },
        onBooksChange: (booksValue) => {
            dispatch({type: 'CHANGE_BOOKS', payload: booksValue})
        },
        onAsideChange: (asideValue) => {
            dispatch({type: 'CHANGE_ASIDE_VALUE', payload: asideValue})
        }
    }))(BooksLibrary);
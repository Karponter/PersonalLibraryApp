import React, {Component} from 'react';
import './style.css';
// import lib from '../books';
import {connect} from "react-redux";
import LibGenerator from './LibGenerator';
import Rate from './Rate';
import Pagination from './Pagination';

const DEFAULT_ITEM_COUNT = 6;

class BooksLibrary extends Component {
    state = {
        data: [],
        currentPage: 0
    };

    async setBooksArray() {
        const books = await LibGenerator.getLibrary(10);
        this.setState({data: books});
    }

    render() {
        return (
            <main>
                <div className="pages-control">
                    <Pagination setPage={this.setPage.bind(this)}
                                pagination={(this.props.pagination === '')
                                    ? DEFAULT_ITEM_COUNT : Number(this.props.pagination)}
                                libSize={this.state.data.length}/>
                </div>
                <div className="books-list">
                    {this.state.currentPage === 0 ? this.showAddButton() : ''}
                    {this.showBooks(this.state.data)}
                </div>
            </main>
        );
    }

    componentDidMount() {
        this.setBooksArray();
    }

    setPage(pageId) {
        this.setState({currentPage: pageId});
    };

    showAddButton() {
        return (<div className="book">
            +
            <div className="book__rate"/>
            <div className="book__title"/>
        </div>);
    }

    showBooks(books) {
        if (books.length === 0) {
            return;
        }

        const pagination = (this.props.pagination === '') ? DEFAULT_ITEM_COUNT : Number(this.props.pagination);

        const filteredBooks = books.filter((book, index) => {
            if (this.props.search === '') {
                return true;
            }
            return book.name.indexOf(this.props.search) !== -1;
        });

        const booksToShow = [];

        const firstItem = (this.state.currentPage === 0) ? 0 : (this.state.currentPage * pagination) - 1;
        let lastItem = firstItem + pagination;
        lastItem = (this.state.currentPage === 0) ? lastItem - 1 : lastItem;
        lastItem = (lastItem < filteredBooks.length) ? lastItem : filteredBooks.length ;

        for (let bookItem = firstItem; bookItem < lastItem; bookItem++) {
            booksToShow.push(
                <div className="book" key={bookItem}>
                    <img src={filteredBooks[bookItem].imgUrl} alt=""/>
                    <Rate rate={filteredBooks[bookItem].rate}/>
                    <div className="book__title">{filteredBooks[bookItem].name}</div>
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
        currentPage: state.currentPageValue
    }),
    dispatch => ({}))(BooksLibrary);
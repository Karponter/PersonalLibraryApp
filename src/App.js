import React, {Component} from 'react';
import './App.css';
import Lib from './Lib';
import {library} from '@fortawesome/fontawesome-svg-core'
import {
    faStar as faStarSolid,
    faSortUp,
    faSortDown
} from '@fortawesome/free-solid-svg-icons'
import {faStar as faStarRegular} from '@fortawesome/free-regular-svg-icons'

import Header from './Header';
import PanelSearch from './PanelSearch';
import PanelEdit from './PanelEdit';
import PagesControl from './PagesControl';
import BooksList from './BookItem/BooksList';

library.add(
    faStarSolid,
    faStarRegular,
    faSortUp,
    faSortDown);

class Library extends Component {
    constructor() {
        super();

        this.state = {
            books: [],
            search: '',
            page: 0,
            pagination: 9,
            sortProperty: 'name',
            sortOrder: true,
            readState: 'All',
            currentBook: null
        }
    }

    changeCurrentBook = (param, value) => {
        const currentBook = this.state.currentBook;
        currentBook[param] = value;
        this.setState({currentBook: currentBook});
    };

    searchHandler = (search) => {
        this.setState({search: search.target.value});
    };

    paginationHandler = (pagination) => {
        this.setState({pagination: pagination.target.value});
    };

    pageChangeHandler = (page) => {
        this.setState({page: page});
    };

    sortPropertyChange = (sortProperty) => {
        console.log(sortProperty.target.value);
        this.setState({sortProperty: sortProperty.target.value});
    };

    sortOrderChange = () => {
        this.setState({sortOrder: !this.state.sortOrder});
    };

    readStateChange = (readState) => {
        this.setState({readState: readState.target.value});
    };

    setCurrentBook = (book) => {
        this.setState({currentBook: book});
    };

    filteredBooks = (books, search, readState) => {
        return books.filter(book => book.name.match(search))
            .filter(book => {
                if (readState === 'All') return true;
                if (readState === 'Read' && book.read) return true;
                return readState === 'Unread' && !book.read;
            });
    };


    render() {
        const filteredBooks = this.filteredBooks(this.state.books, this.state.search, this.state.readState);
        return (
            <div className="App">
                <Header/>
                <div className="library-container">
                    <div className="library-content">
                        <PagesControl onPageChange={this.pageChangeHandler}
                                      pagination={this.state.pagination}
                                      libSize={filteredBooks.length}/>
                        <BooksList sortProperty={this.state.sortProperty}
                                   sortOrder={this.state.sortOrder}
                                   page={this.state.page}
                                   pagination={this.state.pagination}
                                   setCurrentBook={this.setCurrentBook}
                                   books={filteredBooks}/>
                    </div>
                    {this.state.currentBook === null
                        ? <PanelSearch
                            searchHandler={this.searchHandler}
                            pagination={this.state.pagination}
                            paginationHendler={this.paginationHandler}
                            sortOrder={this.state.sortOrder}
                            sortProperty={this.state.sortProperty}
                            sortPropertyChange={this.sortPropertyChange}
                            sortOrderChange={this.sortOrderChange}
                            readState={this.state.readState}
                            onReadStateChange={this.readStateChange}
                        />
                        : <PanelEdit context={this}/>}
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.setState({books: Lib(20)});
    }
}

export default Library;
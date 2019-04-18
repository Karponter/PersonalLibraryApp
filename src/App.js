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
import BooksList from './BooksList';
import {Route, Switch} from "react-router-dom";
import Lib2 from './test';

library.add(
    faStarSolid,
    faStarRegular,
    faSortUp,
    faSortDown);

class Library extends Component {
    constructor() {
        super();

        this.state = {
            books: Lib(20),
            search: '',
            page: 0,
            pagination: 9,
            sortProperty: 'name',
            sortOrder: true,
            readState: 'All',
            currentBook: Lib2.getEmptyBook()
        }
    }

    currentBookChange = (param, value) => {
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

    onSaveCurrentBookItem = () => {
        const bookToSave = Object.assign({}, this.state.currentBook);
        delete bookToSave.tempRate;

        let newBooks;
        if (bookToSave.id === null) {
            bookToSave.id = Math.trunc(Math.random() * 1000000);
            newBooks = [...this.state.books, bookToSave];
        } else {
            newBooks = this.state.books.map((bookItem) => {
                if (bookItem.id === bookToSave.id) {
                    return bookToSave;
                }
                return bookItem;
            });
        }
        this.setState({books: newBooks});
        this.setState({currentBook: Object.assign({}, bookToSave)});
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
                    <Switch>
                        <Route path="/edit/:book" render={(props) => <PanelEdit
                            {...props}
                            books={this.state.books}
                            currentBook={this.state.currentBook}
                            onCurrentBookChange={this.currentBookChange}
                            setCurrentBook={this.setCurrentBook}
                            onSaveCurrentBookItem={this.onSaveCurrentBookItem}
                        />}/>
                        <Route path="/edit" render={(props) => <PanelEdit
                            {...props}
                            onCurrentBookChange={this.currentBookChange}
                            setCurrentBook={this.setCurrentBook}
                            onSaveCurrentBookItem={this.onSaveCurrentBookItem}
                        />}/>
                        <Route path="/" render={(props) => <PanelSearch
                            {...props}
                            searchHandler={this.searchHandler}
                            pagination={this.state.pagination}
                            paginationHandler={this.paginationHandler}
                            sortOrder={this.state.sortOrder}
                            sortProperty={this.state.sortProperty}
                            sortPropertyChange={this.sortPropertyChange}
                            sortOrderChange={this.sortOrderChange}
                            readState={this.state.readState}
                            onReadStateChange={this.readStateChange}
                        />}/>
                    </Switch>
                </div>
            </div>
        );
    }

}

export default Library;
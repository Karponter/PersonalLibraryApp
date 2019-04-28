import React, {useContext, useState} from 'react';
import './App.css';

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
import LibraryContext from './LibraryContext';

library.add(
    faStarSolid,
    faStarRegular,
    faSortUp,
    faSortDown);

export default function Library() {
    const booksLibrary = useContext(LibraryContext);
    const [books, setBooks] = useState(booksLibrary.getBooks());
    const [pagination, setPagination] = useState(9);
    const [page, setPage] = useState(0);
    const [sortOrder, setSortOrder] = useState(true);
    const [sortProperty, setSortProperty] = useState('name');
    const [readState, setReadState] = useState('All');
    const [search, setSearch] = useState('');
    // const [currentBook, setCurrentBook] = useState(booksLibrary.getEmptyBook());

    booksLibrary.onLibraryChange(() => {
        setBooks([...booksLibrary.getBooks()]);
    });

    const filteredBooks = books
        .filter(book => book.name.match(search))
        .filter(book => {
            if (readState === 'All') return true;
            if (readState === 'Read' && book.read) return true;
            return readState === 'Unread' && !book.read;
        })
        .sort((a, b) => {
            if (typeof a[sortProperty] === 'string') {
                return a[sortProperty].localeCompare(b[sortProperty]) * (sortOrder ? 1 : -1);
            }
            if (typeof a[sortProperty] === 'number') {
                return (a[sortProperty] - b[sortProperty]) * (sortOrder ? 1 : -1);
            }
            return false;
        });

    return (
        <div className="App">
            <Header/>
            <div className="library-container">
                <div className="library-content">
                    <PagesControl
                        onPageChange={setPage}
                        pagination={pagination}/>
                    <BooksList
                        page={page}
                        pagination={pagination}
                        books={filteredBooks}
                    />
                </div>
                <Switch>
                    <Route path="/edit/:book"
                           render={(props) => <PanelEdit {...props}/>}/>
                    <Route path="/edit" render={(props) => <PanelEdit {...props}/>}/>
                    <Route path="/" render={(props) => <PanelSearch
                        {...props}
                        searchHandler={setSearch}
                        pagination={pagination}
                        paginationHandler={setPagination}
                        sortOrder={sortOrder}
                        sortProperty={sortProperty}
                        sortPropertyChange={setSortProperty}
                        sortOrderChange={setSortOrder}
                        readState={readState}
                        onReadStateChange={setReadState}
                    />}/>
                </Switch>
            </div>
        </div>
    );

}


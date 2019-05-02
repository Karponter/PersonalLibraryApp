import React, {useContext, useState} from 'react';
import {Route, Switch} from "react-router-dom";
import PagesControl from "../PagesControl";
import BooksList from "../BooksList";
import PanelEdit from "../PanelEdit";
import PanelSearch from "../PanelSearch";
import {FirebaseContext} from '../Firebase';

export default function LibraryContainer() {

    const firebase = useContext(FirebaseContext);
    const [books, setBooks] = useState([]);
    const [pagination, setPagination] = useState(9);
    const [page, setPage] = useState(0);
    const [sortOrder, setSortOrder] = useState(true);
    const [sortProperty, setSortProperty] = useState('name');
    const [readState, setReadState] = useState('All');
    const [search, setSearch] = useState('');

    firebase.onBooksChange((data) => {
        setBooks(data);
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
        <div className="library-container">
            <div className="library-content">
                <PagesControl
                    onPageChange={setPage}
                    libSize={books.length}
                    pagination={pagination}/>
                <BooksList
                    page={page}
                    pagination={pagination}
                    books={filteredBooks}
                />
            </div>
            <Switch>
                <Route path="/edit/:book"
                       render={(props) => <PanelEdit
                           books={books}
                           {...props}/>}/>
                <Route path="/edit" render={(props) => <PanelEdit {...props} books={books}/>}/>
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
    );
}
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
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

library.add(
    faStarSolid,
    faStarRegular,
    faSortUp,
    faSortDown);


const Header = () => {
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
};

const Search = ({onSearchChange}) => {
    return (
        <p className="inputFiled">
            <label htmlFor="search">Search</label>
            <input id="search" onChange={onSearchChange} type="text"/>
        </p>
    );
};


const Pagination = ({onPaginationChange, pagination}) => {
    const paginationValues = [6, 9, 12, 18, 36];
    return (
        <p className="inputFiled">
            <label htmlFor="pagination">Pagination</label>
            <select id="pagination" value={pagination} onChange={onPaginationChange}>
                {paginationValues.map((value, index) => <option key={index}>{value}</option>)}
            </select>
        </p>
    );
};

const ReadState = ({onReadStateChange, readState}) => {
    const readStates = ['All', 'Read', 'Unread'];
    return (
        <p>
            <label htmlFor="read">Read state</label>
            <select value={readState} onChange={onReadStateChange} id="read">
                {readStates.map((state, index) => <option key={index}>{state}</option>)}
            </select>
        </p>
    );

};

const PagesControl = ({libSize, pagination, onPageChange}) => {
    let pagesCount = Math.trunc(libSize / pagination);
    pagesCount = (pagesCount * pagination !== libSize) ? pagesCount + 1 : pagesCount;
    const pages = [...Array(pagesCount)].map((el, index) =>
        <li key={index} onClick={() => {
            onPageChange(index);
        }}>{index}</li>);
    return (
        <ul className="page-control">
            Pages: {pages}
        </ul>
    );
};

const BooksList = ({books, page, pagination, sortOrder, sortProperty}) => {
    books.sort((a, b) => {
        if (typeof a[sortProperty] === 'string') {
            return a[sortProperty].localeCompare(b[sortProperty]) * (sortOrder ? 1 : -1);
        }
        if (typeof a[sortProperty] === 'number') {
            return (a[sortProperty] - b[sortProperty]) * (sortOrder ? 1 : -1);
        }
        return false;
    });

    const getActualBooks = () => {
        return books.map((book, index) => {
                if ((index < page * pagination)
                    || (index > ((page + 1) * pagination) - 1)) {
                    return false;
                }
                return (<BookItem key={index} bookItem={book}/>);
            }
        )
    };

    return (
        <div className="books-list">
            {getActualBooks()}
        </div>
    );
};

const BookRate = ({rate}) => {
    const stars = Math.trunc(rate / 20);
    return (
        <div className="book-item__rate">
            {[...Array(stars)].map((el, ind) => <FontAwesomeIcon key={ind} icon={faStarSolid}/>)}
            {[...Array(5 - stars)].map((el, ind) => <FontAwesomeIcon key={ind} icon={faStarRegular}/>)}
        </div>
    );
};

const BookTitle = ({title}) => {
    return (
        <div className="book-item__title">
            {title}
        </div>
    );
};

const BookItem = ({bookItem}) => {
    return (
        <div className="book-item">
            <BookRate rate={bookItem.rate}/>
            <BookTitle title={bookItem.name}/>
        </div>
    );
};

const SortProperty = ({order, property, onSortOrderChange, onSortPropertyChange}) => {
    const sortProperties = ['name', 'rate', 'author', 'date'];
    return (
        <p>
            <label htmlFor="property">Sort</label>
            <select className="sort-select" id="property"
                    value={property}
                    onChange={onSortPropertyChange}>
                {sortProperties.map((property, index) => <option key={index}>{property}</option>)}
            </select>
            <FontAwesomeIcon className="sort-order" onClick={onSortOrderChange} icon={order ? faSortUp : faSortDown}/>
        </p>
    );
};



class Library extends Component {
    constructor() {
        super();

        this.state = {
            books: [],
            search: '',
            page: 0,
            pagination: 6,
            sortProperty: 'name',
            sortOrder: true,
            readState: 'All'
        }
    }

    searchHandle = (search) => {
        this.setState({search: search.target.value});
    };

    paginationHandle = (pagination) => {
        this.setState({pagination: pagination.target.value});
    };

    pageChangeHandle = (page) => {
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

    filteredBooks = (books, search, readState) => {

        return books.filter((book, index) => {
            return book.name.match(search);
        }).filter((book, index) => {
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
                        <PagesControl onPageChange={this.pageChangeHandle}
                                      pagination={this.state.pagination}
                                      libSize={filteredBooks.length}/>
                        <BooksList sortProperty={this.state.sortProperty}
                                   sortOrder={this.state.sortOrder}
                                   page={this.state.page}
                                   pagination={this.state.pagination}
                                   books={filteredBooks}/>
                    </div>
                    <aside>
                        <Search onSearchChange={this.searchHandle.bind(this)}/>
                        <Pagination pagination={this.state.pagination}
                                    onPaginationChange={this.paginationHandle.bind(this)}/>
                        <SortProperty order={this.state.sortOrder}
                                      property={this.state.sortProperty}
                                      onSortPropertyChange={this.sortPropertyChange.bind(this)}
                                      onSortOrderChange={this.sortOrderChange.bind(this)}/>
                        <ReadState readState={this.state.readState}
                                   onReadStateChange={this.readStateChange.bind(this)}/>
                    </aside>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.setState({books: Lib(20)});
    }
}

export default Library;
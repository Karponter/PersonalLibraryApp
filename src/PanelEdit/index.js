import React, {useContext, useEffect, useState} from 'react';
import BookName from './BookName';
import BookAuthor from "./BookAuthor";
import BookImgUri from "./BookImgUri";
import BookRate from "./BookRate";
import './style.css';
import {Link} from "react-router-dom";
import LibraryContext from "../LibraryContext";

export default function PanelEdit({match}) {
    const booksLibrary = useContext(LibraryContext);

    const [currentBookId, setCurrentBookId] = useState(null);
    const [bookName, setBookName] = useState('');
    const [bookAuthor, setBookAuthor] = useState('');
    const [bookRate, setBookRate] = useState(0);
    const [bookImgUrl, setBookImgUrl] = useState('');
    const [error, setError] = useState('');

    const parseUrl = match.url.split('/');
    const bookId = (parseUrl[2] ? parseUrl[2] : null);

    let editingBook;
    if (!bookId || !(editingBook = booksLibrary.getBook(bookId))) {
        editingBook = booksLibrary.getEmptyBook();
    }

    useEffect(() => {
        if ((editingBook.id === null && currentBookId !== null)
            || editingBook.id !== null) {
            setCurrentBookId(editingBook.id);
            setBookName(editingBook.name);
            setBookAuthor(editingBook.author);
            setBookRate(editingBook.rate);
            setBookImgUrl(editingBook.imgUrl);
        }
    }, [editingBook]);

    const margeEditingBook = () => {
        return Object.assign({}, editingBook, {
            name: bookName,
            author: bookAuthor,
            rate: bookRate,
            imgUrl: bookImgUrl
        });
    };

    const saveBook = (book) => {
        if (booksLibrary.doseBookExist(book)) {
            booksLibrary.updateBook(book)
        } else {
            booksLibrary.addBook(book);
        }
    };

    return (
        <aside>
            {bookId && editingBook.id === null
                ? <p className="book-error">Book id#{bookId} don't found</p>
                : ''}
            <BookName
                onBookNameChange={el => setBookName(el.target.value)}
                setGlobalError={setError}
                bookName={bookName}/>
            <BookAuthor
                onBookAuthorChange={el => setBookAuthor(el.target.value)}
                setGlobalError={setError}
                bookAuthor={bookAuthor}/>
            <BookRate
                className="book-rate"
                bookRate={bookRate}
                onBookRateChange={rate => setBookRate(rate)}/>
            <BookImgUri
                onBookImgChange={el => setBookImgUrl(el.target.value)}
                setGlobalError={setError}
                bookUri={bookImgUrl}/>
            <form className="btn-control">
                <Link to="/">
                    {(!bookId && editingBook.id === null) || (bookId && editingBook.id !== null)
                        ? <button
                            className={error ? 'book-error' : ''}
                            onClick={() => saveBook(margeEditingBook())}>
                            {!bookId && editingBook.id === null ? 'Add' : 'Save'}
                        </button>
                        : ''}
                    {bookId && editingBook.id !== null
                        ? <button onClick={() => booksLibrary.deleteBook(bookId)}>Delete</button>
                        : ''}
                    <button>Cancel</button>
                </Link>
            </form>
        </aside>
    );
}



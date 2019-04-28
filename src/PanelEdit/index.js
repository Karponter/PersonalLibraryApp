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
            {bookId ? '' : <p className="book-error">Book id#{bookId} don't found</p>}
            <BookName
                onBookNameChange={el => setBookName(el.target.value)}
                bookName={bookName}/>
            <BookAuthor
                onBookAuthorChange={el => setBookAuthor(el.target.value)}
                bookAuthor={bookAuthor}/>
            <BookRate
                className="book-rate"
                bookRate={bookRate}
                onBookRateChange={rate => setBookRate(rate)}/>
            <BookImgUri
                onBookImgChange={el => setBookImgUrl(el.target.value)}
                bookUri={bookImgUrl}/>
            <Link to="/">
                <button>Cancel</button>
            </Link>
            <Link to="/">
                <button onClick={() => saveBook(margeEditingBook())}>
                    Save
                </button>
            </Link>
        </aside>
    );
}



import React, {useContext, useEffect, useState} from 'react';
import BookName from './BookName';
import BookAuthor from "./BookAuthor";
import BookImgUri from "./BookImgUri";
import BookRate from "./BookRate";
import './style.css';
import {Link} from "react-router-dom";
import {getEmptyBook, makeBookRandom} from '../Library';
import {FirebaseContext} from '../Firebase';

export default function PanelEdit({match, books}) {

    const firebase = useContext(FirebaseContext);
    const [currentBookId, setCurrentBookId] = useState(null);
    const [bookName, setBookName] = useState('');
    const [bookAuthor, setBookAuthor] = useState('');
    const [bookRate, setBookRate] = useState(0);
    const [bookImgUrl, setBookImgUrl] = useState('');
    const [error, setError] = useState('');

    const bookId = (match.params.book ? match.params.book : null);

    let editingBook;
    if (!bookId || !(editingBook = books.find(el => el.id === bookId))) {
        editingBook = getEmptyBook();
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
        if (books.find(el => el.id === book.id)) {
            firebase.updateBook(book)
        } else {
            firebase.addBook(makeBookRandom(book));
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
                        ? <button onClick={() => firebase.deleteBook(bookId)}>Delete</button>
                        : ''}
                    <button>Cancel</button>
                </Link>
            </form>
        </aside>
    );
}



import React, {useContext, useEffect, useState} from 'react';
import BookName from './BookName';
import BookAuthor from "./BookAuthor";
import BookImgUri from "./BookImgUri";
import BookRate from "./BookRate";
import './style.css';
import {Link, Redirect} from "react-router-dom";
import {getEmptyBook, makeBookRandom} from '../Library';
import {FirebaseContext} from '../Firebase';

export default function PanelEdit({match, books}) {

    const firebase = useContext(FirebaseContext);
    const [currentBookId, setCurrentBookId] = useState(null);
    const [bookName, setBookName] = useState('');
    const [bookAuthor, setBookAuthor] = useState('');
    const [bookRate, setBookRate] = useState(0);
    const [bookImgUrl, setBookImgUrl] = useState('');
    const [error, setError] = useState(false);
    const [forceCheck, setForceCheck] = useState(false);
    const [redirect, setRedirect] = useState(false);

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
        setForceCheck(true);
        if (error ||
            (!bookName || !bookAuthor || !bookImgUrl || bookRate === 0)) {
            setError(true);
            console.log('Input values error');
            return;
        }
        if (books.find(el => el.id === book.id)) {
            firebase.updateBook(book)
        } else {
            firebase.addBook(makeBookRandom(book));
        }

        setRedirect(true);
    };

    const renderRedirect = () => {
        return (
            <Redirect to="/"/>
        );
    };

    return (
        <aside>
            {redirect ? renderRedirect() : ''}
            {bookId && editingBook.id === null
                ? <p className="book-error">Book id#{bookId} don't found</p>
                : ''}
            <BookName
                onBookNameChange={el => setBookName(el.target.value)}
                setGlobalError={setError}
                bookName={bookName}
                forceCheck={forceCheck}/>
            <BookAuthor
                onBookAuthorChange={el => setBookAuthor(el.target.value)}
                setGlobalError={setError}
                bookAuthor={bookAuthor}
                forceCheck={forceCheck}/>
            <BookRate
                className="book-rate"
                bookRate={bookRate}
                onBookRateChange={rate => setBookRate(rate)}
                forceCheck={forceCheck}/>
            <BookImgUri
                onBookImgChange={el => setBookImgUrl(el.target.value)}
                setGlobalError={setError}
                bookUri={bookImgUrl}
                forceCheck={forceCheck}/>
            <form action="#" className="btn-control">
                {(!bookId && editingBook.id === null) || (bookId && editingBook.id !== null)
                    ? <button
                        className={error ? 'book-error' : ''}
                        onClick={(ev) => {
                            ev.preventDefault();
                            saveBook(margeEditingBook());
                        }}>
                        {!bookId && editingBook.id === null ? 'Add' : 'Save'}
                    </button>
                    : ''}
                <Link to="/">
                    {bookId && editingBook.id !== null
                        ? <button onClick={() => firebase.deleteBook(bookId)}>Delete</button>
                        : ''}
                    <button>Cancel</button>
                </Link>
            </form>
        </aside>
    );
}



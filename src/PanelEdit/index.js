import React from 'react';
import BookName from './BookName';
import BookAuthor from "./BookAuthor";
import BookImgUri from "./BookImgUri";
import BookRate from "./BookRate";
import './style.css';

export default function PanelEdit({
                                      currentBookItem, setCurrentBook,
                                      onCurrentBookChange, onSaveCurrentBookItem
                                  }) {
    // console.log(currentBookItem);
    return (
        <aside>
            <BookName
                onBookNameChange={(el) =>
                    onCurrentBookChange('name', el.target.value)
                }
                bookName={currentBookItem ? currentBookItem.name : null}/>
            <BookAuthor
                onBookAuthorChange={(el) =>
                    onCurrentBookChange('author', el.target.value)
                }
                bookAuthor={currentBookItem ? currentBookItem.author : null}/>
            <BookRate
                className="book-rate"
                bookRate={currentBookItem.rate}
                bookTempRate={currentBookItem.tempRate}
                onBookRateChange={(rate) => {
                    onCurrentBookChange('rate', rate)
                }}
                onBookTempRateChange={(rate) => {
                    onCurrentBookChange('tempRate', rate)
                }}/>
            <BookImgUri
                onBookImgChange={(el) => {
                    onCurrentBookChange('imgUrl', el.target.value)
                }}
                bookUri={currentBookItem ? currentBookItem.imgUrl : null}/>
            <button onClick={() => setCurrentBook(null)}>Cancel</button>
            <button onClick={() => onSaveCurrentBookItem()}>Save</button>
        </aside>
    );
};

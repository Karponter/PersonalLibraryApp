import React from 'react';
import BookName from './BookName';
import BookAuthor from "./BookAuthor";
import BookImgUri from "./BookImgUri";
import BookRate from "./BookRate";
import './style.css';
import ButtonSave from "./ButtonSave";

export default function PanelEdit({
                                      currentBookItem, setCurrentBook,
                                      onCurrentBookChange, onSaveCurrentBookItem
                                  }) {
    return (
        <aside>
            <BookName
                onBookNameChange={(el) =>
                    onCurrentBookChange('name', el.target.value)
                }
                bookName={currentBookItem.name ? currentBookItem.name : ''}/>
            <BookAuthor
                onBookAuthorChange={(el) =>
                    onCurrentBookChange('author', el.target.value)
                }
                bookAuthor={currentBookItem.author ? currentBookItem.author : ''}/>
            <BookRate
                className="book-rate"
                bookRate={currentBookItem.rate ? currentBookItem.rate : 0}
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
                bookUri={currentBookItem.imgUrl ? currentBookItem.imgUrl : ''}/>
            <button onClick={() => setCurrentBook(null)}>Cancel</button>
            <ButtonSave
                onSaveCurrentBookItem={onSaveCurrentBookItem}
                currentBookItem={currentBookItem}/>
        </aside>
    );
};

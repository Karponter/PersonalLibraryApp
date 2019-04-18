import React from 'react';
import './style.css';

export default function ButtonSave({onSaveCurrentBookItem, currentBookItem}) {
    const currentBookCheck = (book) => {
        // return (book.author ? book.author.match(/^[a-zA-Z ]+$/) : false)
        //     && (book.imgUrl ? book.imgUrl.match(/^http[s]?:\/\/.+\/.*\.(png|jpg|jpeg|gif)$/) : false)
        //     && book.name;
        return true;
    };
    return (
        <span>
            <button
                className={currentBookCheck(currentBookItem) ? '' : 'btn-error'}
                onClick={() => {
                    if (!currentBookCheck(currentBookItem)) {
                        console.log('Fill "Book Name" and "Author" filed.');
                        return;
                    }
                    onSaveCurrentBookItem();
                }}>Save</button>
        </span>
    );

};
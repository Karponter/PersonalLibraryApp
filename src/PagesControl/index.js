import React from 'react';
import './style.css';

export default function PagesControl({pagination, onPageChange, libSize}) {

    const PLUS_EMPTY_BOOK = 1;
    const librarySize = libSize + PLUS_EMPTY_BOOK;

    let pagesCount = Math.trunc(librarySize / pagination);
    pagesCount = (pagesCount * pagination !== librarySize) ? pagesCount + 1 : pagesCount;
    const pages = [...Array(pagesCount)].map((el, index) =>
        <li key={index} onClick={() => {
            onPageChange(index)
        }}>{index}</li>);
    return (
        <ul className="page-control">
            Pages: {pages}
        </ul>
    );
}
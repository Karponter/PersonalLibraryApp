import React from 'react';
import './style.css';

export default function PagesControl({libSize, pagination, onPageChange}) {
    const PLUS_EMPTY_BOOK = 1;
    libSize += PLUS_EMPTY_BOOK;
    let pagesCount = Math.trunc(libSize / pagination);
    pagesCount = (pagesCount * pagination !== libSize) ? pagesCount + 1 : pagesCount;
    const pages = [...Array(pagesCount)].map((el, index) =>
        <li key={index} onClick={(e) => {
            onPageChange(index)
        }}>{index}</li>);
    return (
        <ul className="page-control">
            Pages: {pages}
        </ul>
    );
}
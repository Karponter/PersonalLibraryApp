import React, {useContext} from 'react';
import './style.css';
import LibraryContext from "../LibraryContext";

export default function PagesControl({pagination, onPageChange}) {

    const PLUS_EMPTY_BOOK = 1;
    const librarySize = useContext(LibraryContext).getBooks().length + PLUS_EMPTY_BOOK;

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
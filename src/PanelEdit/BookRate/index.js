import React from 'react'
import {faStar as faStarSolid} from "@fortawesome/free-solid-svg-icons/index";
import {faStar as faStarRegular} from "@fortawesome/free-regular-svg-icons/index";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import './style.css';

export default function BookRate({bookRate, bookTempRate, onBookRateChange, onBookTempRateChange}) {
    const percentPerStar = 20;
    const stars = Math.trunc(bookTempRate / percentPerStar);

    return (
        <p className='book-rate'>
            {[...Array(5)].map((el, ind) => {
                return (
                    <span key={ind}
                          onMouseEnter={() => {
                              if (stars !== ind + 1) {
                                  onBookTempRateChange((ind + 1) * percentPerStar);
                              }
                          }}
                          onMouseLeave={() => {
                              onBookTempRateChange(bookRate);
                          }}
                          onClick={() => {
                              onBookRateChange(bookTempRate);
                          }}
                    >
                <FontAwesomeIcon
                    icon={ind <= stars - 1 ? faStarSolid : faStarRegular}/>
                </span>
                );
            })}

        </p>
    );
};
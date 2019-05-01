import React, {useEffect, useState} from 'react'
import {faStar as faStarSolid} from "@fortawesome/free-solid-svg-icons/index";
import {faStar as faStarRegular} from "@fortawesome/free-regular-svg-icons/index";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import './style.css';

export default function BookRate({bookRate, onBookRateChange}) {
    const [rate, setRate] = useState();
    useEffect(() => setRate(bookRate), bookRate);

    const percentPerStar = 20;
    const stars = Math.trunc(rate / percentPerStar);

    return (
        <p className='book-rate'>
            {[...Array(5)].map((el, ind) => {
                return (
                    <span key={ind}
                          onMouseEnter={() => {
                              setRate((ind + 1) * percentPerStar);
                          }}
                          onMouseLeave={() => {
                              setRate(bookRate);
                          }}

                          onClick={() => {
                              onBookRateChange(rate);
                          }}
                    >
                <FontAwesomeIcon
                    icon={ind <= stars - 1 ? faStarSolid : faStarRegular}/>
                </span>
                );
            })}
        </p>
    );
}
;
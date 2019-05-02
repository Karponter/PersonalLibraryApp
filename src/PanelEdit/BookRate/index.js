import React, {useEffect, useState} from 'react'
import {faStar as faStarSolid} from "@fortawesome/free-solid-svg-icons/index";
import {faStar as faStarRegular} from "@fortawesome/free-regular-svg-icons/index";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import './style.css';

export default function BookRate({bookRate, onBookRateChange, forceCheck}) {

    const [rate, setRate] = useState(bookRate);
    const [error, setError] = useState(false);

    useEffect(() => setRate(bookRate), [bookRate]);


    const rateCheck = (rate) => {
        return !(rate > 0 && rate <= 100);
    };

    const percentPerStar = 20;
    const stars = Math.trunc(rate / percentPerStar);

    if (forceCheck && error !== rateCheck(bookRate)) {
        setError(rateCheck(bookRate));
    }

    return (
        <p className={error ? 'error-rate book-rate' : 'book-rate'}>
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
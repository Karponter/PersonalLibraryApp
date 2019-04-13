import React from 'react';
import {faStar as faStarSolid} from "@fortawesome/free-solid-svg-icons/index";
import {faStar as faStarRegular} from "@fortawesome/free-regular-svg-icons/index";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

export default function BookRate({rate}) {
    const stars = Math.trunc(rate / 20);
    return (
        <div className="book-item__rate">
            {[...Array(stars)].map((el, ind) => <FontAwesomeIcon key={ind} icon={faStarSolid}/>)}
            {[...Array(5 - stars)].map((el, ind) => <FontAwesomeIcon key={ind} icon={faStarRegular}/>)}
        </div>
    );
};
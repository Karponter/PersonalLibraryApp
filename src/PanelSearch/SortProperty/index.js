import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSortDown, faSortUp} from "@fortawesome/free-solid-svg-icons/index";

export default function SortProperty({order, property, onSortOrderChange, onSortPropertyChange}) {
    const sortProperties = ['name', 'rate', 'author', 'date'];
    return (
        <p>
            <label htmlFor="property">Sort</label>
            <select className="sort-select" id="property"
                    value={property}
                    onChange={(el) => onSortPropertyChange(el.target.value)}>
                {sortProperties.map((property, index) => <option key={index}>{property}</option>)}
            </select>
            <FontAwesomeIcon className="sort-order" onClick={() => onSortOrderChange(!order)} icon={order ? faSortUp : faSortDown}/>
        </p>
    );
};

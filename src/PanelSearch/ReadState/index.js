import React from 'react';


export default function ReadState({onReadStateChange, readState}) {
    const readStates = ['All', 'Read', 'Unread'];
    return (
        <p>
            <label htmlFor="read">Read state</label>
            <select value={readState} onChange={onReadStateChange} id="read">
                {readStates.map((state, index) => <option key={index}>{state}</option>)}
            </select>
        </p>
    );

};
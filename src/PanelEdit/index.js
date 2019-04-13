import React from 'react';

export default function PanelEdit({context}) {
    return (
        <aside>
            <input
                type="text" value={context.state.currentBook.name}
                onChange={(el) => {
                    context.changeCurrentBook('name', el.target.value);
                }}/>
            <button onClick={context.setCurrentBook.bind(null, null)}>Cancel</button>
            <button onClick={context.setCurrentBook.bind(null, null)}>Save</button>
        </aside>
    );
};

import React from 'react';
import Search from './Search';
import Pagination from './Pagination';
import SortProperty from './SortProperty';
import ReadState from './ReadState';


export default function PanelSearch({
                                        searchHandler,
                                        pagination, paginationHandler,
                                        sortOrder, sortProperty, sortPropertyChange, sortOrderChange,
                                        readState, onReadStateChange
                                    }) {
    return (
        <aside>
            <Search onSearchChange={el => searchHandler(el.target.value)}/>
            <Pagination pagination={pagination}
                        onPaginationChange={el => paginationHandler(el.target.value)}/>
            <SortProperty order={sortOrder}
                          property={sortProperty}
                          onSortPropertyChange={sortPropertyChange}
                          onSortOrderChange={sortOrderChange}/>
            <ReadState readState={readState}
                       onReadStateChange={el => onReadStateChange(el.target.value)}/>
        </aside>
);
};
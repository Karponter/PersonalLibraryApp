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
            <Search onSearchChange={searchHandler}/>
            <Pagination pagination={pagination}
                        onPaginationChange={paginationHandler}/>
            <SortProperty order={sortOrder}
                          property={sortProperty}
                          onSortPropertyChange={sortPropertyChange}
                          onSortOrderChange={sortOrderChange}/>
            <ReadState readState={readState}
                       onReadStateChange={onReadStateChange}/>
        </aside>
    );
};
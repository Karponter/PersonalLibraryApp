import React from 'react';
import Search from './Search';
import Pagination from './Pagination';
import SortProperty from './SortProperty';
import ReadState from './ReadState';


export default function PanelSearch({context}) {
    return (
        <aside>
            <Search onSearchChange={context.searchHandle.bind(context)}/>
            <Pagination pagination={context.state.pagination}
                        onPaginationChange={context.paginationHandle.bind(context)}/>

            <SortProperty order={context.state.sortOrder}
                          property={context.state.sortProperty}
                          onSortPropertyChange={context.sortPropertyChange.bind(context)}
                          onSortOrderChange={context.sortOrderChange.bind(context)}/>
            <ReadState readState={context.state.readState}
                       onReadStateChange={context.readStateChange.bind(context)}/>
        </aside>
    );
};
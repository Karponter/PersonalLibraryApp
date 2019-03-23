import React, {Component} from 'react';
import {connect} from 'react-redux';
import './style.css'

class SideMenu extends Component {
    test = {
        search: '',
    };

    render() {

        return (
            <aside>
                <p>
                    <label htmlFor="search">Search</label>
                    <input onChange={(e) => {this.props.onSearchChange(e.target.value)}}  type="text" placeholder="e.g.: Alice in wonderland" id="search"/>
                </p>
                <p>
                    <label htmlFor="sort">Sort By</label>
                    <input type="text" placeholder="Select criteria" id="sort"/>
                </p>
                <p>
                    <label htmlFor="paginate">Paginate By</label>
                    <input onChange={(e) => this.props.onPaginationChange(e.target.value)} type="text" placeholder="Select amount" id="paginate"/>
                </p>
            </aside>
        )
    }

}

export default connect(
    state => ({}),
    dispatch => ({
        onSearchChange: (searchValue) => {
            dispatch({type: 'CHANGE_SEARCH_VALUE', payload: searchValue})
        },
        onPaginationChange: (paginationValue) => {
            dispatch({type: 'CHANGE_PAGINATION_VALUE', payload: paginationValue})
        }
    })
)(SideMenu);


import React, {Component} from 'react';
import {connect} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './style.css'

const READ_VALUES = ['Read', 'Unread', 'All'];

class SideMenu extends Component {
    test = {
        search: '',
    };

    readMenuBack() {
        const currentPosition = READ_VALUES.indexOf(this.props.read);
        if (currentPosition === 0) {
            return READ_VALUES[READ_VALUES.length - 1];
        }
        return READ_VALUES[currentPosition - 1];
    }

    readMenuForward() {
        const currentPosition = READ_VALUES.indexOf(this.props.read);
        if (currentPosition === READ_VALUES.length - 1) {
            return READ_VALUES[0];
        }
        return READ_VALUES[currentPosition + 1];
    }

    render() {
        return (
            <aside>
                <p>
                    <label htmlFor="search">Search</label>
                    <input onChange={(e) => {
                        this.props.onSearchChange(e.target.value)
                    }} type="text" placeholder="e.g.: Alice in wonderland" id="search"/>
                </p>
                <p>
                    <label htmlFor="sort">Sort By</label>
                    <span onChange={(e) => {
                        this.props.onSortPropertyChange(e.target.value)
                    }} className="sort">
                        <select id="sort">
                            <option value="none">None</option>
                            <option value="name">Name</option>
                            <option value="author">Author</option>
                            <option value="date">Date</option>
                            <option value="rate">Rate</option>
                        </select>
                        <span><FontAwesomeIcon
                            onClick={() => {
                                this.props.onSortChange(!this.props.sort);
                            }}
                            icon={(this.props.sort) ? 'sort-up' : 'sort-down'}/></span>
                    </span>
                </p>
                <p>
                    <label htmlFor="paginate">Paginate By</label>
                    <input onChange={(e) => this.props.onPaginationChange(e.target.value)} type="number"
                           placeholder="Select amount" id="paginate"/>
                </p>
                <p className="read-menu">
                    <span onClick={() => {
                        this.props.onReadChange(this.readMenuBack());
                    }}>&lt;</span>
                    <span>{this.props.read}</span>
                    <span onClick={() => {
                        this.props.onReadChange(this.readMenuForward());
                    }}>&gt;</span>
                </p>
            </aside>
        )
    }

}

export default connect(
    state => ({
        read: state.readValue,
        sort: state.sortValue
    }),
    dispatch => ({
        onSearchChange: (searchValue) => {
            dispatch({type: 'CHANGE_SEARCH_VALUE', payload: searchValue})
        },
        onPaginationChange: (paginationValue) => {
            if (paginationValue < 1) {
                return;
            }
            dispatch({type: 'CHANGE_PAGINATION_VALUE', payload: paginationValue})
        },
        onReadChange: (readValue) => {
            dispatch({type: 'CHANGE_READ_VALUE', payload: readValue})
        },
        onSortPropertyChange: (sortValue) => {
            dispatch({type: 'CHANGE_SORT_PROPERTY_VALUE', payload: sortValue})
        },
        onSortChange: (sortValue) => {
            dispatch({type: 'CHANGE_SORT_VALUE', payload: sortValue})
        }
    })
)(SideMenu);


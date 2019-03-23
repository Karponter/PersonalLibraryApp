import React, {Component} from 'react';
import './style.css';

class Pagination extends Component {
    render() {
        return (
            <ul>
                <li>Pages:</li>
                {this.showAvailablePages()}
            </ul>
        );
    }

    showAvailablePages() {
        const pagesCount = Math.trunc((this.props.libSize + 1) / this.props.pagination) + 1;
        return (
            [...Array(pagesCount)]
                .map((e, i) => {
                    return (<li onClick={() => {
                        this.props.setPage(i)
                    }} key={i}>{i}</li>)
                })
        );
    }
}

export default Pagination;
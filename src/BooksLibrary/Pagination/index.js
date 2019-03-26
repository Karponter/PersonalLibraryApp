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
        let pagesCount = Math.trunc((this.props.libSize + 1) / this.props.pagination);
        if ((this.props.libSize + 1) % this.props.pagination > 0) {
            pagesCount++;
        }
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
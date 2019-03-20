import React, {Component} from 'react';
import './style.css'

export default class SideMenu extends Component {

    render() {
        return (
            <aside>
                <p>
                    <label htmlFor="title">Search</label>
                    <input type="text" placeholder="e.g.: Alice in wonderland" id="title"/>
                </p>
                <p>
                    <label htmlFor="sort">Sort By</label>
                    <input type="text" placeholder="Select criteria" id="sort"/>
                </p>
                <p>
                    <label htmlFor="paginate">Paginate By</label>
                    <input type="text" placeholder="Select amount" id="paginate"/>
                </p>
            </aside>
        )
    }

}
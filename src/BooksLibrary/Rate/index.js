import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './style.css'

export default class Rate extends Component {

    render() {
        return (
            <div className='book__rate'>
                {[...Array(Math.trunc(this.props.rate / 20))].map((el, i) => <FontAwesomeIcon key={i}
                                                                                              icon={['fas', 'star']}/>)}
                {[...Array(5 - Math.trunc(this.props.rate / 20))].map((el, i) => <FontAwesomeIcon key={i}
                                                                                                  icon={['far', 'star']}/>)}
            </div>
        );
    }
}

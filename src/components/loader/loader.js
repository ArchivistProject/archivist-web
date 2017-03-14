import React, { PropTypes, Component } from 'react';
import loadingGif from '~/src/assets/images/loading.gif';
import './loader.scss';

export default class Loader extends Component {

    render() {
        return (
            <div className='loader'><img className='loader-gif' src={loadingGif} alt='loading' /></div>
        );
    }
}

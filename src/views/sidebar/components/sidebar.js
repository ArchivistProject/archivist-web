import React, { PropTypes, Component } from 'react';
import './sidebar.scss';

export default class Sidebar extends Component {

    static propTypes = {
        someAction: PropTypes.func.isRequired,
    };

    render() {
        return (
            <div className='sidebar'>
                Sidebar
            </div>
        );
    }
}

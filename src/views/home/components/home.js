import React, { PropTypes, Component } from 'react';
import { ItemGrid, Sidebar } from '~/src/views';
import homeActionCreators from '~/src/state/home/home-action-creators';
import './home.scss';

export default class Home extends Component {

    static propTypes = {
    };

    render() {
        return (
            <div className='home'>
                <div className='home-content'>
                    <ItemGrid />
                    <Sidebar />
                </div>
            </div>
        );
    }
}

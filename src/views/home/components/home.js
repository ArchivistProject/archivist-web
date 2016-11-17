import React, { PropTypes, Component } from 'react';
import { ActionBar, ItemGrid, Sidebar } from '~/src/views';
import './home.scss';

export default class Home extends Component {

    static propTypes = {
        sidebarVisible: PropTypes.bool,
    };

    render() {
        const { sidebarVisible } = this.props;
        return (
            <div className='home'>
                <ActionBar />
                <div className='home-content'>
                    <ItemGrid />
                    { sidebarVisible ? <Sidebar /> : <div /> }
                </div>
            </div>
        );
    }
}

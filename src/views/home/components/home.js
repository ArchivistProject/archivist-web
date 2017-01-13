import React, { PropTypes, Component } from 'react';
import { ActionBar, ItemGrid, Sidebar } from '~/src/views';
import homeActionCreators from '~/src/state/home/home-action-creators';
import './home.scss';

export default class Home extends Component {

    static propTypes = {
        homePageLoaded: PropTypes.func.isRequired,
    };

    componentDidMount() {
        const { homePageLoaded } = this.props;
        homePageLoaded();
    }

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

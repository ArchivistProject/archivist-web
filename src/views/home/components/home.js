import React, { PropTypes, Component } from 'react';
import { ActionBar, ItemGrid, Sidebar } from '~/src/views';
import homeActionCreators from '~/src/state/home/home-action-creators';
import './home.scss';

export default class Home extends Component {

    static propTypes = {
        sidebarVisible: PropTypes.bool.isRequired,
        homePageLoaded: PropTypes.func.isRequired,
        activeItemId: PropTypes.number,
        activeItem: PropTypes.object,
    };

    componentDidMount() {
        const { homePageLoaded } = this.props;
        homePageLoaded();
    }

    render() {
        const { sidebarVisible, activeItemId, activeItem } = this.props;
        return (
            <div className='home'>
                <ActionBar searchVisible={true} />
                <div className='home-content'>
                    <ItemGrid />
                    { sidebarVisible ? <Sidebar /> : null }
                </div>
            </div>
        );
    }
}

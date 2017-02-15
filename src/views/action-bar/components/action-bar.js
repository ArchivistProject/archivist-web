import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import {Button} from 'react-bootstrap/lib/';
import './action-bar.scss';

export default class ActionBar extends Component {

    static propTypes = {
        loggedIn: PropTypes.bool,
        backVisible: PropTypes.bool.isRequired,
        uploadVisible: PropTypes.bool.isRequired,
        searchVisible: PropTypes.bool.isRequired,
        settingsVisible: PropTypes.bool.isRequired,
        updateVisibilities: PropTypes.func.isRequired,
        pathname: PropTypes.string.isRequired,
    };

    componentDidMount() {
        const { updateVisibilities, pathname } = this.props;
        updateVisibilities(pathname);
    }

    componentWillReceiveProps(nextProps) {
        const { updateVisibilities, pathname } = this.props;
        const { pathname: newPathname } = nextProps;

        if (pathname !== newPathname) {
            updateVisibilities(newPathname);
        }
    }

    render() {
        const { loggedIn, backVisible, uploadVisible, searchVisible, settingsVisible } = this.props;

        return (
            <div className='action-bar-wrapper'>
                { !loggedIn ?
                    <div className='action-bar'>
                        <div className='action-bar-back'>
                            { backVisible ? <Link to='/'><Button className='action-bar-back-button'>Back</Button></Link> : null }
                        </div>
                        <div className='action-bar-search'>
                            { searchVisible ?
                                (
                                    <div>
                                        <input type='search' className='action-bar-search-input' />
                                        <Button className='action-bar-search-button'>Search</Button>
                                        <a href='#advanced'>Advanced</a>
                                    </div>
                                ) : null
                            }
                        </div>
                        <div className='action-bar-right-buttons'>
                            {uploadVisible ? <Link to='/upload'><Button className='action-bar-upload'>Upload</Button></Link> : null }
                            {settingsVisible ? <Link to='/settings'> <Button className='action-bar-settings'>Settings</Button></Link> : null }
                            <Button bsStyle="danger" className='action-bar-logout'>Log Out</Button>
                        </div>
                    </div>
                : null}
            </div>
        );
    }
}

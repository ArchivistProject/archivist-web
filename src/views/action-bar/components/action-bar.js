import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import {Button} from 'react-bootstrap/lib/';
import './action-bar.scss';

export default class ActionBar extends Component {

    static propTypes = {
        loggedIn: PropTypes.bool,
        backVisible: PropTypes.bool,
        uploadVisible: PropTypes.bool,
        searchVisible: PropTypes.bool,
        settingsVisible: PropTypes.bool,
    };

    render() {
        const { loggedIn, backVisible, uploadVisible = true, searchVisible, settingsVisible = true } = this.props;
        return (
            <div className='action-bar-wrapper'>
                { !loggedIn ?
                    <div className='action-bar'>
                        { backVisible ? <Link to='/'><Button className='action-bar-back-button'>Back</Button></Link> : <div /> }
                        { searchVisible ? 
                            (
                                <div className='action-bar-search'>
                                    <input type='search' className='action-bar-search-input' />
                                    <Button className='action-bar-search-button'>Search</Button>
                                    <a href='#advanced'>Advanced</a>
                                </div>
                            ) : <div />
                        }
                        <div className='action-bar-right-buttons'>
                            {uploadVisible ? <Link to='/upload'><Button className='action-bar-upload'>Upload</Button></Link> : null }
                            {settingsVisible ? <Link to='/settings'><Button className='action-bar-settings'>Settings</Button></Link> : null}
                            <Button bsStyle="danger" className='action-bar-logout'>Log Out</Button>
                        </div>
                    </div>
                : null}
            </div>
        );
    }
}

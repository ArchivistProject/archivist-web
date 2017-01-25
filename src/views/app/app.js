import React, { Component, PropTypes } from 'react';
import { ActionBar } from '~/src/views';

export default class App extends Component {

    static propTypes = {
        children: PropTypes.node.isRequired,
    };

    render() {
        const { children } = this.props;
        return (
            <div id='app'>
                <ActionBar />
                <div>{children}</div>
            </div>
        );
    }
}

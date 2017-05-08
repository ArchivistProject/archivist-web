import React, { PropTypes, Component } from 'react';
import './tooltip.scss';

export default class Tooltip extends Component {

    static MESSAGES = {
        tagEntry: 'Press the enter key to submit the tag.',
    };

    static propTypes = {
        message: PropTypes.string,
    };

    render() {
        const { message } = this.props;

        return (
            <div className='tooltip2'>
                <div className='questionmark'>?</div>
                <span className='tooltiptext'>{message}</span>
            </div>
        );
    }
}

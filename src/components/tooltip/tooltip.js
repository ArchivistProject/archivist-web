import React, { PropTypes, Component } from 'react';
import './tooltip.scss';

export default class Tooltip extends Component {

    static DIRECTION = {
        top: 'top',
        bottom: 'bottom',
        left: 'left',
        right: 'right',
    };

    static MESSAGES = {
        tagEntry: 'Press the enter key to submit the tag.',
        dateAdded: 'Date Added',
    };

    static propTypes = {
        direction: PropTypes.string,
        message: PropTypes.string,
    };

    static defaultProps = {
        direction: 'top',
    };

    render() {
        const { message, direction } = this.props;

        return (
            <div className='tooltip2'>
                <div className='questionmark'>?</div>
                <span className={`tooltiptext ${direction}`}>{message}</span>
            </div>
        );
    }
}

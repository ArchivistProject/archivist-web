import React, { PropTypes, Component } from 'react';
import './annotation.scss';

export default class Annotation extends Component {

    static propTypes = {
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        highlightedText: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { x, y, highlightedText } = this.props;
        const style = {
            top: y,
            left: x,
        };

        return (
            <div className='annotation' style={style}>
                {highlightedText}
            </div>
        );
    }
}

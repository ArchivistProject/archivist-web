import React, { PropTypes, Component } from 'react';
import './checkbox.scss';

export default class Checkbox extends Component {

    static propTypes = {
        checked: PropTypes.bool.isRequired,
        onClick: PropTypes.func.isRequired,
        label: PropTypes.string,
    };

    handleClicked = () => {
        const { onClick } = this.props;
        onClick();
    }

    render() {
        const { checked, label } = this.props;
        return (
            <div className='simple-checkbox'>
                <input type='checkbox' checked={checked} onClick={this.handleClicked} />
                <label htmlFor='checkbox'>{label}</label>
            </div>
        );
    }
}

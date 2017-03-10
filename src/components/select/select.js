import React, { PropTypes, Component } from 'react';
// import './select.scss';

export default class Select extends Component {

    static propTypes = {
        value: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        options: PropTypes.array,
    };

    handleValueChange = () => {
        const { onChange } = this.props;
        onChange();
    }

    render() {
        const { value, options } = this.props;
        return (
            <select className='and-or-select' value={value} onChange={this.handleValueChange}>
                {options.map((option, key) => <option value={option} key={key}>{option}</option>)}
            </select>
        );
    }
}

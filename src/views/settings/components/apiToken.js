import React, { PropTypes, Component } from 'react';

export default class APIToken extends Component {

    static propTypes = {
        token: PropTypes.string,
        refreshAPI: PropTypes.func.isRequired,
    };

    refresh = () => {
        const { refreshAPI } = this.props;
        refreshAPI();
    };

    render() {
        const { token } = this.props;
        return (
            <div>
                <p className='settings-label'>API Token</p>
                <textarea
                    placeholder='no API available'
                    readOnly
                >
                    {token}
                </textarea>
                <div>
                    <button className='settings-btn' onClick={this.refresh}>Refresh</button>
                </div>
                <br />
            </div>
        );
    }

}

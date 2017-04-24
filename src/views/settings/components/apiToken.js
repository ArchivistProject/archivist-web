import React, { PropTypes, Component } from 'react';
import { Button } from 'react-bootstrap/lib/';

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
                    <Button onClick={this.refresh}>Refresh</Button>
                </div>
                <br />
            </div>
        );
    }

}

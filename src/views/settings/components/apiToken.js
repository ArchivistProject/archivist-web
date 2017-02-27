import React, { PropTypes, Component } from 'react';
import { Button, FormControl,
} from 'react-bootstrap/lib/';

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
                <FormControl
                    componentClass='textarea'
                    placeholder='no API available'
                    readOnly
                >
                    {token}
                </FormControl>
                <Button bsStyle='info' onClick={this.refresh}>Refresh</Button>
            </div>
        );
    }

}

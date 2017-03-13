import React, { PropTypes, Component } from 'react';
import { Button, FormControl,
} from 'react-bootstrap/lib/';

export default class APIToken extends Component {

    static propTypes = {
        apiToken: PropTypes.string,
        fetchAPIToken: PropTypes.func.isRequired,
    };

    refresh = () => {
        const { fetchAPIToken } = this.props;
        fetchAPIToken(true);
    };

    componentDidMount() {
        const { fetchAPIToken } = this.props;
        fetchAPIToken(false);
    };

    render() {
        const { apiToken } = this.props;
        return (
            <div>
                <FormControl
                    componentClass='textarea'
                    readOnly
                    value={apiToken}
                >
                </FormControl>
                <Button bsStyle='info' onClick={this.refresh}>Refresh</Button>
            </div>
        );
    }

}

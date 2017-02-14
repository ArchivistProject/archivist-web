/**
 * Created by Dung Mai on 2/1/2017.
 */
import React, {PropTypes, Component} from 'react';
import {Button, FormControl, Panel, FormGroup, Col, Form
} from 'react-bootstrap/lib/';

export default class APIToken extends Component {

    static propTypes = {
        token: PropTypes.string,
        refreshAPI: PropTypes.func.isRequired,
    };

    refresh = () =>{
        const {refreshAPI} = this.props;
        refreshAPI();
    };

    render(){
        const {token} = this.props;
        return (
            <div>
                <FormControl componentClass="textarea" placeholder="no API available"
                             readonly>{token}</FormControl>
                <br/>
                <Button bsStyle="info" onClick={this.refresh}>Refresh</Button>
            </div>
        );
    }

}
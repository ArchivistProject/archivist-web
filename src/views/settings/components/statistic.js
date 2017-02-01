/**
 * Created by Dung Mai on 2/1/2017.
 */
import React, {PropTypes, Component} from 'react';
import {
    Button, FormControl
} from 'react-bootstrap/lib/';

export default class Statistic extends Component {

    static propTypes = {
        storage: PropTypes.number,
        fileCount: PropTypes.number,
        fetchFileStorage: PropTypes.func.isRequired,
    };

    componentDidMount() {
        const {fetchFileStorage} = this.props;
        fetchFileStorage();
    }


    render() {
        const {storage, fileCount} = this.props;
        console.log("Files count: " + fileCount);
        return (

            <div>
                <p>Uploaded Files: {fileCount}</p>
                <p>Storage Size: {storage}</p>
            </div>

        )
    }
}
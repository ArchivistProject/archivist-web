import React, { PropTypes, Component } from 'react';
import {
    Modal, Button, FormControl, Collapse, Well, Jumbotron, Panel, FormGroup,
    Col, Form, ControlLabel, MenuItem, Row
} from 'react-bootstrap/lib/';
import './upload.scss';

export default class Upload extends Component {

    static propTypes = {
        updateUploadFile: PropTypes.func.isRequired,
        submitFile: PropTypes.func.isRequired,
    };

    handleFileChange = (file) => {
        const { updateUploadFile } = this.props;
        updateUploadFile(file);
    }

    handleSubmit = () => {
        const { submitFile } = this.props;
        submitFile();
    }

    renderMetadataInput(fields) {
        return fields.map((field, id) =>
            (
                <div className='upload-metadata-input' key={id}>
                    <span className='upload-label'>{field.label}</span>
                    <FormControl type={field.type} />
                </div>
            )
        );


/* put this somewhere if you want to generate these
        {this.renderMetadataInput([
            {
                label: 'Title',
                type: 'text',
            },
            {
                label: 'Author',
                type: 'text',
            },
            {
                label: 'Date Published',
                type: 'date',
            },
        ])}
        */
    }

    render() {
        return (
            <div className='upload'>
                <h2 className="uploadTitle">Upload New File</h2>
                <div className='upload-content'>
                    <div className='upload-file-upload'>
                        <span className='upload-label'>Choose A File*</span>
                        <br/>
                        <input type='file' accept='.pdf, .html' onChange={this.handleFileChange}/>
                    </div>
                    <Row>
                    <Col sm={5}>
                        <ControlLabel>Title*</ControlLabel>
                        <FormControl type="text"></FormControl>
                    </Col>
                    <Col sm={7}>
                        <ControlLabel>Item Type*</ControlLabel>
                        <FormGroup controlId="formControlsSelect">
                            <FormControl componentClass="select" placeholder="select field type">
                                <option value="other" onSelect={this.renderMetadataInput([
                                    {
                                        label: 'Title',
                                        type: 'text',
                                    },
                                    {
                                        label: 'Author',
                                        type: 'text',
                                    },
                                    {
                                        label: 'Date Published',
                                        type: 'date',
                                    },
                                ])}>Website</option>
                                <option value="other">Magazine</option>
                            </FormControl>
                        </FormGroup>
                    </Col>
                    </Row>
                    <Button onClick={this.handleSubmit}>Upload</Button>
                </div>
            </div>
        );
    }
}

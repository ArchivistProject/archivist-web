import React, {PropTypes, Component} from 'react';
import {
    Modal, Button, FormControl, Collapse, Well, Jumbotron, Panel, FormGroup,
    Col, Form, ControlLabel, MenuItem, Row
} from 'react-bootstrap/lib/';
import TagsInput from 'react-tagsinput';
import './upload.scss';


export default class Upload extends Component {

    static propTypes = {
        updateUploadFile: PropTypes.func.isRequired,
        submitFile: PropTypes.func.isRequired,
    };

    handleFileChange = (file) => {
        const {updateUploadFile} = this.props;
        updateUploadFile(file);
    }

    handleSubmit = () => {
        const {submitFile} = this.props;
        submitFile();
    }

    renderMetadataInput(fields) {
        return fields.map((field, id) =>
            (
                <div className='upload-metadata-input' key={id}>
                    <span className='upload-label'>{field.label}</span>
                    <FormControl type={field.type}/>
                </div>
            )
        );
    }

    handleFileChange = (file) => {
        const { updateUploadFile } = this.props;
        updateUploadFile(file);
    }

    handleSubmit = () => {
        const { submitFile } = this.props;
        submitFile();
    }

    render() {
        return (
            <div className="upload-content">
                <div>
                    <h2 className="upload-title">Upload New File</h2>
                    <div>
                        <div className='upload-file-upload'>
                            <ControlLabel>Choose A File*</ControlLabel>
                            <br/>
                            <input type='file' accept='.pdf, .html' onChange={this.handleFileChange}/>
                        </div>
                        <Row>
                            <Col sm={5}>
                                <ControlLabel>Title*</ControlLabel>
                                <FormControl type="text"></FormControl>
                            </Col>
                            <Col sm={7}>
                                <ControlLabel>Author*</ControlLabel>
                                <FormControl type="text"></FormControl>
                            </Col>
                            <Col sm={12}>
                                <ControlLabel>Item Type*</ControlLabel>
                                <FormGroup controlId="formControlsSelect">
                                    <FormControl componentClass="select" placeholder="select field type">
                                        <option value="other">Website</option>
                                        <option value="other">Magazine</option>
                                    </FormControl>
                                </FormGroup>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div>
                    <ControlLabel>Tags:</ControlLabel>
                    <TagBox/>
                    <br/>
                    <br/>
                    <Button onClick={this.handleSubmit}>Upload</Button>
                </div>
            </div>
        );
    }
}

//Create the tag box
const TagBox = React.createClass({

    getInitialState(){
        return {tags: []}
    },

    handleChange(value){
        this.setState({tags: value});

        for (let i = 0; i <= this.state.tags.length; i++)
            console.log(this.state.tags[i]);

    },

    render(){
        return (
            <div>
                <TagsInput value={this.state.tags} onChange={this.handleChange}/>
            </div>
        );
    }
})
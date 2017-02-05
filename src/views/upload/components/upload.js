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
        fetchItemTypes: PropTypes.func.isRequired,
        items: PropTypes.arrayOf(Object),
    };

    componentWillMount() {
        const { fetchItemTypes } = this.props;
        fetchItemTypes();
    }

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
        const {updateUploadFile} = this.props;
        updateUploadFile(file);
    }

    handleSubmit = () => {
        const {submitFile} = this.props;
        submitFile();
    }

    handleOnItemSelect(item) {
       const {items} = this.props;

        let itemID = item.target.value;
        console.log("selected: " + itemID);

        let temp = items.groups.filter(x => x.id === itemID)[0].fields.map(obj => obj.name);

        for (let i = 0; i < temp.length; i++)
            console.log(temp[i]);
    }

    render() {
        const {items} = this.props;

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

                        <Col sm={5}>
                            <ControlLabel>Title*</ControlLabel>
                            <FormControl type="text"/>
                        </Col>
                        <Col sm={7}>
                            <ControlLabel>Author*</ControlLabel>
                            <FormControl type="text"/>
                        </Col>
                        <Col sm={12}>
                            <ControlLabel>Item Type*</ControlLabel>
                            <FormGroup controlId="formControlsSelect">
                                <FormControl componentClass="select" onChange={this.handleOnItemSelect}>
                                    {items.groups.map((op) =>
                                        <option value={op.id}>{op.name}</option>
                                    )}
                                </FormControl>
                            </FormGroup>
                        </Col>




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
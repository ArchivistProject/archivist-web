import React, {PropTypes, Component} from 'react';
import {
    Modal, Button, FormControl, Collapse, Well, Jumbotron, Panel, FormGroup,
    Col, Form, ControlLabel, MenuItem, Row
} from 'react-bootstrap/lib/';
import TagsInput from 'react-tagsinput';
import './upload.scss';


export default class Upload extends Component {

    static propTypes = {
        groups: PropTypes.arrayOf(Object),
        updateUploadFile: PropTypes.func.isRequired,
        submitFile: PropTypes.func.isRequired,
        fetchItemTypes: PropTypes.func.isRequired,
        setActiveItem: PropTypes.func.isRequired,
        fieldVisible: PropTypes.boolean,
        activeItem: PropTypes.string,
    };

    componentWillMount() {
        const {fetchItemTypes} = this.props;
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

    handleOnItemSelect = (item) => {
        const {setActiveItem} = this.props;
        let itemID = item.target.value;
        setActiveItem(itemID);

    }

    render() {
        const {groups, fieldVisible, activeItem} = this.props;

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
                                <FormControl componentClass="select" placeHolder="Select item type"
                                             onChange={this.handleOnItemSelect}>
                                    {groups.map((op) =>
                                        <option value={op.id}>{op.name}</option>
                                    )}
                                </FormControl>
                            </FormGroup>
                        </Col>
                        <br/>
                        {fieldVisible ?
                            <div>
                                <ControlLabel>Meta Data:</ControlLabel>
                                {groups.filter(x => x.id === activeItem)[0].fields.map(obj =>
                                    <div>
                                        <Col sm={4}>
                                            <ControlLabel>{obj.name}</ControlLabel>
                                            <FormControl type="text"/>
                                        </Col>
                                    </div>
                                )
                                }
                            </div> : null
                        }
                    </div>
                </div>
                <div>
                    <br/>
                    <Col sm={12}>
                        <ControlLabel>Tags:</ControlLabel>
                        <TagBox/>
                        <br/>
                        <br/>
                        <Button onClick={this.handleSubmit}>Upload</Button>
                    </Col>
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
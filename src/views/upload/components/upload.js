import React, { PropTypes, Component } from 'react';
import Tooltip from '~/src/components/tooltip/tooltip';
import TagsInput from 'react-tagsinput';
import moment from 'moment';
import './upload.scss';


export default class Upload extends Component {

    static propTypes = {
        groups: PropTypes.arrayOf(Object),
        updateUploadFile: PropTypes.func.isRequired,
        submitFile: PropTypes.func.isRequired,
        fetchItemTypes: PropTypes.func.isRequired,
        setAllItemID: PropTypes.func.isRequired,
        tags: PropTypes.arrayOf(String),
        file: PropTypes.object.isRequired,
        handleTagsChange: PropTypes.func.isRequired,
        allItemID: PropTypes.arrayOf(String),
        filePicked: PropTypes.bool,
        setFilePicked: PropTypes.func.isRequired,
        resetFile: PropTypes.func.isRequired,
        setCheckBox: PropTypes.func.isRequired,
        setAllCheckBoxes: PropTypes.func.isRequired,
        setFileName: PropTypes.func.isRequired,
        fileName: PropTypes.string,
        description: PropTypes.string,
        // holds all values from meta data text fields
        allMetaDataValue: PropTypes.arrayOf(Object),
        setAllMetaData: PropTypes.func.isRequired,
        setDescription: PropTypes.func.isRequired,
        errorNotification: PropTypes.func.isRequired,
    };

    componentWillMount() {
        const { fetchItemTypes } = this.props;
        fetchItemTypes();
        this.resetInputFields();
    }

    resetInputFields = () => {
        const { setAllItemID, allItemID, setAllMetaData, handleTagsChange, resetFile, setFilePicked, setFileName, setDescription } = this.props;
        setAllMetaData([]);
        // keep Generic but remove others category ID
        const array = allItemID;
        array.splice(1);
        setAllItemID(array);
        handleTagsChange([]);
        setFilePicked(false);
        resetFile();
        setFileName('Choose a file...');
        setDescription('');
    }

    handleSubmit = () => {
        const { submitFile, tags, allMetaDataValue, filePicked, setAllCheckBoxes, groups, description, file, errorNotification } = this.props;
        // get meta data array and add today's date to it since user can't modify it
        let metaDataArray;
        if (allMetaDataValue !== undefined) {
            metaDataArray = allMetaDataValue.slice();
        } else {
            metaDataArray = [];
        }
        const todayDate = moment().format('MM/DD/YYYY');
        const object = {
            name: 'Date Added',
            type: 'date',
            data: todayDate,
            group: 'Generic',
        };
        metaDataArray = metaDataArray.concat(object);
        if (filePicked === false) {
            errorNotification('Please select a file to upload');
        } else {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                const base64File = e.target.result;
                submitFile(base64File, tags, metaDataArray, description);
            };

            // reset the page after done uploading
            this.resetInputFields();
            const array = groups;
            if (array) {
                for (let i = 0; i < array.length; i += 1) {
                    array[i].checkbox = false;
                }
                setAllCheckBoxes(array);
            }
        }
    }

    handleFileChange = () => {
        const { updateUploadFile, setFileName } = this.props;
        const file = this.fileUpload.files[0];
        setFileName(file.name);
        updateUploadFile(file);
    }
    handleOnItemSelect = (obj) => {
        const { groups, allItemID, setAllItemID, setAllMetaData, allMetaDataValue, setCheckBox } = this.props;
        const itemID = obj.target.id;
        const checked = obj.target.checked;

        let array = allItemID.slice();
        const theGroups = groups;
        for (let i = 0; i < theGroups.length; i += 1) {
            if (theGroups[i].id === itemID) {
                theGroups[i].checkbox = checked;
                break;
            }
        }
        setCheckBox(theGroups);

        // if checked then add to array
        if (checked === true) {
            array = array.concat(itemID);
            // set the state to the new array
            setAllItemID(array);
        } else {
            // if unchecked then remove from array
            let index;
            // find the index
            for (let i = 0; i < array.length; i += 1) {
                if (array[i] === itemID) {
                    index = i;
                    break;
                }
            }
            // remove element so the meta data fields don't show
            array.splice(index, 1);
            // set the state to the new array
            setAllItemID(array);
            // look for the group name
            let name = null;
            const metaDataArray = allMetaDataValue.slice();
            for (let i = 0; i < groups.length; i += 1) {
                if (groups[i].id === itemID) {
                    name = groups[i].name;
                    break;
                }
            }
            // remove meta data fields from meta data array if user uncheck a category using the group name
            index = metaDataArray.length;
            while (index > 0) {
                index -= 1;
                if (metaDataArray[index].group === name) {
                    metaDataArray.splice(index, 1);
                }
            }
            setAllMetaData(metaDataArray);
        }
    }

    handleTagChange = (tag) => {
        const { handleTagsChange } = this.props;
        handleTagsChange(tag);
    }

    handleMetaDataTextChange = (obj) => {
        const { groups, allMetaDataValue, setAllMetaData } = this.props;
        const theData = obj.target.value;
        const theType = obj.target.getAttribute('data-type');
        const theName = obj.target.name;
        const id = obj.target.id;
        let theGroup = null;

        // only add what user type to the array if there's actually value and not just blank
        // use the id to find the group name
        for (let i = 0; i < groups.length; i += 1) {
            if (groups[i].id === id) {
                theGroup = groups[i].name;
                break;
            }
        }

        const object = {
            name: theName,
            type: theType,
            data: theData,
            group: theGroup,
        };

        let array = allMetaDataValue.slice();
        // check if item already exist in the array in case user went back and change the value in the text box
        for (let i = 0; i < array.length; i += 1) {
            if (array[i].name === theName) {
                // if found then remove the old one
                array.splice(i, 1);
            }
        }
        array = array.concat(object);
        setAllMetaData(array);
    }

    handleDescriptionChange = (obj) => {
        const { setDescription } = this.props;
        const value = obj.target.value;
        console.log(value);
        setDescription(value);
    }

    renderMetadataRows(group) {
        const { allItemID } = this.props;
        const idKey = allItemID.indexOf(group.id);
        if (idKey < 0) { return undefined; }

        return (
            <div key={idKey}>
                {group.fields.map((field, fieldKey) =>
                    <div className='metadata-fields' htmlFor={group.id} key={fieldKey}>
                        {field.name === 'Date Added' ?
                            <div>
                                <input className='input-text' type='text' value={moment().format('MM/DD/YYYY')} disabled />
                                <Tooltip message={Tooltip.MESSAGES.dateAdded} />
                            </div> :
                            <input
                                className='input-text' name={field.name} id={group.id} data-type={field.type}
                                onBlur={this.handleMetaDataTextChange} type='text'
                                placeholder={field.name}
                            />
                        }
                    </div>
                )}
            </div>
        );
    }

    render() {
        const { groups, tags, allItemID, fileName, description } = this.props;
        return (
            <div className='upload'>
                <p className='title'>Upload New File</p>
                <div className='left-half'>
                    <div className='upload-file-content'>
                        <input
                            type='file' id='file-5' accept='.pdf, .html' className='inputfile inputfile-4'
                            ref={(ref) => {
                                this.fileUpload = ref;
                            }} onChange={this.handleFileChange}
                        />
                        <label htmlFor='file-5'>
                            <figure>
                                <svg xmlns='http://www.w3.org/2000/svg' width='20' height='17' viewBox='0 0 20 17'>
                                    <path d='M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z' />
                                </svg>
                            </figure>
                            <span>{fileName}</span></label>
                    </div>

                </div>
                <div className='right-half'>
                    <h4>Information about the file can be entered below:</h4>
                    <div className='container'>
                        {groups.map((object, key) =>
                            <div>
                                <div>
                                    {object.name !== 'Generic' ?
                                        <input
                                            className='metadata-group-select'
                                            type='checkbox'
                                            checked={object.checkbox}
                                            id={object.id}
                                            onChange={this.handleOnItemSelect}
                                        />
                                    : null}
                                    <p className='upload-label'>{object.name}</p>
                                </div>
                                {this.renderMetadataRows(object)}
                            </div>
                        )}
                        <p className='upload-label'>Tags</p>
                        <Tooltip message={Tooltip.MESSAGES.tagEntry} />
                        <TagsInput value={tags} onChange={this.handleTagChange} />
                        <div>
                            <p className='upload-label'>Description</p>
                            <textarea
                                value={description} type='text' placeholder='Add a description'
                                onChange={this.handleDescriptionChange}
                            />
                        </div>
                        <br />
                    </div>
                    <div className='upload-submit'>
                        <button type='submit' onClick={this.handleSubmit}>Upload</button>
                    </div>
                </div>
            </div>
        );
    }
}

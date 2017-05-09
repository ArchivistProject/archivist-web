import React, { PropTypes, Component } from 'react';

export default class Statistic extends Component {

    static propTypes = {
        storage: PropTypes.number,
        fileCount: PropTypes.number,
        fetchFileStorage: PropTypes.func.isRequired,
    };

    componentDidMount() {
        const { fetchFileStorage } = this.props;
        fetchFileStorage();
    }

    getHumanReadableStorage() {
        const storageInBytes = this.props.storage;

        const storageInMB = (storageInBytes / 1000000); // 1 million bytes in a MB

        if (storageInMB > 500) { // More than 500 MB, lets show storage in GB then
            const roundedStorageInGB = Number(storageInMB / 1000).toFixed(2);
            return `${roundedStorageInGB} GB`; // 1000 MB in GB
        }

        const roundedStorageMB = Number(storageInMB).toFixed(2);
        return `${roundedStorageMB} MB`;
    }

    render() {
        const { fileCount } = this.props;

        const humanReadableStorage = this.getHumanReadableStorage();

        return (

            <div>
                <p className='settings-label'>Usage</p>
                <p><b>{fileCount} files</b> in Archivist</p>
                <p><b>{humanReadableStorage}</b> of disk space used for files</p>
                <br />
            </div>

        );
    }
}

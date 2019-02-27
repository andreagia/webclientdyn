import React, {Component} from 'react';
import axios from 'axios';

class ImportFromFileBodyComponent extends Component {

    handleUploadFile = (event) => {
        const data = new FormData();
        data.append('file', event.target.files[0]);
        data.append('name', 'some value user types');
        data.append('description', 'some value user types');
        // '/files' is your node.js route that triggers our middleware
        axios.post('/files', data).then((response) => {
            console.log("AXIOS-> ",response); // do something with the response
            this.props.onUpdate(response);
        });
    };
        render() {
            <div>
                <input type="file" onChange={this.handleUploadFile} />
            </div>
        }

    // state = {
    //     file: null
    // };
    // fileReader = null;
    //
    // handleFileRead = (e) =>{
    //     const content = this.fileReader.result;
    //   //  console.log(content);
    //     this.props.onUpdate(content);
    //     this.setState({file: content});
    // };
    //
    // handleFileChose = (file) =>{
    //     console.log("<------- FILE -------->")
    //     console.log(typeof file);
    //     console.log(file);
    //     this.fileReader = new FileReader();
    //     this.fileReader.onloadend = this.handleFileRead;
    //     this.fileReader.readAsText(file);
    // };
    // render() {
    //     return (
    //         <div>
    //             <input type='file'
    //                    id='file'
    //                    value=''
    //                    className='input-file'
    //                    onChange={e => this.handleFileChose(e.target.files[0])}
    //             />
    //         </div>
    //     )
    // }
}

export default ImportFromFileBodyComponent;
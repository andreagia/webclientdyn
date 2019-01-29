import React, {Component} from 'react';

class ImportFromFileBodyComponent extends Component {
    fileReader = '';

    state = {
        file: null

    };

    handleFileRead = (e) =>{
        const content = this.fileReader.result;
      //  console.log(content);
        this.props.onUpdate(content);
        this.setState({file: content});
    };

    handleFileChose = (file) =>{
        this.fileReader = new FileReader();
        this.fileReader.onloadend = this.handleFileRead;
        this.fileReader.readAsText(file);
    };
    render() {
        return (
            <div>
                <input type='file'
                       id='file'
                       value=''
                       className='input-file'
                       onChange={e => this.handleFileChose(e.target.files[0])}
                />
            </div>
        )
    }
}

export default ImportFromFileBodyComponent;
import React, {Component} from 'react';
import './App.css';
import Ngltag from './pdb/Ngltag';
import ImportFromFileBodyComponent from './pdb/ImportFromFileBodyComponent';
import VirtualFolder from './pdb/VirtualFolder';
import RichFMPick from './pdb/RichFMPick';

class App extends Component {
    state = {
            file: null
        };



    onUpdate = (val) => {
        this.setState({
            file: val
        })
    };

    render() {
        let listpdb = '';
        let passo = "PIPPOPIPPO";
        //console.log("FILE ->>");
       // console.log(this.state.file);
        if(this.state.file){
            passo="PLUTOPLUTO";
            listpdb = (
            <div>
                {this.state.file}
            </div>
            );
        }
        return (
            <div className="App">
                <ImportFromFileBodyComponent onUpdate={this.onUpdate} />
                <Ngltag  pdbfiletxt={this.state.file} passo={passo} />
                {/*<VirtualFolder/>*/}
                <RichFMPick/>
                {listpdb}
            </div>
        );
    }
}

export default App;

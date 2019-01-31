import React, { Component } from 'react';
import ImportFromFileBodyComponent from "../components/templates/ImportFromFileBodyComponent";
import Ngltag from '../components/templates/Ngltag';
//import VirtualFolder from '../controllers/VirtualFolder';
import RichFMPick from '../components/templates/RichFMPick';

class S2maintrial extends Component {
    state = {
        file: null
    };

    onUpdate = (val) => {
        this.setState({
            file: val
        })
    };

    onUpdaterf = (val) => {
        this.setState({
            file: val
        })
    };
    render() {
        let listpdb = '';
        //console.log("FILE ->>");
        // console.log(this.state.file);
        if(this.state.file){
            listpdb = (
                <div>
                    {this.state.file}
                </div>
            );
        }
        return (
            <div className="App">
                <ImportFromFileBodyComponent onUpdate={this.onUpdate} />
                <Ngltag  pdbfiletxt={this.state.file} />
                {/*<VirtualFolder/>*/}
                <RichFMPick onUpdate={this.onUpdaterf}/>
                {listpdb}
            </div>
        );
    }
}
export default S2maintrial;
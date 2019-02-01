import React, { Component } from 'react';
import FMPicktr from '../components/FMPicktr'
import FMPickpdb from '../components/FMPickpdb';
import Checkpdb from '../utils/pdb/Checkpdb'
import NGLview from "../components/NGLview";
import * as NGL from "ngl";

class S2main extends Component {
    state={
        trajectory: {
            filename: null
        },
        pdb: {
            filename: null,
            data: null,
            upadte: false
        },
        loading: false
    };

    onUpdatertr = (val) => {
        console.log(val);
        this.setState({trajectory:{filename: val},pdb:{update: false}});
    };

    onUpdaterpdb = (val) => {
        console.log(val);
        this.setState({pdb:{data: val.data, filename: val.filename, update: true}});
    };

    render(){

        let viewNGL = null;
        console.log(this.state.pdb.data);
        if(this.state.pdb.data && this.state.pdb.update){
            console.log(this.state.pdb.data.data);
            let pdbvec = Checkpdb(this.state.pdb.data.data);
            console.log(pdbvec);

            viewNGL =
                <div>
                    <NGLview  pdbfiletxt={pdbvec.pdbtex} />
                </div>;
        }
        return(
        <div>
            <h2>NMR ORDER PARAMETER ANALYSIS</h2>
            <FMPicktr  onUpdate={this.onUpdatertr} >Add File trajectory</FMPicktr>
            <h2>{this.state.trajectory.filename}</h2>
            <FMPickpdb onUpdate={this.onUpdaterpdb}>Add File PDB </FMPickpdb>
            <div id="viewport" style={{width:'400px', height:'400px'}}></div>
            {viewNGL}

        </div>
    );
    }
}
export default S2main;
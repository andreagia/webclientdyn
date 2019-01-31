import React, { Component } from 'react';
import FMPicktr from '../components/FMPicktr'
import FMPickpdb from '../components/FMPickpdb';

class S2main extends Component {
    state={
        trajectory: {
            filename: null

        },
        pdb: {
            filename: null,
            data: null
        },
        loading: false
    };

    onUpdatertr = (val) => {
        console.log(val);
        this.setState({trajectory:{filename: val}});
    };

    onUpdaterpdb = (val) => {
        console.log(val);
        this.setState({pdb:{data: val}});
    };

    render(){

        console.log(this.state.pdb.data);
        return(
        <div>
            <h2>NMR ORDER PARAMETER ANALYSIS</h2>
            <FMPicktr  onUpdate={this.onUpdatertr} >File trajectory</FMPicktr>
            <h2>{this.state.trajectory.filename}</h2>
            <FMPickpdb onUpdate={this.onUpdaterpdb}> File PDB </FMPickpdb>

        </div>
    );
    }
}
export default S2main;
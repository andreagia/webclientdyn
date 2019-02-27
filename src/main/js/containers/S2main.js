import React, { Component } from 'react';
import FMPicktr from '../components/FMPicktr'
import FMPickpdb from '../components/FMPickpdb';
import Checkpdb from '../utils/pdb/Checkpdb'
import NGLview from "../components/NGLview";

import * as NGL from "ngl";
import axios from "axios"
import {chromeOS} from "../../webapp/html/RichFilemanager/libs/CodeMirror/src/util/browser";

//esempio react spring https://www.djamware.com/post/5ab6397c80aca714d19d5b9c/building-spring-boot-mongodb-and-reactjs-crud-web-application

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
        loading: false,
        submitted: false,
        txtmds2: null
    };

    onUpdatertr = (val) => {
        console.log(val);
        this.setState({trajectory:{filename: val},pdb:{update: false}});
    };

    onUpdaterpdb = (val) => {
        console.log(val);
        this.setState({pdb:{data: val.data, filename: val.filename, update: true}});
    };

    postDataHandler = () => {
        const hostname = window.location.href;
        console.log(hostname);
        const post = {
            fileNC: this.state.trajectory.filename,
            filePDB:this.state.pdb.filename
        };
        axios.post("/react/runShellS2",post).then(
            result => {
                console.log("SOONO  --------- ");
                console.log(result);
                this.setState({submitted: true});
            }
        )
    };


    checksubimt = () => {
        let viewResults = null;

        console.log("CHECK PREMUTO");
        axios.get("/react/checkrun").then(result => {

                console.log("RISPOSTA CHECRUN");
                console.log(result);
                if(result.data.info === "OK") this.setState({txtmds2: result.data.text})
            }
        )
    };
    render(){

        let viewNGL = null;
//        console.log(this.state.pdb.data);
        if(this.state.pdb.data && this.state.pdb.update){
            console.log(this.state.pdb.data.data);
            let pdbvec = Checkpdb(this.state.pdb.data.data);
            console.log(pdbvec);

            viewNGL =
                <div>
                    <NGLview  pdbfiletxt={pdbvec.pdbtex} />
                </div>;
        }
        let submit= false;
        if(this.state.pdb.filename != null && this.state.trajectory.filename != null){
            if(this.state.submitted) {
                submit = false;
            } else {
                submit = true;
            }
        }

        let txtmds2 = null;
        if(this.state.txtmds2 != null ){
            txtmds2 = <div>
                {this.state.txtmds2}
            </div>
        }
        return(
        <div>
            <h2>NMR ORDER PARAMETER ANALYSIS</h2>
            <FMPicktr  onUpdate={this.onUpdatertr} >Add File trajectory</FMPicktr>
            <h2>{this.state.trajectory.filename}</h2>
            <FMPickpdb onUpdate={this.onUpdaterpdb}>Add File PDB </FMPickpdb>
            <button onClick={this.postDataHandler} disabled={!submit} className="btn btn-danger">Submit</button>
            <div id="viewport" style={{width:'400px', height:'400px'}}></div>
            {viewNGL}
            <button onClick={this.checksubimt}  className="btn btn-danger">CheckSubmit</button>
            {txtmds2}
        </div>
    );
    }
}
export default S2main;
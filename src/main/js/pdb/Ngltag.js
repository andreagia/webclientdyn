import React, {Component} from 'react';
import * as NGL from 'ngl';
import $ from 'jquery';


class Ngltag extends Component {
    constructor(props) {
        super(props);
        this.state = {store : ""};
    }

    componentDidMount() {

        let _this = this;
        $('button').on('click',function () {
            _this.setState({store: Math.random()})
            alert("PIPPO");
        });

        let stage;

        if(this.props.pdb){
            let data= this.props.pdbfile;
            let textpdbArr = data.split("\n");
            let dataArray = textpdbArr.filter(item => item.match('^ATOM') && !item.includes("WAT"));
            let retpdb = dataArray.join("\n");
            let stage, blob;
            blob = new Blob([retpdb], {type: 'text/html'});
            stage = new NGL.Stage("viewport");
            stage.loadFile(blob, {ext: "pdb"}).then(
                function (o) {
                    o.addRepresentation("cartoon", {colorScheme: "atomindex"});
                    o.autoView();
                }
            );
        }else {


            //document.addEventListener("DOMContentLoaded", function () {
            stage = new NGL.Stage("viewport");
            stage.loadFile("rcsb://1crn.mmtf", {defaultRepresentation: true});
            //});
        }

    }

    render(){
        return (
            <div>

                <h2>Viewport</h2>
                <div id="viewport" style={{width:'800px', height:'800px'}}></div>

                <button>click</button>
                <h2>{this.state.store}</h2>

            </div>
        )
    }
};
export default Ngltag;

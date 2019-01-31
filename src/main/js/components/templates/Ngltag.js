import React, {Component} from 'react';
import * as NGL from 'ngl';

class Ngltag extends Component {
  stage =null;
     //   this.state = {store : ""};


    componentDidMount() {
        this.stage = new NGL.Stage("viewport");
        this.stage.loadFile("rcsb://1crn.mmtf", {defaultRepresentation: true});
    }

    render(){
        console.log("<---------------NGLTAG--------------------->");
//        console.log(this.props.passo);

        if (this.stage) {
            if (this.props.pdbfiletxt) {
                console.log("<---------------PASSATO A NGLTAG--------------------->");
                console.log(this.props.pdbfiletxt);
                console.log(typeof this.props.pdbfiletxt);
                let data = this.props.pdbfiletxt;
                let textpdbArr = data.split("\n");
                let dataArray = textpdbArr.filter(item => item.match('^ATOM') && !item.includes("WAT"));
                let retpdb = dataArray.join("\n");
                let stage, blob;
                blob = new Blob([retpdb], {type: 'text/html'});
                //this.stage = new NGL.Stage("viewport");
                this.stage.loadFile(blob, {ext: "pdb"}).then(
                    function (o) {
                        o.addRepresentation("cartoon", {colorScheme: "atomindex"});
                        o.autoView();
                    }
                );
            }
        }

        return (
            <div>
                <div id="viewport" style={{width:'400px', height:'400px'}}></div>
            </div>
        )
    }
}
export default Ngltag;

import React, {Component} from 'react';
import * as NGL from 'ngl';

class Nglview extends Component {
    stage =null;
    //   this.state = {store : ""};

    render(){
        console.log("<---------------NGLTAG--------------------->");
//        console.log(this.props.passo);
        if(!this.stage) {
            this.stage = new NGL.Stage(this.props.stagename);
            this.props.getstage(this.stage);
        }

        if (this.stage) {
            if (this.props.pdbfiletxt) {
                console.log("<---------------PASSATO A NGLTAG--------------------->");
                console.log(this.props.pdbfiletxt);
                console.log(typeof this.props.pdbfiletxt);
                let data = this.props.pdbfiletxt;
                let textpdbArr = data.split("\n");
                console.log("TEXTPDB");
                console.log(textpdbArr);
                let dataArray = textpdbArr.filter(item => item.match('^ATOM') && !item.includes("WAT"));
                let retpdb = dataArray.join("\n");
                let blob;
                console.log("RETBPB");
                console.log(retpdb);
                blob = new Blob([retpdb], {type: 'text/html'});
                //this.stage = new NGL.Stage("viewport");
                console.log("THIS STAGE");
                console.log(this.stage);
                this.stage.loadFile(blob, {name: "myProtein", ext: "pdb"}).then(
                    function (o) {
                        o.addRepresentation("cartoon", {colorScheme: "atomindex"});
                        o.autoView();
                    }
                );
            }
        }

        return (
            <div>
            </div>
        )
    }
}
export default Nglview;

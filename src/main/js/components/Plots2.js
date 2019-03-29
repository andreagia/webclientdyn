import React, {Component} from 'react';
import Plot from 'react-plotly.js';
import axios from "axios";
import styles from "./Plots2.css";
import S2PrintTable from "./S2PrintTable"

class Plots2 extends Component {

    state = {
        ireds2: null,
        txtmds2: null,
        finished: false,
        currentCount: 0};

    viewdata = (data) => {
        console.log(data);
        console.log(data.points[0].pointNumber);
        let first = data.points[0].pointNumber+".CA";
        let rap1 = this.props.nglstage.getComponentsByName("myProtein").addRepresentation("distance", {
            atomPair: [[first, "25.CA"]],
            color: "skyblue"
        });
        if (event.shiftKey) {
            console.log('Shift + mouse click triggered.');
        }
    };

    onRowClick = (record, index, event) => {
        console.log(`Click nth(${index}) row of parent, record.name: ${record.rna} ${record.rnu}`);
        console.log("STAGE NGL FROM PLOT2D");
        console.log(this.props.nglstage);
        // See https://facebook.github.io/react/docs/events.html for original click event details.
        //console.log('CLICK STAGE --->',this.stage);
        let first = record.rnu+".CA";
         let rap1 = this.props.nglstage.getComponentsByName("myProtein").addRepresentation("distance", {
             atomPair: [[first, "25.CA"]],
             color: "skyblue"
         });
        if (event.shiftKey) {
            console.log('Shift + mouse click triggered.');
        }
    };

    checksubimt = () => {
        console.log("CHECK PREMUTO");
        axios.get("/react/checkrun").then(result => {

                console.log("RISPOSTA CHECKRUN");
                console.log(result);
                if(result.data.info === "OK") {
                    let finish = result.data.text.match(/--- RUN END ----/);
                    console.log("TYPEOF");
                    console.log(typeof result.data.text);
                    console.log(finish);
                    if(finish != null ){
                        clearInterval(this.intervalId);
                        this.setState({
                            ireds2: result.data.iredout,
                            txtmds2: result.data.text,
                            finished: true});
                    } else {
                        this.setState({
                            txtmds2: result.data.text
                        });
                    }
                }

            }
        )
    };

    timer = () => {
        this.checksubimt();
        this.setState({
            currentCount: this.state.currentCount + 1
        });
        if(this.state.currentCount > 100) {
            clearInterval(this.intervalId);
        }
    };

    componentDidMount() {
        if(this.state.finished === false ) {
            this.intervalId = setInterval(this.timer, 2000);
        }
    }
    componentWillUnmount(){
        clearInterval(this.intervalId);
    }
    render() {

        let txtmds2 = null;
        if(this.state.txtmds2 != null ){
            txtmds2 = <div id="scroll">
                {this.state.txtmds2}
            </div>
        }
        let plot=null;
        let table =null;

        if(this.state.finished){

            console.log("IREDS2");
            console.log(this.state.ireds2);
            let gets2x = this.state.ireds2.split("\n").filter(a => a.match(/\s+\d+\s+\d+\.\d+/)).map(b => b.slice(0,12).trim());
            let gets2y = this.state.ireds2.split("\n").filter(a => a.match(/\s+\d+\s+\d+\.\d+/)).map(b => b.slice(12, b.length).trim());

            console.log(gets2x);
            console.log(gets2y);
            plot = (<Plot
                data={[
                    {
                        x: [...gets2x],
                        y: [...gets2y],
                        type: 'scatter',
                        mode: 'lines+points',
                        marker: {color: 'red'},
                    },

                ]}
                layout={ {width: 640, height: 480, title: 'S2 PLOT'} }
                onClick={(data) => this.viewdata(data)}
                onHover={() => console.log("onHover")}
                onUnhover={() => console.log("onUnhover")}
            />);
            let s2props = {
                resid: [...gets2x],
                s2: [...gets2y]
            };
            table = (<div> <h2> Structure</h2>

                <S2PrintTable  sclick={this.onRowClick}  s2pass={s2props}/><S2PrintTable />
                </div>);

        }
        return (
            <div className={styles.Plots2}>
                <h2> pippopippopippopippoipipp </h2>
                <div>{this.state.currentCount}</div>
                {plot}
                {table}
                {txtmds2}
            </div>
        )
    }
}
export default Plots2;
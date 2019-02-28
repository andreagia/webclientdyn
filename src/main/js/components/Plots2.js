import React, {Component} from 'react';
import Plot from 'react-plotly.js';
import axios from "axios";

class Plots2 extends Component {

    state = {
        txtmds2:null,
        finished: false,
        currentCount: 0};

    viewdata = (data) => {
        console.log(data);
    };

    checksubimt = () => {
        console.log("CHECK PREMUTO");
        axios.get("/react/checkrun").then(result => {

                console.log("RISPOSTA CHECRUN");
                console.log(result);
                if(result.data.info === "OK") {
                    let finish = result.data.text.match(/--- RUN END ----/);
                    console.log("TYPEOF");
                    console.log(typeof result.data.text);
                    console.log(finish);
                    if(finish != null ){
                        clearInterval(this.intervalId);
                        this.setState({
                            txtmds2: result.data.text,
                            finished: true});
                    } else {
                        this.setState({txtmds2: result.data.text});
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
            txtmds2 = <div>
                {this.state.txtmds2}
            </div>
        }
        let plot=null;
        if(this.state.finished){
            plot= <Plot
                data={[
                    {
                        x: [1, 2, 3,4,5],
                        y: [2, 6, 3,2,5],
                        type: 'scatter',
                        mode: 'lines+points',
                        marker: {color: 'red'},
                    },

                ]}
                layout={ {width: 320, height: 240, title: 'A Fancy Plot'} }
                onClick={(data) => this.viewdata(data)}
                onHover={() => console.log("onHover")}
                onUnhover={() => console.log("onUnhover")}
            />

        }
        return (
            <div>
                <div>{this.state.currentCount}</div>
                {plot}
                {txtmds2}
            </div>
        )
    }
}
export default Plots2;
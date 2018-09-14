import React, {Component} from 'react';
import './App.css';
import Ngltag from './pdb/Ngltag';
import Vistextpdb from './pdb/Vistextpdb';
import ImportFromFileBodyComponent from './pdb/ImportFromFileBodyComponent';
import VirtualFolder from './pdb/VirtualFolder';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null

        }
        this.onUpdate=this.onUpdate.bind(this);
    }


    onUpdate(val){
        this.setState({
            file: val
        })
    };

    render() {
        let listpdb = '';
        console.log("FILE ->>")
        console.log(this.state.file)
        if(this.state.file){
            listpdb =(
            <div>
                {this.state.file}
            </div>
            );
        }
        return (

            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Welcome to React</h1>
                </header>

                <Vistextpdb/>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <Ngltag  pdbfiletxt={this.state.file}/>

                <ImportFromFileBodyComponent onUpdate={this.onUpdate}/>
                {listpdb}

                <VirtualFolder/>

            </div>
        );
    }
}

export default App;

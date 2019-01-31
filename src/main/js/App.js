import React, {Component} from 'react';
import './App.css';
import S2maintrial from './containers/S2maintrial';
import S2main from "./containers/S2main";

class App extends Component {
    state = {

        };


    render() {

        return (
            <div className="App">
                <S2main/>
                {/*<S2maintrial/>*/}
            </div>
        );
    }
}

export default App;

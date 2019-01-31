import React, {Component} from 'react';
import $ from 'jquery';

class VirtualFolder extends Component {
   state = {vlink : null};


    componentDidMount() {

        window.addEventListener("message", receiveMessage, false);
        let _this = this;
        $('#buttonvf').on('click',function () {
            _this.setState({store: Math.random()});

            let popup = window.open('https://portal.west-life.eu/virtualfolder/filepickercomponent.html', '_blank', 'width=640, height=480');
            //window.name = 'PDB_file'; //popup.name;)
        });

        function receiveMessage(event)
        {
            console.log('Sono in receivemessagge');
            console.log(typeof event.data);
            console.log(event.data);

            if (typeof event.data === "string") {
                if(event.data.length > 0){
                    _this.setState({vlink: event.data});
                }
            }

        }
    }

    render(){
        return (
            <div>

                <button id="buttonvf">Upload with Virtual folder</button>
                <p>File URL:<a id="file" href={this.state.vlink}>{this.state.vlink}</a></p>
            </div>
        )
    }
}

export default VirtualFolder;

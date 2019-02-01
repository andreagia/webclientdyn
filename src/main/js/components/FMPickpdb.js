import React, { Component } from 'react';
import jQuery from 'jquery';
import axios from 'axios';
window.$ = window.jQuery = jQuery;

class FMPickpdb extends Component {

    responceThisState = (inf) => {
        this.props.onUpdate(inf);
    };

    componentDidMount(){

        const selfResponce = this.responceThisState;



        function receiveMessagerfpdb(event)
        {

            let retval = {data: null, filename: null};
            if(event.data.source==="richfilemanager") {
                console.log("sono in recive message PDB");
                if ($('#iframepdb').length) {
                    console.log("Removed iframes");
                    $('#iframepdb').remove();
                    window.removeEventListener("message", receiveMessagerfpdb, false)
                }
                let url = window.location.href;
                let path = event.data.resourceObject.attributes.path;
                let pathfile = url.replace("reactjs.html","")+path.replace("src/main/webapp/html/","");
                // console.log(event.data);
                retval.filename = pathfile;
                axios
                    .get(
                        pathfile
                    )
                    .then(res => {
                        // return direcltly data objectconst file = res.data;
                        retval.data = res;
                        selfResponce(retval);
                    })
                    .catch(error => {
                        console.log((error));
                    });

            }
        }

        $('#buttonrfpdb').click(function(){
            if(!$('#iframepdb').length) {
                $('#iframeHolderpdb').html('<iframe id="iframepdb" src="RichFilemanager/index.html" width="700" height="450"></iframe>');
                window.addEventListener("message", receiveMessagerfpdb, false);
            }
        });
    }

    render() {
//        this.setState({rdata:this.props.rdata});

        return (
            <div>
                {this.props.children}
                <button id="buttonrfpdb">Button</button>
                <div id="iframeHolderpdb"/>
            </div>
        )
    }
}
export default FMPickpdb;
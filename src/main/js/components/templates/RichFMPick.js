import React, { Component } from 'react';
import jQuery from 'jquery';
import axios from 'axios';
window.$ = window.jQuery = jQuery;
//require('jquery-mobile');
//window.jQuery = jQuery;
//require('jquery-colorbox');

// esempio preso http://demos.jquerymobile.com/1.4.5/popup-iframe/

class Richfmpick extends Component {
    state = {
        file: null
    };

    responceThisState = (inf) => {
        this.props.onUpdate(inf);
        this.setState({file: inf});
    };

    componentDidMount(){

        const selfResponce = this.responceThisState;
        window.addEventListener("message", receiveMessagerf, false);
         function receiveMessagerf(event)
         {
             if(event.data.source==="richfilemanager") {
                 console.log('Sono in richfiles');
                 console.log(typeof event.data);
                 console.log(event.data.resourceObject.attributes.path);
                 console.log(window.location.href);
                 //console.log(event.origin);
                 // if($('#iframe').length && event.origin.include("hostname"))
                 if ($('#iframe').length) {
                     console.log("Removed iframes");
                     $('#iframe').remove();
                 }
                 let url = window.location.href;
                 let path = event.data.resourceObject.attributes.path;
                 let pathfile = url.replace("reactjs.html","")+path.replace("src/main/webapp/html/","");
                 console.log(pathfile);
                // this.setState({filename: pathfile});
                 axios
                     .get(
                         pathfile
                     )
                     .then(res => {
                         console.log("-----RES----");
                         console.log("res", res);
                        // const posts = res.data.split('\n').map(s => s.slice(0,54));
                         const file = res.data;
                         console.log(file);
                        // this.responceThisState(file);
                         //debugger
                         //self.setState({file});
                         selfResponce(file);
                     })
                     .catch(error => {
                         console.log((error));
                     });
             }
         }
            $('#buttonrf').click(function(){
                if(!$('#iframe').length) {
                    $('#iframeHolder').html('<iframe id="iframe" src="RichFilemanager/index.html?config=user.config.json&field_name=multi_url" width="700" height="450"></iframe>');
                }
            });
    }

    render() {
        return (
            <div>
                <input name="multi_url" type="text" id="multi_url" maxLength="255" />
                <button id="buttonrf">Button</button>
                <div id="iframeHolder"></div>

            </div>
        )
    }
}

export default Richfmpick;
import React, { Component } from 'react';
import jQuery from 'jquery';
window.$ = window.jQuery = jQuery;
require('jquery-mobile');
//window.jQuery = jQuery;
//require('jquery-colorbox');

// esempio preso http://demos.jquerymobile.com/1.4.5/popup-iframe/

class Richfmpick extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

        window.addEventListener("message", receiveMessagerf, false);
         function receiveMessagerf(event)
         {
             console.log('Sono in richfiles');
            console.log(typeof event.data);
             console.log(event.data);
             console.log(event.origin);
             if($('#iframe').length) {
                 console.log("PIPPO");
                 $('#iframe').remove();
             }
         }
            $('#buttonrf').click(function(){
                if(!$('#iframe').length) {
                    $('#iframeHolder').html('<iframe id="iframe" src="RichFilemanager/index.html?field_name=multi_url" width="700" height="450"></iframe>');
                }
            });
    }


    render() {
        return (
            <div>
                <input name="multi_url" type="text" id="multi_url" maxLength="255" value="" />
                <button id="buttonrf">Button</button>
                <div id="iframeHolder"></div>
            </div>
        )
    }
}

export default Richfmpick;
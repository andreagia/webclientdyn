import React, { Component } from 'react';
import $ from 'jquery';
//window.jQuery = jQuery;
//require('jquery-colorbox');

// esempio preso http://demos.jquerymobile.com/1.4.5/popup-iframe/

class Richfmpick extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
            $('#buttonrf').click(function(){
                if(!$('#iframe').length) {
                    $('#iframeHolder').html('<iframe id="iframe" src="RichFilemanager/index.html?field_name=multi_url" width="700" height="450"></iframe>');
                }
            });
    }

    render() {
        return (
            <div>
                <input name="multi_url" type="text" id="multi_url" maxLength="255" value=""/>
                <button id="buttonrf">Button</button>
                <div id="iframeHolder"></div>
            </div>
        )
    }
}

export default Richfmpick;
import React, {Component} from 'react';
import jQuery from 'jquery';

window.$ = window.jQuery = jQuery;

class FMPicktr extends Component {

    responceThisState = (inf) => {
        this.props.onUpdate(inf);
    };

    componentDidMount() {

        const selfResponce = this.responceThisState;

        function receiveMessagerf(event) {
            console.log("ho catturato il back");
            if (event.data.source === "richfilemanager" ) {
                console.log("sono in recive message TR");
                if ($('#iframetr').length) {
                    console.log("Removed iframes");
                    $('#iframetr').remove();
                    window.removeEventListener("message", receiveMessagerf, false)
                }
                let path = event.data.resourceObject.attributes.path;
                selfResponce(path.replace("src/main/webapp/html/filemanager", ""));

            }
        }

        $('#buttonrftr').click(function () {
            if (!$('#iframetr').length) {
                $('#iframeHoldertr').html('<iframe id="iframetr" src="RichFilemanager/index.html" width="700" height="450"></iframe>');
                window.addEventListener("message", receiveMessagerf, false);
            }
        });
    }

    render() {
        return (

            <div>
                {this.props.children}
                <button id="buttonrftr">Button</button>
                <div id="iframeHoldertr"/>

            </div>
        )
    }
}

export default FMPicktr;
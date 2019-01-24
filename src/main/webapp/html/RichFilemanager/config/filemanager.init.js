$('.fm-container').richFilemanager({
    // options for the plugin initialization step and callback functions, see:
    // https://github.com/servocoder/RichFilemanager/wiki/Configuration-options#plugin-parameters
    baseUrl: "/html/RichFilemanager",
    callbacks: {
        afterSelectItem: function (resourceObject, url) {
            // example on how to set url into target input and close bootstrap modal window
            // assumes that filemanager is opened via iframe, which is at the same domain as parent
            // https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy
            $('#target-input', parent.document).val(url);
            $('#modal', parent.document).find('.close').click();
        }
    }
});
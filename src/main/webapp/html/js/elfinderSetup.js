$(document).ready(function () {

    var myCommands = Object.keys(elFinder.prototype.commands);
    var disabled = ['extract', 'archive'];
    $.each(disabled, function (i, cmd) {
        (idx = $.inArray(cmd, myCommands)) !== -1 && myCommands.splice(idx, 1);
    });
    elfinderrel = $('#elfinder').attr('rel');

    $('#elfinder').elfinder({
        url: '/elfinder-servlet/connector',
        commands: myCommands,

        /* getFileCallback: function(file) {

         console.log("file");
         console.log(file);
         console.log(file['path']);
         var fileel = file['path'];
         var pdb =fileel.replace("ONEDATA","/html/data");
         console.log(pdb);
         stage = new NGL.Stage( "viewport" );
         stage.viewer.container.addEventListener( "dblclick", function(){
         stage.toggleFullscreen();
         } );
         function handleResize(){ stage.handleResize(); }
         window.addEventListener( "orientationchange", handleResize, false );
         window.addEventListener( "resize", handleResize, false );
         stage.loadFile(  pdb, { defaultRepresentation: true } );
         //stage.loadFile(  "/html/data/pdb/1iua.pdb", { defaultRepresentation: true } );
         //if( blob ) load();

         }*/
        handlers: {
            select: function ( event, elfinderInstance) {

                console.log(event);

                var selected = event.data.selected;

                if (selected.length) {
                    var objef = elfinderInstance.file(selected[0]);
                    console.log(objef);
                    console.log(objef['name']);
                    console.log(objef['mime']);
                    console.log(elfinderInstance);
                }

                //console.log(event.data);
                //console.log(event.data.selected); // selected files hashes list
            },
            dblclick: function (event, elfinderInstance) {
                console.log("DBL INI----------");
                console.log(event);
                var selected = event.data.file;
                console.log(elfinderInstance);
                var objep = elfinderInstance.path(selected);
                var objef = elfinderInstance.file(selected);
                var objeu = elfinderInstance.url(selected);
                console.log("OBJEP");
                console.log(objep);
                console.log("OBJEF");
                console.log(objef);
                console.log("OBJEU");
                console.log(objeu);
                console.log(objef['name']);
                console.log(objef['mime']);
                console.log(elfinderInstance);
                console.log("DBL END-----------");
                if(objef['mime'] == "application/x-palm-database"){
                    event.preventDefault();
                    // if(objep.contain("ONEDATA")){
                    //     var pdb =objep.replace("ONEDATA","/html/data");}
                    // else {var pdb =objep.replace("Local","/html/data");}
                    //console.log(pdb);
                    var urlj =objeu.replace("cmd=file","cmd=get");
                    console.log(urlj);
                    $.getJSON(urlj, function (data) {
                        console.log(data);
                        var pdb = data.content;
                        console.log("=====PDB=====")
                        console.log(pdb);
                        var stringBlob = new Blob( [ pdb ], { type: 'text/plain'} );
                        $('#viewport').children().remove();
                        stage = new NGL.Stage( "viewport" );
                        stage.viewer.container.addEventListener( "dblclick", function(){
                            stage.toggleFullscreen();
                        } );

                        function handleResize(){ stage.handleResize(); }
                        window.addEventListener( "orientationchange", handleResize, false );
                        window.addEventListener( "resize", handleResize, false );
                        stage.loadFile(stringBlob, {  ext: "pdb"  ,defaultRepresentation: true } );

                    });





                }



            }
        },
        getFileCallback: function (files, fm) {
            //var url = fm.convAbsUrl(fm.url(file.hash));
            //console.log("-----URL----");
            //console.log(url);

            return false;
        },

        // editor example
        //https://github.com/Studio-42/elFinder/wiki/Using-custom-editor-to-edit-files-within-elfinder

        /*commandsOptions: {
         quicklook: {
         width: 640,  // Set default width/height voor quicklook
         height: 480
         },
         edit: {
         mimes: [],
         editors: [{
         mimes: ['text/plain', 'text/html', 'text/javascript'],
         load: function(textarea) {
         var mimeType = this.file.mime;
         return CodeMirror.fromTextArea(textarea, {
         mode: mimeType,
         lineNumbers: true,
         indentUnit: 4
         });
         },
         save: function(textarea, editor) {
         $(textarea).val(editor.getValue());
         }
         }]
         }
         }*/
        // , lang: 'ru'                    // language (OPTIONAL)
    });


});/**
 * Created by andrea on 05/03/2017.
 */

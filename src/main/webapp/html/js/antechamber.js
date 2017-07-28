
var pdb = "";


$(document).ready(function() {
    $("#subdata1").removeAttr('disabled');
    $("#subdata2").attr("disabled", " ");
    $("#subshowJ").attr("disabled", " ");
    $("#data").hide();
    //$("#metal").hide();
    //$("#residue").hide();
    //$("#menu_item").click(function(){
    //	alert("pippo")
    //	var items = new Array();
    //	items["residue"] = "metal";
    //	items["metal"] = "residue";
    //	if($(this).is(':checked'))  {
    //		var v = $(this).val();
    //		$("#"+items[v]).hide();
    //		$("#"+val).show();
    //	}
    //});

    // bind form using ajaxForm
    //$('#form_check').ajaxForm({
    //    // dataType identifies the expected content type of the server response
    //    dataType:  'xml',
    //
    //    //beforeSubmit:   validate,
    //    //target:    '#output2',
    //
    //    // success identifies the function to invoke when the server response
    //    // has been received
    //    success:   prova123
    //});

    //$('#jm').hide();

    var options = {
        //target:        '#output1',   // target element(s) to be updated with server response
        beforeSubmit:  showRequest1,  // pre-submit callback
        success:       processXml,  // post-submit callback

        // other available options:
        //url:       url         // override for form's 'action' attribute
        dataType:   'xml',    async: false   // 'xml', 'script', or 'json' (expected server response type)
        //clearForm: true        // clear all form fields after successful submit
        //resetForm: true        // reset the form after successful submit

        // $.ajax options can be used here too, for example:
        //timeout:   3000
    };

    $("#inForm").submit(function() {
        $(":submit",this).attr("disabled", " ");
        //$("#subdata2").removeAttr('disabled');
        //$("#subshowJ").removeAttr('disabled');
    });

    $('#inForm').ajaxForm(options);

    var options2 = {
        //target:        '#output1',   // target element(s) to be updated with server response
        beforeSubmit:  showRequest,  // pre-submit callback
        success:       showResponse1,  // post-submit callback

        // other available options:
        //url:       url         // override for form's 'action' attribute
        dataType:   'xml', async: false     // 'xml', 'script', or 'json' (expected server response type)
        //clearForm: true        // clear all form fields after successful submit
        //resetForm: true        // reset the form after successful submit

        // $.ajax options can be used here too, for example:
        //timeout:   3000
    };
    $('#form_check').ajaxForm(options2);
    //$("#dialog").dialog({
    //		autoOpen: false,
    //		show: "blind",
    //		hide: "explode"
    //});
    $("#metal").validationEngine();
});

function showRequest1(formData, jqForm, options) {
    var form = jqForm[0];
    var cnt = $('input').filter('[name^=file_name]').val();
    if (cnt.length == 0) {
        $.validationEngine.buildPrompt("#file_name", "Required","error");
        hide_loading();
        $("#metal").show();
        $("#subdata1").removeAttr('disabled');
        $("#subdata2").attr("disabled", " ");
        $("#subshowJ").attr("disabled", " ");

        return false;
    }
    $.validationEngine.closePrompt("#file_name");
    return true;
}

function showRequest(formData, jqForm, options) {
    // formData is an array; here we use $.param to convert it to a string to display it
    // but the form plugin does this for you automatically when it submits the data

    var form = jqForm[0];
    var cnt = $('input').filter('[name^=bond]');

    if (cnt.length == 1) {
        if (isNaN(form.charge.value)) {
            //form.bond.value = 'You have to enter a number';
            alert("there is some field taht is no a number in the charge ");
            return false;
        }
    }
    else {
        for (i=0; i<cnt.length; i++) {
            if (isNaN(form.charge[i].value)) {
                //form.bond[i].value = 'You have to enter a number';
                alert("there is some field taht is no a number in the charge");
                return false;
            }
        }
    }

    if (cnt.length == 1) {
        if (isNaN(form.charge.value)) {
            //form.bond.value = 'You have to enter a number';
            alert("there is some field taht is no a number in the charge ");
            return false;
        }
    }
    else {
        t_charge=0;
        charge_tot = $("#charge_tot").filter('[name^=charge_tot]').val();

        abs_tot = Math.abs(parseFloat(charge_tot));
        for (i=0; i<cnt.length; i++) {
            t_charge=t_charge+parseFloat(form.charge[i].value);
        }

        if ( (Math.abs(t_charge) > (abs_tot + 0.08)) || (Math.abs(t_charge) < (abs_tot - 0.08)) )
        {
            //form.bond[i].value = 'You have to enter a number';
            alert("Total charge is "+t_charge+" different from "+ charge_tot );
            return false;
        }
    }



    if (cnt.length == 1) {
        if (isNaN(form.dih.value)) {
            //form.bond.value = 'You have to enter a number';
            alert("there is some field that is no a number in the dih ");
            return false;
        }
    }
    else {
        for (i=0; i<cnt.length; i++) {
            if (isNaN(form.dih[i].value)) {
                //form.bond[i].value = 'You have to enter a number';
                alert("there is some field that is no a number in the dih");
                return false;
            }
        }
    }

    if (cnt.length == 1) {
        if (isNaN(form.angle.value)) {
            //form.bond.value = 'You have to enter a number';
            alert("there is some field that is no a number in the angle ");
            return false;
        }
    }
    else {
        for (i=0; i<cnt.length; i++) {
            if (isNaN(form.angle[i].value)) {
                //form.bond[i].value = 'You have to enter a number';
                alert("there is some field that is no a number in the angle");
                return false;
            }
        }
    }

    if (cnt.length == 1) {
        if (isNaN(form.bond.value)) {
            //form.bond.value = 'You have to enter a number';
            alert("there is some field taht is no a number in the bond ");
            return false;
        }
    }
    else {
        for (i=0; i<cnt.length; i++) {
            if (isNaN(form.bond[i].value)) {
                //form.bond[i].value = 'You have to enter a number';
                alert("there is some field taht is no a number in the bond");
                return false;
            }
        }
    }
    return true;
}

function measure_bond(id, obj) {
    n = id.split(',');
    var script = "set measurements angstroms; measure "+n[0]+" "+n[1];
    jmolScript(script);
    $(obj).attr("src", "/global/images/eye--minus.png");
    $(obj).attr("onClick", "delete_measure(this.id, this)");
}

function measure_ang(id, obj) {
    n = id.split(',');
    var script = "set measurements angstroms; measure "+n[0]+" "+n[1]+" "+n[2];
    jmolScript(script);
    $(obj).attr("src", "/global/images/eye--minus.png");
    $(obj).attr("onClick", "delete_measure(this.id, this)");

}
function measure_dih(id, obj) {
    n = id.split(',');
    var script = "set measurements angstroms; measure "+n[0]+" "+n[1]+" "+n[2]+" "+n[3];
    jmolScript(script);
    $(obj).attr("src", "/global/images/eye--minus.png");
    $(obj).attr("onClick", "delete_measure(this.id, this)");
}

function delete_measure(id, obj) {
    n = id.split(',');
    var l = n.length;
    var s='';
    for (i=0; i <l; i++){
        s = s + ' ' + n[i];
    }
    var script = "measure"+s+" DELETE";
    jmolScript(script);
    $(obj).attr("src", "/global/images/eye--plus.png");
    $(obj).attr("onClick", "measure_bond(this.id, this)");
}

function show_label() {
    script = "select *;label %a"
    jmolScript(script);
    $("#subhideJ").removeAttr("disabled");
    $("#subshowJ").attr("disabled", "disabled");
}

function hide_label() {
    script = "select *;label off"
    jmolScript(script);
    $("#subshowJ").removeAttr("disabled");
    $("#subhideJ").attr("disabled", "disabled");
}

function show_loading(o){
    $(o).after('<img id="loading" src="/global/images/load.gif" style="padding: 5px">');
}

function hide_loading(){
    $("#loading").remove();
}

function show_molecule() {
    var p = ''
    $.ajax({
        type: 'POST',
        url: '/load/upload_jmol',
        success: function(data){
            if (data){
                p = data;
                p = p.replace(/\n/g, "|");
                var obj = '<object name="jmolApplet0" id="jmolApplet0" type="application/x-java-applet" height="350" width="350">'+
                    '<param name="syncId" value="216291259819275">'+
                    '<param name="progressbar" value="true">'+
                    '<param name="progresscolor" value="blue">'+
                    '<param name="boxbgcolor" value="black">'+
                    '<param name="boxfgcolor" value="white">'+
                    '<param name="boxmessage" value="Downloading JmolApplet ...">'+
                    '<param name="name" value="jmolApplet0">'+
                    '<param name="archive" value="JmolApplet0.jar">'+
                    '<param name="mayscript" value="true">'+
                    '<param name="code" value="JmolApplet.class">'+
                    '<param name="codebase" value="/global/javascript/jmol">'+
                    '<param name="loadinline" value="'+p+'">';
                obj += '<p style="background-color: yellow; color: black; width: 400px; height: 400px; text-align: center; vertical-align: middle;">'+
                    'You do not have Java applets enabled in your web browser, or your browser is blocking this applet.<br>'+
                    'Check the warning message from your browser and/or enable Java applets in<br>'+
                    'your web browser preferences, or install the Java Runtime Environment from <a href="http://www.java.com">www.java.com</a><br></p>'+
                    '</object>';
                var vdialog = $('<div id="dialog"></div>');
                vdialog.html(obj);
                vdialog.append('<input id="subshowJ" type="button" name="model" value="Show atom labels" onClick="show_label();" />');
                vdialog.append('<input id="subhideJ" type="button" name="model" value="Hide atom labels" onClick="hide_label();" disabled/>');
                vdialog.append('<br/><br/><span id="small">If you are seeing a black box, please click on Clear button (<b>Upload residue</b> section) and re-upload residue</span>');

                vdialog.dialog({
                    autoOpen: false,
                    dialogClass: 'noTitleStuff',
                    width: 390,
                    height: 460,
                    position: ['left','top'],
                    closeOnEscape: false,
                    open: function(event, ui) { $(".ui-dialog-titlebar-close").hide(); }
                });
                vdialog.dialog('open');
                vdialog.parent().scrollFollow({
                    speed: 1000,
                    offset: 0
                });

                vdialog.css('position', 'relative');
                //jmolLoadInline(p);
            }

        }
    });
}

function showResponse1(responseXML, statusXML)  {
    // for normal html responses, the first argument to the success callback
    // is the XMLHttpRequest object's responseText property

    // if the ajaxSubmit method was passed an Options Object with the dataType
    // property set to 'xml' then the first argument to the success callback
    // is the XMLHttpRequest object's responseXML property

    // if the ajaxSubmit method was passed an Options Object with the dataType
    // property set to 'json' then the first argument to the success callback
    // is the json data object returned by the server
    $("table#my-data tbody").remove();

    $('atom', responseXML).each(function(i) {
        angle=$(this).attr('angle');
        a1=$(this).attr('a1');
        a2=$(this).attr('a2');
        a3=$(this).attr('a3');
        a4=$(this).attr('a4');
        bond=$(this).attr('bond');
        angle=$(this).attr('angle');
        dih=$(this).attr('dih');
        n1=$(this).attr('n1');
        n2=$(this).attr('n2');
        n3=$(this).attr('n3');
        n4=$(this).attr('n4');
        charge=$(this).attr('charge');
        linea = '<tr><td name="a1f"><input type="text" maxlength="3" size="3" name="a1" value="' + a1 +'" readonly ></td>';
        linea += '<td name="a2f"><input type="text" maxlength="3" size="3" name="a2" value="' + a2 +'" readonly></td>';
        linea += '<td name="a3f"><input type="text" maxlength="3" size="3" name="a3" value="' + a3 +'" readonly></td>';
        linea += '<td name="a4f"><input type="text" maxlength="3" size="3" name="a4" value="' + a4 +'" readonly></td>';
        linea += '<td name="bondf"><input type="text" maxlength="7" size="7" name="bond" value="' + bond + '">';
        if(bond != ' '){
            linea+='<img src="/global/images/eye--plus.png" width="15" heigth="10" id="'+n1+','+n2+'" onclick="measure_bond(this.id, this)"></td>';
        }
        else{
            linea += '</td>'
        }
        linea += '<td name="anglef"><input type="text" maxlength="7" size="7" name="angle" value="' + angle + '" />';
        if(angle != ' '){
            linea+='<img src="/global/images/eye--plus.png" width="15" heigth="10" id="'+n1+','+n2+','+n3+'" onclick="measure_ang(this.id, this)"></td>';
        }
        else{
            linea += '</td>'
        }
        linea += '<td name="dihf"><input type="text" maxlength="7" size="7" name="dih" value="' + dih + '">';
        if(dih != ' '){
            linea+='<img src="/global/images/eye--plus.png" width="15" heigth="10" id="'+n1+','+n2+','+n3+','+n4+'" onclick="measure_dih(this.id, this)"></td>';
        }
        else{
            linea += '</td>'
        }
        linea += '<td name="chargef"><input type="text" maxlength="7" size="7" name="charge" value="' + charge + '"></td> </tr>';

        $("#my-data").append(linea);
    });
    //var message = $('atom', responseXML).attr('angle');
    //var charge_tot = $('info', responseXML).attr('charge');
    //var res_name = $('info', responseXML).attr('res_name');
    //$('#form_submit_prepi').append('<br /><input type="submit" name="submitData" value="submit Data">');
    //$('#info_prepi').append('Charge:<input type="text" maxlength="3" size="3" name="charge_tot" value="' + charge_tot +'">'>);
    //$('#info_prepi').append('Res_name:<input type="text" maxlength="3" size="3" name="res_name" value="' + res_name +'">');

    pdb = $('pdb_mol', responseXML).text();
    //setTimeout("jmol_sleep()", 1000);
    jmolLoadInline(pdb);
    //$("#dialog").dialog("close");

    $("#subdata2").removeAttr('disabled');
    $("#subshowJ").removeAttr('disabled');
    return true;

    /*alert('status: ' + statusText + '\n\nresponseText: \n' + responseText +
     '\n\nThe output div should have already been updated with the responseText.');*/
}


function processXml(responseXML,statusXML) {
    // 'responseXML' is the XML document returned by the server; we use
    // jQuery to extract the content of the message node from the XML doc

    if ($('info', responseXML).attr('status_err') == "true") {
        err_ante=$('out_antechamber', responseXML).text();
        alert("input not created"+err_ante);
        $("#subdata1").removeAttr('disabled');
        $("#subdata2").attr("disabled", " ");
        $("#subshowJ").attr("disabled", " ");
        return false;
    }
    $("#data").show();
    $('atom', responseXML).each(function(i) {
        angle=$(this).attr('angle');
        a1=$(this).attr('a1');
        a2=$(this).attr('a2');
        a3=$(this).attr('a3');
        a4=$(this).attr('a4');
        bond=$(this).attr('bond');
        angle=$(this).attr('angle');
        dih=$(this).attr('dih');
        n1=$(this).attr('n1');
        n2=$(this).attr('n2');
        n3=$(this).attr('n3');
        n4=$(this).attr('n4');
        charge=$(this).attr('charge');
        linea = '<tr><td name="a1f"><input type="text" maxlength="3" size="3" name="a1" value="' + a1 +'" readonly ></td>';
        linea += '<td name="a2f"><input type="text" maxlength="3" size="3" name="a2" value="' + a2 +'" readonly></td>';
        linea += '<td name="a3f"><input type="text" maxlength="3" size="3" name="a3" value="' + a3 +'" readonly></td>';
        linea += '<td name="a4f"><input type="text" maxlength="3" size="3" name="a4" value="' + a4 +'" readonly></td>';
        linea += '<td name="bondf"><input type="text" maxlength="7" size="7" name="bond" value="' + bond + '">';
        if(bond != ' '){
            linea+='<img src="/global/images/eye--plus.png" width="15" heigth="10" id="'+n1+','+n2+'" onclick="measure_bond(this.id, this)"></td>';
        }
        else{
            linea += '</td>'
        }
        linea += '<td name="anglef"><input type="text" maxlength="7" size="7" name="angle" value="' + angle + '" />';
        if(angle != ' '){
            linea+='<img src="/global/images/eye--plus.png" width="15" heigth="10" id="'+n1+','+n2+','+n3+'" onclick="measure_ang(this.id, this)"></td>';
        }
        else{
            linea += '</td>'
        }
        linea += '<td name="dihf"><input type="text" maxlength="7" size="7" name="dih" value="' + dih + '">';
        if(dih != ' '){
            linea+='<img src="/global/images/eye--plus.png" width="15" heigth="10" id="'+n1+','+n2+','+n3+','+n4+'" onclick="measure_dih(this.id, this)"></td>';
        }
        else{
            linea += '</td>'
        }
        linea += '<td name="chargef"><input type="text" maxlength="7" size="7" name="charge" value="' + charge + '"></td> </tr>';
        $("#my-data").append(linea);
    });
    //var message = $('atom', responseXML).attr('angle');
    var charge_tot = $('info', responseXML).attr('charge');
    var res_name = $('info', responseXML).attr('res_name');
    $('#form_submit_prepi').append('<br />Update data and 3D representation ');
    $('#form_submit_prepi').append('<input type="submit" name="submitData" value="Update">');
    $('#info_prepi').prepend('Rename residue: <input type="text" maxlength="3" size="3" name="res_name" value="' + res_name +'">&nbsp;&nbsp;');
    $('#info_prepi').append('Charge: <input id="charge_tot" type="text" maxlength="3" size="3" name="charge_tot" value="' + charge_tot +'">');
    pdb = $('pdb_mol', responseXML).text();
    //setTimeout("jmol_sleep()", 2000);
    hide_loading();
    show_molecule();
    $("#subdata2").removeAttr('disabled');
    $("#subshowJ").removeAttr('disabled');
    return true;
}

function jmol_sleep(){
    hide_loading();
    show_molecule();
}

function reloadPage(){
    window.location = window.location.href;
}

function defineMetal(){
    if (check_metal()){
        atom = $("#met_atom_name").val();
        element = $("#met_element").val();
        res = $("#met_res_name").val();
        charge = $("#met_charge").val();
        rvdw = $("#met_rvdw").val();
        eps = $("#met_eps").val();
        $.ajax({
            type: 'POST',
            url: '/load/define_metal',
            data: {atom_name: atom, element: element, res_name: res, charge: charge, rvdw: rvdw, eps: eps},
            success: function(data){
                $("#met_atom_name").val("");
                $("#met_element").val("");
                $("#met_res_name").val("");
                $("#met_charge").val("");
                $("#met_rvdw").val("");
                $("#met_eps").val("");
                window.open("/load/download_metal?filename="+data)
                window.back
            }
        });
    }

}

function check_metal(){
    atom = $("#met_atom_name").val();
    element = $("#met_element").val();
    res = $("#met_res_name").val();
    charge = $("#met_charge").val();
    rvdw = $("#met_rvdw").val();
    eps = $("#met_eps").val();

    ret = true;

    if (atom == ''){
        $.validationEngine.buildPrompt("#met_atom_name", "Required","error");
        ret = false
    }
    if (element == ''){
        $.validationEngine.buildPrompt("#met_element", "Required","error");
        ret = false
    }
    if (res == ''){
        $.validationEngine.buildPrompt("#met_res_name", "Required","error");
        ret = false
    }
    if (charge == ''){
        $.validationEngine.buildPrompt("#met_charge", "Required","error");
        ret = false
    }
    if (rvdw == ''){
        $.validationEngine.buildPrompt("#met_rvdw", "Required","error");
        ret = false
    }
    if (eps == ''){
        $.validationEngine.buildPrompt("#met_eps", "Required","error");
        ret = false
    }
    return ret
}


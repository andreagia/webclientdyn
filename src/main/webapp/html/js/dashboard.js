/**
 * Created by andrea on 04/03/2017.
 */
$(document).ready(function () {
    callAjax();
    getFiles();

    $('#submitForm').submit(function (e) {
        var frm = $('#submitForm');
        e.preventDefault();

        var data = {};
        var Form = this;

        //Gather Data also remove undefined keys(buttons)
        $.each(this, function (i, v) {
            var input = $(v);
            data[input.attr("name")] = input.val();
            delete data["undefined"];
        });
        console.log(data);
        $.ajax({
            contentType: 'application/json; charset=utf-8',
            type: frm.attr('method'),
            url: frm.attr('action'),
            dataType: 'json',
            data: JSON.stringify(data),
            success: function (callback) {
                alert("Response: Name: " + callback.fileNC + "  DOB: " + callback.filePDB + "  Email: " + callback.email + "  Phone: " + callback.phone);
                $(this).html("Success!");
            },
            error: function () {
                $(this).html("Error!");
            }
        });
    });


    function createElement(name, properties, style) {
        var el = document.createElement(name);
        Object.assign(el, properties);
        Object.assign(el.style, style);
        return el
    }

    function createSelect(options, properties, style) {
        var select = createElement("select", properties, style);
        options.forEach(function (d) {
            select.add(createElement("option", {
                value: d[0], text: d[1]
            }))
        });
        return select;
    }

    function addElement(el) {
        Object.assign(el.style, {
            position: "absolute",
            zIndex: 10
        });
        stage.viewer.container.appendChild(el);
    }

    var topPosition = 12;

    function getTopPosition(increment) {
        if (increment) topPosition += increment;
        return topPosition + "px";
    }

    stage = new NGL.Stage("viewport");
    stage.viewer.container.addEventListener("dblclick", function () {
        stage.toggleFullscreen();
    });

    stage.setParameters({
        backgroundColor: "white"
    });

    function handleResize() {
        stage.handleResize();
    }

    var struc;

    window.addEventListener("orientationchange", handleResize, false);
    window.addEventListener("resize", handleResize, false);

    stage.loadFile("/html/tmp/prot.pdb").then(
        function (o) {
            struc = o;
            console.log("STRUC1:", struc);
            setResidueOptions();
            setChainOptions();
            o.autoView();
            cartoonRepr = o.addRepresentation("cartoon", {
                visible: true,
                color: schemeId
            });
            backboneRepr = o.addRepresentation("backbone", {
                visible: false,
                colorValue: "lightgrey",
                radiusScale: 2
            });

            neighborRepr = o.addRepresentation("ball+stick", {
                sele: "none",
                aspectRatio: 1.1,
                colorValue: "lightgrey",
                multipleBond: "symmetric"
            });
            ligandRepr = o.addRepresentation("ball+stick", {
                multipleBond: "symmetric",
                colorValue: "grey",
                sele: "none",
                aspectRatio: 1.2,
                radiusScale: 2.5
            });
            contactRepr = o.addRepresentation("contact", {
                sele: "none",
                radiusSize: 0.07,
                weakHydrogenBond: false,
                waterHydrogenBond: false,
                backboneHydrogenBond: true
            });
            pocketRepr = o.addRepresentation("surface", {
                sele: "none",
                lazy: true,
                visibility: true,
                clipNear: 0,
                opaqueBack: false,
                opacity: 0.0,
                color: "hydrophobicity",
                roughness: 1.0,
                surfaceType: "av"
            });
            labelRepr = o.addRepresentation("label", {
                sele: "none",
                color: "#333333",
                yOffset: 0.2,
                zOffset: 2.0,
                attachment: "bottom-center",
                showBorder: true,
                borderColor: "lightgrey",
                borderWidth: 0.25,
                disablePicking: true,
                radiusType: "size",
                radiusSize: 0.8,
                labelType: "residue",
                labelGrouping: "residue"
            });


        }
    );

    function setChainOptions() {
        chainSelect.innerHTML = "";
        var options = [["", "select chain"]];
        struc.structure.eachChain(function (cp) {
            var name = cp.chainname;
            console.log("CHAINNAME:", name);
            console.log(cp.entity);
            //if (cp.entity.description) name += " (" + cp.entity.description + ")";
            options.push([cp.chainname, "Protein"]);
        }, new NGL.Selection("polymer"));
        options.forEach(function (d) {
            chainSelect.add(createElement("option", {
                value: d[0], text: d[1]
            }))
        })
    }

    function setResidueOptions(chain) {
        residueSelect.innerHTML = "";
        var options = [["", "select residue"]];
        console.log("CHAIN:", chain);
        if (chain) {
            struc.structure.eachResidue(function (rp) {
                var sele = "";
                if (rp.resno !== undefined) sele += rp.resno;
                if (rp.inscode) sele += "^" + rp.inscode;
                if (rp.chain) sele += ":" + rp.chainname;
                var name = (rp.resname ? "[" + rp.resname + "]" : "") + sele;
                options.push([sele, name]);
                console.log(chain);
            }, new NGL.Selection("polymer and :" + chain))
        }
        options.forEach(function (d) {
            residueSelect.add(createElement("option", {
                value: d[0], text: d[1]
            }))
        })
    }

    var chainSelect = createSelect([], {
        onchange: function (e) {
            // ligandSelect.value = ""
            residueSelect.value = "";
            setResidueOptions(e.target.value)
        }
    }, {top: getTopPosition(20), left: "12px", width: "130px"});
    addElement(chainSelect);

    var residueSelect = createSelect([], {
        onchange: function (e) {
            // ligandSelect.value = "";
            var sele = e.target.value;
            console.log("select", sele);
            if (!sele) {
                console.log("select showfull");
                showFull()
            } else {
                console.log("select showLigand");
                showLigand(sele);
            }
        }
    }, {top: getTopPosition(20), left: "12px", width: "130px"});
    addElement(residueSelect);


    var pocketRadius = 0;
    var pocketRadiusClipFactor = 1;

    var cartoonRepr, backboneRepr, spacefillRepr, neighborRepr, ligandRepr, contactRepr, pocketRepr, labelRepr;

    var struc
    var neighborSele
    var sidechainAttached = false

    //if( blob ) load();
    function showLigand(sele) {
        var s = struc.structure;
        console.log(sele);
        console.log(s);
        var withinSele = s.getAtomSetWithinSelection(new NGL.Selection(sele), 5);
        var withinGroup = s.getAtomSetWithinGroup(withinSele);
        var expandedSele = withinGroup.toSeleString();
        // neighborSele = "(" + expandedSele + ") and not (" + sele + ")"
        neighborSele = expandedSele;

        var sview = s.getView(new NGL.Selection(sele));
        pocketRadius = Math.max(sview.boundingBox.getSize().length() / 2, 2) + 5;
        var withinSele2 = s.getAtomSetWithinSelection(new NGL.Selection(sele), pocketRadius + 2);
        var neighborSele2 = "(" + withinSele2.toSeleString() + ") and not (" + sele + ") and polymer";

        backboneRepr.setParameters({radiusScale: 0.2});
        //  backboneRepr.setVisibility(backboneCheckbox.checked)
        //spacefillRepr.setVisibility(false)

        ligandRepr.setVisibility(true);
        neighborRepr.setVisibility(false);
        contactRepr.setVisibility(false);
        pocketRepr.setVisibility(false);
        //  labelRepr.setVisibility(labelCheckbox.checked)

        ligandRepr.setSelection(sele);
        neighborRepr.setSelection(
            sidechainAttached ? "(" + neighborSele + ") and (sidechainAttached or not polymer)" : neighborSele
        );
        contactRepr.setSelection(expandedSele);
        pocketRepr.setSelection(neighborSele2);
        pocketRepr.setParameters({
            clipRadius: pocketRadius * pocketRadiusClipFactor,
            clipCenter: sview.center
        });
        labelRepr.setSelection("(" + neighborSele + ") and not (water or ion)");

        struc.autoView(expandedSele, 2000);
    }


    var schemeId;
    function callAjax() {

        $.ajax({
            url: '/service/dashboard',
            success: function (response) {
                var v = 0;
                var res1 = null;
                var s21 = null;

                var jsonType = JSON.parse(response);
                var count = jsonType.res.length;
                console.log(count);
                $.each(jsonType, function (key, value) {
                        if (v == 0) {
                            res1 = value;
                            v++;
                        } else if (v == 1) {
                            s21 = value;
                            v++;
                        }
                    }
                );

                var data = [];
                for (var i = 0; i < count; i++) {
                    var x = {
                        res: res1[i],
                        s2: s21[i],
                    };
                    data.push(x);

                }
                $('#export').click(function () {
                    console.log("-----DATA-----");
                    console.log(data);
                    console.log(data.map(a => console.log(a.res)));

                    let CSVString = data.reduce((s, a) => s + a.res + "," + a.s2 + "\n", "");
                    console.log("-------MODIFICA------------");
                    console.log(CSVString);
                    var downloadLink = document.createElement("a");
                    var blob = new Blob(["\ufeff", CSVString]);
                    var url = URL.createObjectURL(blob);
                    downloadLink.href = url;
                    downloadLink.download = "data.csv";

                    /*
                     * Actually download CSV
                     */
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);
                });
                Morris.Line({
                    element: 'morris-line-chart',
                    data: data,
                    xkey: ['res'],
                    ykeys: ['s2'],
                    labels: ['MD S2'],
                    pointSize: 2,
                    hideHover: 'auto',
                    resize: true,
                    parseTime: false
                });

                schemeId = NGL.ColormakerRegistry.addScheme(function (params) {
                    this.atomColor = function (atom) {
                        let aindex = atom.residue.index;
                        //console.log(atom.residue.index);
                        let s2 = data.find(a=> a.res == aindex);
                        console.log(s2);
                        let red;
                        let blue;
                        if(s2) {
                            let s2f = parseFloat(s2.s2);
                            let colorint = Math.round(s2f * 65535);

                            let scolorex = colorint.toString(16);
                            if(scolorex.length == 1 ){
                                blue = "0"+scolorex;
                                red = "00";
                            } else if(scolorex.length == 2){
                                blue = scolorex;
                                red = "00";
                            } else if(scolorex.length == 3){
                                blue = scolorex.slice(0,2);
                                red = "0"+scolorex.slice(2,3);
                            } else if(scolorex.length == 4){
                                blue = scolorex.slice(0,2);
                                red = "0"+scolorex.slice(2,4);
                            }

                            return parseInt(red + "00" + blue, 16);
                        }

                        // if (aindex < 10) {
                        //     return 0x0000FF // blue;
                        // } else if (aindex > 20) {
                        //     return 0xFF0000 // red;
                        // } else {
                        //     return 0x00FF00 // green;
                        // }
                    }
                });
                var thisDate, thisData;
                $("#morris-line-chart svg").on('click', function () {
                    // Find data and date in the actual morris diply below the graph.
                    thisDate = $(".morris-hover-row-label").html();
                    thisDataHtml = $(".morris-hover-point").html().split(":");
                    thisData = thisDataHtml[1].trim();

                    // alert !!
                    //alert("Data1: " + thisData + "\nData2: " + thisDate);
                    showLigand(thisDate+":A");


                });

            }
        });
    }


    $('#getfilesnc').multiselect({

        includeSelectAllOption: false,
        buttonWidth: '200px',
        enableCaseInsensitiveFiltering: true
        // onChange: function(value, checked, select) {
        //     console.log('Changed option ' + $(value).val() + '. '+checked+" "+ select);
        //     const get_val = $("#multiple_value").val();
        //     console.log(get_val);
        //     if (checked) {
        //         let hidden_val = (get_val != "") ? get_val + "," : get_val;
        //         $("#multiple_value").val(hidden_val + "" + value);
        //     } else {
        //         let new_val = get_val.replace(value, "");
        //         $("#multiple_value").val(new_val);
        //     }

        //}

    });

    function getFiles() {

        $.ajax({
            url: '/service/getfilesnameNC',
            success: function (response) {
                console.log("RESPONSE");
                console.log(response);
                console.log(typeof response);
              //  response.sort();
                var jsonType = JSON.parse(response);
                var dataList = $("#getfilesnc");
                $.each(jsonType, function (key, value) {
                    console.log(value);
                    var opt = $("<option>" + value + "</option>").attr("value", value);
                    dataList.append(opt);
                });
                dataList.multiselect('rebuild');
            }
        });
        $.ajax({
            url: '/service/getfilesnamePDB',
            success: function (response) {
                console.log("RESPONSE");
                console.log(response);
                var jsonType = JSON.parse(response);
                var dataList = $("#getfilespdb");
                $.each(jsonType, function (key, value) {
                    console.log(value);
                    var opt = $("<option>" + value + "</option>").attr("value", value);
                    dataList.append(opt);
                });
            }
        });

    }

});

function getOutput() {
    $.ajax(
        {
            url: '/service/getoutput',
            success: function (response) {
                console.log("RESPONSE");
                console.log(response);
                response = response.replace(/\r?\n/g, "<br />");
                $("#modalbody").html(response);
            }
        }
    );

}
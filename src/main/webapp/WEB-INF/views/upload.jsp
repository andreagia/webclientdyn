<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ page session="false" %>
<html>
<head>
    <title>Upload Multiple File Request Page</title>
    <link href="/html/adm/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
<form:form id="inForm" action="/uploadAnte" method="post"  enctype="multipart/form-data" modelAttribute="formantechamber" >
    <fieldset>
        <legend>Setup input</legend>
        <span style="color: black">You can upload residue (.pdb or .mol2 file):</span>
        <div id="residue" style="border-width: 2px; border-style: dotted; border-color: #D8D8D8; ">
            <table>
                <tr>
                    <td>
                        Type*:
                    </td>
                    <td>
                        <select name="type_in" id="type_in">
                            <option value="pdb">pdb</option>
                            <option value="mol2">mol2</option>
                        </select>
                    </td>
                    <td>
                        File*:
                    </td>
                    <td>
                        <input type="file" id="file" name="file"/>
                    </td>
                    <td>
                        Charge:
                    </td>
                    <td>
                        <input type="text" maxlength="2" size="1" id="charge" name="charge" value="0" />
                    </td>
                </tr>
                <tr>
                    <td>
                        Charge Methods:
                    </td>
                    <td>
                        <select name="charge_type" id="charge_type">
                            <option value="gas">Gasteiger</option>
                            <option value="bcc">AM1-BCC</option>
                        </select>
                    </td>
                    <td>
                        Rename residue:
                    </td>
                    <td>
                        <input type="text" maxlength="3" size="2" id="res_name" name="res_name" value="MOL" />
                    </td>
                </tr>
            </table>
            <br />
            <center><input id="subdata1" type="submit" name="submitData" value="Load residue" onClick="show_loading(this);$('#span_metal').hide();$('#metal').hide();">
                <input id="reload" type="button" name="clear" value="Reset" onClick="reloadPage()" /></center>
            <!--<br /> <br />
            <span class="note">*Required</span>-->
        </div>
        <span class="note">*Required</span>
    </fieldset>
</form:form>

<c:if test="${not empty atoms}">
<div class="row">
    <div class="col-md-4 ">

        <div class="panel panel-default">
            <div class="panel-heading">
                Strucure
            </div>
            <!-- /.panel-heading -->
            <div class="panel-body">
                <table id="my-data" class="table table-bordered">
                    <thead>
                    <tr>
                        <th>A1</th>
                        <th>A2</th>
                        <th>A3</th>
                        <th>A4</th>
                        <th>Bond</th>
                        <th>Angle</th>
                        <th>Dih</th>
                        <th>Charge</th>
                    </tr>
                    </thead>
                    <tbody>
                    <c:forEach items="${atoms}" var="atom">
                        <tr>
                            <td name="a1f"><input type="text" maxlength="3" size="3" name="a1" value="${atom.a1}"
                                                  readonly></td>
                            <td name="a2f"><input type="text" maxlength="3" size="3" name="a2" value="${atom.a2}"
                                                  readonly></td>
                            <td name="a3f"><input type="text" maxlength="3" size="3" name="a3" value="${atom.a3}"
                                                  readonly></td>
                            <td name="a4f"><input type="text" maxlength="3" size="3" name="a4" value="${atom.a4}"
                                                  readonly></td>
                            <td name="bondf"><input type="text" maxlength="7" size="7" name="bond" value="${atom.bond}">
                                <img src="/global/images/eye.jpg" width="15" heigth="10" id="'+n1+','+n2+'" onclick="measure_bond(this.id)">
                            </td>
                            <td name="anglef"><input type="text" maxlength="7" size="7" name="angle"
                                                     value="${atom.angle}"></td>
                            <td name="dihf"><input type="text" maxlength="7" size="7" name="dih" value="${atom.dih}">
                            </td>
                            <td name="chargef"><input type="text" maxlength="4" size="10" name="charge"
                                                      value="${atom.charge}"></td>
                        </tr>
                    </c:forEach>
                    </tbody>

                </table>
            </div>

        </div>

        <script>
            document.addEventListener("DOMContentLoaded", function () {
                stage = new NGL.Stage("viewport");
                stage.viewer.container.addEventListener("dblclick", function () {
                    stage.toggleFullscreen();
                });
                function handleResize() {
                    stage.handleResize();
                }

                window.addEventListener("orientationchange", handleResize, false);
                window.addEventListener("resize", handleResize, false);
                stage.loadFile("/html/tmp/ante.pdb", {defaultRepresentation: true});
                //if( blob ) load();
            });

        </script>
        <div class="col-md-4">
            <div class="panel panel-default">
                <div class="panel-heading">
                    PDB Structure
                </div>
                <!-- /.panel-heading -->
                <div class="panel-body">
                    <div id="viewport" class="img-responsive" style="width:100%; height:300px;"></div>
                </div>
            </div>

        </div>
        </c:if>

<script src="/html/adm/vendor/jquery/jquery.min.js"></script>

<!-- Bootstrap Core JavaScript -->
<script src="/html/adm/vendor/bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript" src="/html/js/ngl/ngl.js"></script>

</body>
</html>
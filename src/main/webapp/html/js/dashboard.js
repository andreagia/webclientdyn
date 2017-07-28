/**
 * Created by andrea on 04/03/2017.
 */
$(document).ready(function(){
    callAjax();
    getFiles();

    $('#submitForm').submit(function(e) {
        var frm = $('#submitForm');
        e.preventDefault();

        var data = {}
        var Form = this;

        //Gather Data also remove undefined keys(buttons)
        $.each(this, function(i, v){
            var input = $(v);
            data[input.attr("name")] = input.val();
            delete data["undefined"];
        });
        $.ajax({
            contentType : 'application/json; charset=utf-8',
            type: frm.attr('method'),
            url: frm.attr('action'),
            dataType : 'json',
            data : JSON.stringify(data),
            success : function(callback){
                alert("Response: Name: "+callback.fileNC+"  DOB: "+callback.filePDB+"  Email: "+callback.email+"  Phone: "+callback.phone);
                $(this).html("Success!");
            },
            error : function(){
                $(this).html("Error!");
            }
        });
    });


});


function getFiles() {

    $.ajax({
        url: '/service/getfilesnameNC',
        success: function (response) {
            console.log("RESPONSE")
            console.log(response);
            var jsonType = JSON.parse(response);
            var dataList = $("#getfilesnc");
            $.each(jsonType, function (key, value) {
                console.log(value);
                var opt = $("<option>" + value + "</option>").attr("value", value);
                dataList.append(opt);
            });
        }
    });
    $.ajax({
        url: '/service/getfilesnamePDB',
        success: function (response) {
            console.log("RESPONSE")
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

function callAjax() {

    $.ajax({
        url : '/service/dashboard',
        success : function(response) {
            var v = 0;
            var res1 = null;
            var s21 = null;

            var jsonType = JSON.parse(response);
            var count = jsonType.res.length;
            console.log(count);
            $.each(jsonType, function(key,value)
                {
                    if (v == 0)
                    {
                        res1 = value;
                        v++;
                    }
                    else if(v == 1)
                    {
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

        }
    });
}
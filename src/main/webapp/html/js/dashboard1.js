/**
 * Created by andrea on 05/03/2017.
 */
$(document).ready(function(){
    callAjax();

});

function callAjax() {

    $.ajax({
        url : '/welcome/dashboard1',
        success : function(response) {
            var v = 0;
            var period1 = null;
            var iphone1 = null;
            var ipad1 = null;
            var itouch1 = null;
            var jsonType = JSON.parse(response);
            $.each(jsonType, function(key,value)
                {
                    if (v == 0)
                    {

                        period1 = value;
                        v++;

                    }
                    else if(v == 1)
                    {
                        iphone1 = value;
                        v++;

                    }
                    else if(v == 2)
                    {
                        ipad1 = value;
                        v++;

                    }
                    else if(v == 3)
                    {
                        itouch1 = value;
                        v++;

                    }
                }

            );

            var data = [];
            for (var i = 0; i < 10; i++) {

                var x = {
                    period: period1[i],
                    iphone: iphone1[i],
                    ipad: ipad1[i],
                    itouch: itouch1[i]
                };
                data.push(x);

            }



            Morris.Area({
                element: 'morris-area-chart',
                data: data,
                xkey: 'period',
                ykeys: ['iphone', 'ipad', 'itouch'],
                labels: ['iPhone', 'iPad', 'iPod Touch'],
                pointSize: 2,
                hideHover: 'auto',
                resize: true
            });

        }
    });
}
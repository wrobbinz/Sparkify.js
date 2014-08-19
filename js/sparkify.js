(function($) {

    $.fn.sparkify = function( options ) {

        // Establish default settings
        var settings = $.extend({
            widget       : 'fader',
            numbered     : true,
            percent      : true,
            width        : 400,
            height       : 40,
            fillColor    : '#00aced',
            func         : 'colorSwipe',
            complete     : null
        }, options);
        
        var deviceID    = "55ff6a065075555345371487";
        var accessToken = "c6bffccc5b25d58d20cf3fda7c9120ad1a3f4cfe";
        var func = settings.func;
        var value = 0;
        if ( settings.widget == 'fader'){
            var draw = SVG('fader');
            draw.rect(settings.width, settings.height).attr({'x' : 0,'y' : 0}).fill('#f6f6f6');
            var bar = draw.rect(20,settings.height).attr({'x' : 0}).fill('#FFF');
            var fader = draw.rect(settings.width, settings.height).attr({'x' : 0,'y' : 0}).fill(settings.fillColor);
            fader.maskWith(bar);
            var isDown = false;

            fader.mousedown(function( event ){
                isDown = true;
                value = event.clientX;
                bar.attr({'width' : value});

            });
            window.onmouseup = function(){
                if (isDown){
                  bar.attr({'width' : value});
                  if (value > settings.width){
                    value = settings.width;
                  }
                  sendData(value);
                  isDown = false;
                  displayNum(value);
                }
            };
            window.onmousemove = function(){
                if (isDown){
                  value = event.clientX;
                  if (value < 0){
                    value = 0;
                  }
                  if (value > settings.width){
                    value = settings.width;
                  }
                  bar.attr({'width' : value});
                  displayNum(value);
                }
            };
            $("#numbers").keyup(function (e) {
                if (e.keyCode == 13) {
                    var num = $('#numbers').val().replace("%", "");
                    if (settings.percent){
                        num = (((num - 0) * settings.width) / 100);
                    }
                    bar.attr({'width' : num});
                    sendData(num);
                }
            });
        }
        var displayNum = function(coord){
            if (settings.numbered){
                if (settings.percent){
                    var percent = ((value * 100) / settings.width);
                    $('#numbers').val(percent + '%');
                }
                else{
                    $('#numbers').val(coord);
                }
            }
        };
        if ( settings.widget == 'buttons'){
            var draw = SVG('buttons');
            var up = draw.polygon('50,0 100,50 0,50').fill(settings.fillColor);
            var down = draw.polygon('100,60 50,110 0,60').fill(settings.fillColor);
            
            up.mouseup(function( event ){
                if (value >= settings.width){
                    value = settings.width;
                }
                else {
                    value = value + 40;
                }
                console.log(value);
                sendData(value);
                displayNum(value);
            });
            down.mouseup(function( event ){
                if (value <= 0){
                    value = 0;
                }
                else {
                    value = value - 40;
                }
                console.log(value);
                sendData(value);
                displayNum(value);
            });

        }
        
          
        var sendData = function(coord) {
            data = ((coord * 255) / settings.width);
            console.log(data);
            var requestURL = "https://api.spark.io/v1/devices/" +deviceID + "/" + func + "/";
            $.post( requestURL, {access_token: accessToken, arg: data});
        };

        return this.each( function() {
            // We'll get back to this in a moment
        });

    }

}(jQuery));
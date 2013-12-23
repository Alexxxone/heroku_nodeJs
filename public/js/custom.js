var name = 'Guest';
$(document).ready(function(){
    heighlight_menu();

    $('#change_name').on('submit', function(){
          test = $('.new_name').val();
        if(test.length >3){
            name = test;
            $('#enter_tour_name').modal('hide');
        }
        console.log(name);
        return false;
    });

    $('.close.pull-right').click(function(){
        $(this).parents('.well').fadeTo("slow" , 0.5);
    });

    var socket = io.connect(window.location.pathname);
    $('.send_message').click(function(){
        input =  $('.input_message');
        message =  input.val();
        if (message.length >=2){
            input.val('');
            socket.emit('messages', { message: message, name: name });
            append_message(message,'Me');
        }
        return false;
    });

    socket.on('new', function (data) {
        console.log('custom online');
        $('body').append('<p class="text-primary new_user_connected" style="position: absolute; top:0;left:40%;">'+data.message+'</p>');

        $( ".new_user_connected" ).animate({
            top: '+=160px'
        }, {
            duration: 600,
            specialEasing: {
                width: "linear"
            },
            complete: function() {
              $(this).delay(600).animate({
                  opacity: 0,
                  left: '-=500px'
              }, 500,function(){
                  $(this).remove();
              } )
            }
        });
    });

    socket.on('news', function(data) {
        append_message(data.message, data.name);
        newExcitingAlerts(data.name);
    });

    $(document).on('click', '.delete_message',function(){
        $(this).parents('tr').slideToggle('fast');
    })

})


function append_message(message,sender_name){
    message_box = '<tr><td>'+sender_name+'</td><td>'+message+'</td><td><button type="button" class="close delete_message" >&times;</button></td></tr>'
    $('.message_list').append(message_box);
}

newExcitingAlerts = (function () {
    var oldTitle = document.title;
    var timeoutId;
    var blink = function() { document.title = document.title == 'New message from:'+name ? ' ' : 'New message from:'+name; };
    var clear = function() {
        clearInterval(timeoutId);
        document.title = oldTitle;
        window.onmousemove = null;
        timeoutId = null;
    };
    return function () {
        if (!timeoutId) {
            timeoutId = setInterval(blink, 500);
            window.onmousemove = clear;
        }
    };
}());

function heighlight_menu(){
   if(window.location.pathname == '/'){
     $('.menu_main_page').addClass('text-muted');
   }else if(window.location.pathname == '/friends'){
     $('.menu_friends').addClass('text-muted');
   }else if(window.location.pathname == '/messages'){
       $('.menu_messages').addClass('text-muted');
   }else if(window.location.pathname == '/messages'){
       $('.menu_settings').addClass('text-muted');
   }
}

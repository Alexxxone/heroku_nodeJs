var name = 'Guest';
$(document).ready(function(){

    $('#enter_tour_name').modal('show');

    $('.save_name').click(function(){
          test = $('.new_name').val();
        if(test.length >3){
            name = test;
            $('#enter_tour_name').modal('hide');
        }
        return false;
    });

    $('.btn').click(function(){
       $(this).toggleClass('btn-success');
    });
    $('.close.pull-right').click(function(){
        $(this).parents('.well').fadeTo("slow" , 0.5);
    });
    var socket = io.connect(window.location.pathname);
    $('.send_message').click(function(){
        message =  $('.input_message').val();
        if (message.length >=2){
            socket.emit('messages', { message: message, name: name });
            append_message(message,'Я');
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

    socket.on('news', function (data) {
        append_message(data.message, data.name)
    });


    $(document).on('click', '.delete_message',function(){
        $(this).parents('tr').slideToggle('fast');
    })

})


function append_message(message,sender_name){
    message_box = '<tr><td>'+sender_name+'</td><td>'+message+'</td><td><button type="button" class="close delete_message" >&times;</button></td></tr>'
    $('.message_list').append(message_box);
}


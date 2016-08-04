var socket = io();
var scroll = 0;

$('#form').submit(function(){
    console.log("Hallo");
    socket.emit('chat message', localStorage.getItem('player') + ': ' + $('#m').val());
    $('#m').val('');
    return false;
});
socket.on('chat message', function(msg) {
    var message = $('#messages');
    var list = document.getElementById("messages");
    message.append($('<li>').text(msg));
});
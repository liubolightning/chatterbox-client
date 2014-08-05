var app = {};
app.server = "https://api.parse.com/1/classes/chatterbox";
app.displayLength = 10;
app.friends = [];

app.init = function(){};

app.fetch = function(){
  $.ajax({
    url: app.server,
    type: 'GET',
    data: 'order=-createdAt',
    contentType: 'application/json',
    success: function(data){
      console.log(data); // not necessary
      app.clearMessages();
      for (var i = 0; i < 10; i++) {
        app.addMessage(data.results[i]);
      }
    },
    error: function(){
      console.log("Error happened during fetch.");
    }
  });
};

app.addMessage = function(message) {
  // console.log(_);
  $("#chats").append('<li>'
                      + '<a href="#" class="username">'
                      + _.escape(message.username)
                      + '</a>'
                      +": "
                      + '<span>'
                      + _.escape(message.text)
                      + '</span>'
                      +'</li>');
}

app.clearMessages = function() {
  $("#chats").empty();
}

app.send = function(message) {
  $.ajax({
    url: app.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function() {
      console.log('Chatterbox: message sent!');
    },
    error: function() {
      console.log('Chatterbox: failed to send message.');
    }
  })
}

app.addRoom = function(room) {
  $("#roomSelect").append('<li>'+ _.escape(room) +'</li>');
}

app.addFriend = function(username) {
  if (app.friends.indexOf(username) === -1) {
    app.friends.push(username);
  }
}

app.handleSubmit = function() {
  console.log("me-ow");
  var message = {};
  message.username = $(location).attr("href").split("=")[1]; // may need to change this
  message.text = $('input').val();
  message.roomname = '';

  app.send(message);
  $('input').val('');
}

$(document).ready(function(){
  app.fetch();
  setInterval(function(){
    app.fetch();
  }, 1000);

  // keeps the send button disabled until text is added
  // $('button').attr('disabled', 'disabled');
  // $('input').keyup(function() {
  //   if ($(this).val() != '') {
  //     $('button').removeAttr('disabled');
  //   }
  // });

  // button functionality
  $('#send .submit').submit(function(event) {
    app.handleSubmit();
    event.preventDefault();
  });

  // friend functionality
  $('#chats').on('click', 'a', function() {
    app.addFriend($(this).text());
  });
});

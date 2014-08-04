var app = {};
app.server = "https://api.parse.com/1/classes/chatterbox";

app.init = function(){};

app.fetch = function(){
  $.ajax({
    url: app.server,
    type: 'GET',
    order: 'createdAt',
    contentType: 'application/json',
    success: function(data){
      console.log(data); // not necessary
      app.clearMessages();
      app.display(data);
    },
    error: function(){
      console.log("Error happened during fetch.");
    }
  });
};

app.display = function(data){
  for (var i = 0; i < 10; i++) {
    $("#chats").append('<li>'
    + _.escape(data.results[i].username)
    + ": " + _.escape(data.results[i].text)
    +  '</li>');
  }
};

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


// app.send = function(message) {
//   $.post(app.server,
//     JSON.stringify(message));
// };

// button functionality
// $('button').click(function() {
//   var message = {};
//   message.username = Chat[_username]; // may need to change this
//   message.text = $('input').val();
//   message.roomname = ''; // not sure about this

//   app.send(message);
// });



$(document).ready(function(){
  setInterval(function(){
    app.fetch();
  }, 3000);
});

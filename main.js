//http://157.230.17.132:3002/todos
var wrapper = $('.wrapper');

var modifica = $('#modifica');
var aggiorna = $('#inserisci');
var btn = $('#btn');

$(document).ready(function(){

  getData();

  $(document).on('click', '.delete', function(){
    var id = $(this).attr('data-id');
    $.ajax({
      url: 'http://157.230.17.132:3002/todos' + '/' + id,
      method: 'DELETE',
      success: function(data){
        getData();
      },
      error: function() {
        alert('errore')
      }
    });

  });

  btn.click(function(){
    var newList = aggiorna.val();
    var id = modifica.val();

    $.ajax({
      url: 'http://157.230.17.132:3002/todos' + '/' + id,
      method: 'PUT',
      data: {
        text: newList,
      },
      success: function(data){
        getData();
      },
      error: function() {
        alert('errore')
      }
    });
  });

});


function printData(data){
  wrapper.html('<ul>')
  modifica.html('')
  for (var i = 0; i < data.length; i++) {
    wrapper.children('ul').append('<li><span class="delete" data-id="' + data[i].id + '">X </span>' + data[i].text + '</li>');
    modifica.append('<option value="' + data[i].id + '">' + data[i].text + '</option>')
  }
  wrapper.append('</ul>')
}

function getData(){
  $.ajax({
    url: 'http://157.230.17.132:3002/todos',
    method: 'GET',
    success: function(data){
      console.log(data);
      printData(data);
    },
    error: function() {
      alert('errore')
    }
  });
}

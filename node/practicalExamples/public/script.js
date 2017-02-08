let indicesArray = []
$.get( "/api/read", function( data ) {
  
  let result = '';
  for(let iter = 0; iter < data.length; iter++) {
    result += `<li>${data[iter].description} </li>`
    indicesArray.push(data[iter].id)
  }
  $( "#result" ).html( (result) );
  $.each(data, function (i, item) {
    $('#indices').append($('<option>', { 
        value: i,
        text : i
    }));
    });
});

$("#button").click(function(){
    let task = $('#task').val();
    $.post(`/api/write/${task}`, task, function(data, status){
        console.log("Data: " + data + "\nStatus: " + status);
    });
});

$("#deleteButton").click(function(){
    let index = $('#indices').val();
    $.ajax({
    url: `/api/delete/${indicesArray[index]}`,
    type: 'DELETE',
    success: console.log(index)
  });
});
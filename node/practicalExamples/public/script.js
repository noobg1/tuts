let indicesArray = []

function update(newTaskObject){
    console.log(newTaskObject.name)
    let status = newTaskObject.name === "true" ? false : true;
    $.ajax({
        url: `/api/update/${newTaskObject.id}`,
        type: 'PUT',
        data: `task=${newTaskObject.value}&status=${status}`,
        success: read
    });
    
}

function updateStatus(oldStatus, id){
    console.log(oldStatus)
    let status = oldStatus === true ? false : true;
    $.ajax({
        url: `/api/update/${id}`,
        type: 'PUT',
        data: `status=${status}`,
        success: read
    });
    
}

function read() {
    $.get( "/api/read", function( data ) {
    let result = '';

    //populate list items
    for(let iter = 0; iter < data.length; iter++) {
        let remove = `<span class="glyphicon glyphicon-remove" onclick="deleteTask(${data[iter].id})"></span>`;
        let statusFlag = `<span class="glyphicon glyphicon-remove" onclick="deleteTask(${data[iter].status})"></span>`;
        let updateButtonCallback = `onclick="updateStatus(${data[iter].status}, ${data[iter].id})" `
        let statusFlagHtml = data[iter].status === false ? `<span ${updateButtonCallback}> &#9711; </span>` : `<span ${updateButtonCallback}> &#9673; </span>`;
        let done = `<span class="glyphicon glyphicon-ok"></span>`

        result += ` <li id="${data[iter].id}"> ${statusFlagHtml}
        <input type="text" id="${data[iter].id}" name="${data[iter].status}" value="${data[iter].description} " readonly="true" ondblclick="this.readOnly=''; " onfocusout="update(this);" >  ${remove} </li>`
        
        
        indicesArray.push(data[iter].id)
    }
    //populate dropdown
    $( "#result" ).html( (result) );
    $.each(data, function (i, item) {
        $('#indices,#deleteIndices').append($('<option>', { 
            value: i,
            text : i
        }));
        });
    });
}

function deleteTask (id){
    $.ajax({
    url: `/api/delete/${id}`,
    type: 'DELETE',
    success: console.log(id)
  });
  read()
}

$("#writeButton").click(function(){
    let task = $('#task').val();
    $.post(`/api/write/${task}`, task, function(data, status){
        console.log("Data: " + data + "\nStatus: " + status);
    });
    read()
});

read()
// $("#deleteButton").click(function(){
//     let index = $('#indices').val();
//     $.ajax({
//     url: `/api/delete/${indicesArray[index]}`,
//     type: 'DELETE',
//     success: console.log(index)
//   });
// });

// $("#updateButton").click(function(){
//     let index = $('#deleteIndices').val();
//     let task = $('#updateTask').val();
//     console.log(index, task)
//     $.ajax({
//     url: `/api/update/${indicesArray[index]}`,
//     type: 'PUT',
//     data: `task=${task}`,
//     success: console.log(index)
//     });
//   console.log(index, task)
// });

// read()

// document.getElementById("myBtn").addEventListener("click", function(){
//     document.getElementById("demo").innerHTML = "Hello World";
// });
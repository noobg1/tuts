let indicesArray = []

function deleteTask (id){
    $.ajax({
    url: `/api/delete/${id}`,
    type: 'DELETE',
    success: read
  });
}

function update(newTaskObject){
    $.ajax({
        url: `/api/update/${newTaskObject.id}`,
        type: 'PUT',
        data: `task=${newTaskObject.value}`
    });
    
}

function updateStatus(id, oldStatus){
    console.log(oldStatus)
    const status = oldStatus === true ? false : true;
    console.log(status);
    $.ajax({
        url: `/api/update/${id}`,
        type: 'PUT',
        data: `status=${status}`
    });
    
}

function read() {
    $.get( "/api/read", function( data ) {
    let result = '';

    //populate list items
    for(let iter = 0; iter < data.length; iter++) {
        const remove = `<span class="glyphicon glyphicon-remove" onclick="deleteTask(${data[iter].id})"></span>`;
        const statusFlag = `<span class="glyphicon glyphicon-remove" onclick="deleteTask(${data[iter].status})"></span>`;
        const statusCheckBox = `<input onclick="updateStatus(this.id,${data[iter].status})" id = "${data[iter].id}" type="checkbox" ${data[iter].status === true ? "checked" : ''}> `

        result += ` <li id="${data[iter].id}"> ${statusCheckBox}
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


$("#writeButton").click(function(){
    const task = $('#task').val();
    $.post(`/api/write/${task}`, task, function(data, status){
        return data;
    }).done(function(data) {
        const remove = `<span class="glyphicon glyphicon-remove" onclick="deleteTask(${data.id})"></span>`;
        const statusCheckBox = `<input onclick="updateStatus(this.id,${false})" id = "${data.id}" type="checkbox" > `;

        $("#result").append(`<li id="${data.id}"> ${statusCheckBox}
        <input type="text" id="${data.id}" name="${false}" value="${task} " readonly="true" ondblclick="this.readOnly=''; " onfocusout="update(this);" >  ${remove} </li>`);

  });
    //read()
});

read()

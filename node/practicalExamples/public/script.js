let indicesArray = []

function deleteTask (id) {
    $.ajax({
    url: `/api/delete/${id}`,
    type: 'DELETE',
    success: read
  });
}

function update(newTaskObject) {
    $.ajax({
        url: `/api/update/${newTaskObject.id.split('-')[0]}`,
        type: 'PUT',
        data: `task=${newTaskObject.value}`
    });
    
}

function strikeThrough(id, oldStatus) {
    let status;
    const queryId = id.split('-')[0];
    const textboxId = queryId + '-text';
    const checkId = queryId + '-check';
    const textElement = document.getElementById(textboxId);
    const checkElement = document.getElementById(checkId);
    if (checkElement.checked) {
        textElement.style.textDecoration = "line-through";
        status = true
    } else {
        textElement.style.textDecoration = "none";
        status = false
    }

    return status;
}

function updateStatus(id, oldStatus) {
    const status = strikeThrough(id, oldStatus);
  $.ajax({
    data: `status=${status}`,
    url: `/api/update/${id.split('-')[0]}`,
    type: 'PUT',
  })
}

function read() {
    $.get( "/api/read", function( data ) {
    let result = '';

    //populate list items
    for(let iter = 0; iter < data.length; iter++) {
        const remove = `<button class="destroy" onclick="deleteTask(${data[iter].id})">X</button>`
        const statusCheckBox = `<input class="toggle" onclick="updateStatus(this.id,${data[iter].status})" id = "${data[iter].id}-check" type="checkbox" ${data[iter].status === true ? "checked" : ''}> </input>`

        const strike = `${data[iter].status}` === "true" ? `style="text-decoration: line-through;"` : `style="text-decoration: none;"`;

        // result += `  <li id="${data[iter].id}"> <div class="view">                              ${statusCheckBox}
        //                 <label class="editTextbox" type="text" id="${data[iter].id}-text" name="${data[iter].status}" value="${data[iter].description} " readonly="true" ondblclick="this.readOnly=''; " onfocusout="update(this);" ${strike}>  ${data[iter].description} </label>
        //                 ${remove}
        //                 </div>
        //             </li> `;
        result += `  <li id="${data[iter].id}"> <div class="view">                              ${statusCheckBox}
                        <label  type="text" for="${data[iter].id}-text" name="${data[iter].status}" value="${data[iter].description} " ${strike}>  ${data[iter].description} </label>
                        <input class="editTextbox" type="text" name="editableText">
                        ${remove}
                        </div>
                    </li> `
      
        
        
        indicesArray.push(data[iter].id)
    }
    //populate dropdown
    
    $( "#list" ).html( (result) );
    $('.editTextbox').hide()
    $.each(data, function (i, item) {
        $('#indices,#deleteIndices').append($('<option>', { 
            value: i,
            text : i
        }));
        });
    });
}


$("#writeForm").submit(function(e){
    e.preventDefault();
    const task = $('#task').val();
    $.post(`/api/write/${task}`, task, function(data, status){
        return data;
    }).done(function(data) {
        const remove = `<span class="glyphicon glyphicon-remove" onclick="deleteTask(${data.id})"></span>`;
        const statusCheckBox = `<input onclick="updateStatus(this.id,${false})" id = "${data.id}" type="checkbox" > `;

        $("#result").append(`<li id="${data.id}"> ${statusCheckBox}
        <input type="text" id="${data.id}" name="${false}" value="${task} " readonly="true" ondblclick="this.readOnly=''; " onfocusout="update(this);" >  ${remove} </li>`);

        $('#task').val('');
        //e.preventDefault();

  });
    //read()
});


$('li').click(function () {
  console.log("iuguiyguy")
    const value = $(this).find('label').hide().text()
    $(this).find('.editTextbox').show().focus().val(value)
  })

$('.editTextbox').focusout(function () {
    console.log('edit')
    const value = $(this).hide().val()
    $(this).prev().html($(this).val()).show()
    //updateDescription($(this).closest('li').attr('id'), value)
  })

//  $(document).on("click", "#list", function (e) {
//         const id = e.target.id;
//         console.log(e.target.id);
//         const txt = $(`#${e.target.id}`).text();
//         $(`#${e.target.id}`).replaceWith(`<input class="editTextbox" id="${id} > </input>`);
//         $(`#${e.target.id}`).val(txt);
//     });

//     $(document).on("blur", "#list", function (e) {
//       console.log("igyugyu");
//         var txt = $(e.target).val();
//         console.log(txt);
//         $(`#${e.target.id}`).replaceWith(`<label class="editTextbox" type="text" id="${e.target.id}-text"  ></label>`);
//         $(`#${e.target.id}`).text(txt);
//     });



read()

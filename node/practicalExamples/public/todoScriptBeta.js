const entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
}

let elementsArray = [];
let activeList = {}, completedList = {};
let active, completed;let dataObject;
const escapeHtml = (string) => String(string).replace(/[&<>"'`=\/]/g, s => entityMap[s])

function filterList () {
  const url = location.hash
  $('.filters a').prop('class', '')
  switch (url) {
    case '#/': $('a[href$="#/"').attr('class', 'selected')
      $('.new-todo li').show()
      break
    case '#/active': $('a[href$="#/active"]').attr('class', 'selected')
      $('.new-todo .active').show()
      $('.new-todo .completed').hide()
      break
    case '#/completed': $('a[href$="#/completed" ]').attr('class', 'selected')
      $('.new-todo .active').hide()
      $('.new-todo .completed').show()
      break
  }
}

function addItem () {
  const content = $('#id-new-todo').val()
  $.post(`/api/write/${escapeHtml(content)}`, function (data) {
    $(`#id-todo-list`).append(`
       <li id="${data.id}">
       <div class="view">
          <input class ="checkbox toggle" type="checkbox" name="checkbox" id="ckb-${data.id}" >
          <label id="label-${data.id}" for="ckb-${data.id}">${content}</label>
          <input id="tb-${data.id}" class="edit" type="text" name="editableText" style="display:none">
          <button id="btn-${data.id}" class="destroy"></button>
        </div>
        </li>`);
        afterRead(data.id);
        elementsArray.push(data);
        populateFooter();
        //console.log(data.id);
  }).done(function() {
    
  })
  $('#id-new-todo').val('')
  
}

function findItemIndex (id, list) {
  var indexOfElement = -1;
  
  for (let iter = 0; iter < list.length; iter++) {
    if (Number(list[iter].id) === Number(id)) {
      indexOfElement = iter;
      break;
      }
  }
  return indexOfElement;
}

function updateStatus (id, status) {
  $.ajax({
    url: `/api/update/${id}`,
    type: 'PUT',
    data: `status=${status}`,
    success: (result) => (result)
  });

}

function updateDescription (id, description) {
  $.ajax({
    url: `/api/update/${id}`,
    type: 'PUT',
    data: `task=${escapeHtml(description)}`,
    success: (result) => (result)
  })
}

function deleteItem (id) {
  $.ajax({
    url: `/api/delete/${id}`,
    type: 'DELETE',
    success: (result) => (
      $(`li#${id}`).remove())
  });
  // let index = findItemIndex(id, elementsArray);
  // let elem = elementsArray.slice(index, 1);
  // console.log(elementsArray, "eres")
  // populate(elementsArray);
  // populateFooter()
}


$('#id-new-todo').keyup(function (event) {
  if (event.keyCode === 13) {
    addItem()
  }
});

function afterRead (id) {
    $(`#btn-${id}`).click(function () {
      deleteItem(id);
      })

    $(`#ckb-${id}`).change(function () {
      $(`#ckb-${id}`).toggleClass("completed");
      $(`#ckb-${id}`).is(":checked") ? updateStatus(id, true) : updateStatus(id, false)
    })
    
    $(`#label-${id}`).dblclick(function () {
      const value = $(`#label-${id}`).hide().text()
      $(`#tb-${id}`).show().focus().val(value)
    })

    $(`#tb-${id}`).focusout(function () {
      const value = $(`#tb-${id}`).hide().val()
      $(`#label-${id}`).text(value).show()
      updateDescription(id, value)
  })
}



function populate (data) {
  let content = ''
  let checked;
  data.forEach(function (item) {
      let description = escapeHtml(item.description)
      checked = (item.status === true) ? 'checked' : ''
      const className = (checked === '') ? 'active' : 'completed'
       content += 
       `<li id="${item.id}" class ="${className}">
          <div class="view">
            <input class ="checkbox toggle" type="checkbox" name="checkbox" id="ckb-${item.id}" ${checked}>
            <label id="label-${item.id}" for="ckb-${item.id}">${description}</label>
            <input id="tb-${item.id}" class="edit" type="text" name="editableText" style="display:none">
            <button id="btn-${item.id}" class="destroy"></button>
          </div>
        </li>`;
    })
    $('#id-todo-list').html(content);
    assignEventListeners(data);
}


function populateFooter () {
  let numberOfItemsActive = 0;
  elementsArray.forEach(function (item) {
    if(item.status === false)
      numberOfItemsActive++;
  })
  if(numberOfItemsActive === 1)
    $('.todo-count').text(`${numberOfItemsActive} item left`)
  else 
    $('.todo-count').text(`${numberOfItemsActive} items left`)
}

function read () {
  $.get('/api/read', (data) => {
    data.forEach(function (item) {
      elementsArray[item.id] = item
    })
    populate(data);
    assignEventListeners(data);
    populateFooter();
    $('.editTextbox').hide();
  })
}

function assignEventListeners (data) {
  data.forEach(function (item) {
    afterRead(item.id);
  })
}

$('#active').click(function () {
      let activeData = [];
      elementsArray.forEach(function(item) {
        if(item.status === false)
        activeData.push(item);
      });
      $('#id-todo-list').empty();
      populate(activeData);
      assignEventListeners(activeData);
      
  });

  $('#completed').click(function () {
      let completed = [];
      elementsArray.forEach(function(item) {
        if(item.status === true)
        completed.push(item);
      });
      $('#id-todo-list').empty();
      populate(completed);
      assignEventListeners(completed);
  });

$('#all').click(function () {
  console.log(elementsArray)
  $('#id-todo-list').empty();
  populate(elementsArray);
  assignEventListeners(elementsArray);
});


$(document).ready(function () {
  read()
})
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
const escapeHtml = (string) => String(string).replace(/[&<>"'`=\/]/g, s => entityMap[s])

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
        </li>`)
        afterRead(data.id);
        //console.log(data.id);
  }).done(function() {
    
  })
  $('#id-new-todo').val('')
  
}

function updateStatus (id, status) {
  $.ajax({
    url: `/api/update/${id}`,
    type: 'PUT',
    data: `status=${status}`,
    success: (result) => (result)
  })
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
  })
}


$('#id-new-todo').keyup(function (event) {
  if (event.keyCode === 13) {
    addItem()
  }
});

function afterRead (id) {
    $(`#btn-${id}`).click(function () {
      console.log(id);
      deleteItem(id);
      })

    $(`#ckb-${id}`).change(function () {
      console.log(id);
      $(`#ckb-${id}`).toggleClass("completed");
      (this.checked) ? updateStatus($(this).closest('li').attr('id'), true) : updateStatus(id, false)
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

function read () {
  $.get('/api/read', (data) => {
    let content = ''
    let checked;
    data.forEach(function (item) {
      let description = escapeHtml(item.description)
      checked = (item.status === true) ? 'checked' : ''
      
       content += 
       `<li id="${item.id}">
          <div class="view">
            <input class ="checkbox toggle" type="checkbox" name="checkbox" id="ckb-${item.id}" }>
            <label id="label-${item.id}" for="id${item.id}">${description}</label>
            <input id="tb-${item.id}" class="edit" type="text" name="editableText" style="display:none">
            <button id="btn-${item.id}" class="destroy"></button>
          </div>
        </li>`;
    })
    content += ''
    $('#id-todo-list').html(content)
    data.forEach(function (item){
      afterRead(item.id);
    })
    $('.editTextbox').hide();
    
  })
}

$(document).ready(function () {
  read()
})
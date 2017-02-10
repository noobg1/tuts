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
          <input class ="checkbox toggle" type="checkbox" name="checkbox" id="id${data.id}" >
          <label for="id${data.id}">${content}</label>
          <input class="editTextbox" type="text" name="editableText" style="display:none">
          <button id="button-${data.id}" class="destroy"></button>
        </div>
        </li>`)
        afterRead(data.id);
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
  //afterRead(id);
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
  //afterRead(id);
}

const keyEnter = function (event) {
  if (event.keyCode === 13) {
    addItem()
  }
}

const destroy = function (id) {
  console.trace()
  $(`${id}`).remove()
  deleteItem($(this).closest('li').attr('id'))
}
const checkboxChange = function () {
  $(this).siblings('label').toggleClass("completed");
  (this.checked) ? updateStatus($(this).closest('li').attr('id'), true) : updateStatus($(this).closest('li').attr('id'), false)
}

const editTask = function () {
  // $(this).addClass("editing");
  // console.log($(this).hasClass("editing"))
  const value = $(this).children('div').children('label').hide().text();
  $(this).children('div').children('.editTextbox').show().val(value).focus();
}

const afterEditTask = function () {
  console.log('edit');
  //console.log($(this).parent('div').parent('li').removeClass("editing"));
  console.log($(this).hasClass("editing"))
  const value = $(this).hide().val()
  $(this).siblings('label').text(value).show()
  updateDescription($(this).closest('li').attr('id'), value)
}

$('#id-new-todo').keyup(keyEnter);

function afterRead (id) {
  
  console.log("id", id)
  console.log($(`#${id}`).children('div').children(`.destroy`).attr('id'))

  $(`#${id}`).children('div').children(`.checkbox`).change(checkboxChange)
  
  $(`#${id}`).children('div').children(`li`).dblclick(editTask)

  $(`#${id}`).children('div').children(`.editTextbox`).blur(afterEditTask)
}

function read () {
  $.get('/api/read', (data) => {
    let content = ''
    let checked;
    data.forEach(function (item) {
      let description = escapeHtml(item.description)
      checked = (item.status === true) ? 'checked' : ''
      content += `
        <li id="${item.id}" >
          <div class="view">
            <input class ="checkbox toggle" type="checkbox" name="checkbox" id="id${item.id}" ${checked}>
            <label for="id${item.id}">${description}</label>
            <input class="editTextbox" type="text" name="editableText">
            <button class="destroy"></button>
          </div>
        </li>`
        afterRead(item.id)
    })
    content += ''
    $('#id-todo-list').html(content)
    $('.editTextbox').hide()
    
  })
}

$(document).ready(function () {
  read()
})
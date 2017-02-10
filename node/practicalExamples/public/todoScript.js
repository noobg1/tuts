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
       <li id="${data}">
       <div class="view">
          <input class ="checkbox toggle" type="checkbox" name="checkbox" id="id${data}" >
          <label for="id${data}">${content}</label>
          <input class="editTextbox" type="text" name="editableText" style="display:none">
          <button class="destroy"></button>
        </div>
        </li>`)
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

function afterRead () {
  $('#id-new-todo').keyup(function (event) {
    if (event.keyCode === 13) {
      addItem()
    }
  })
  /*$('#write_button').click(() => addItem())*/

  $('.destroy').click(function () {
    deleteItem($(this).closest('li').attr('id'))
  })

  $('.checkbox').change(function () {
    (this.checked) ? updateStatus($(this).closest('li').attr('id'), true) : updateStatus($(this).closest('li').attr('id'), false)
  })

  $('li').dblclick(function () {
    // $(this).addClass("editing");
    // console.log($(this).hasClass("editing"))
    const value = $(this).children('div').children('label').hide().text();
    $(this).children('div').children('.editTextbox').show().val(value).focus();
  })

  $('.editTextbox').blur(function () {
    console.log('edit')
    //console.log($(this).parent('div').parent('li').removeClass("editing"));
    console.log($(this).hasClass("editing"))
    const value = $(this).hide().val()
    $(this).siblings('label').text(value).show()
    updateDescription($(this).closest('li').attr('id'), value)
  })
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
    })
    content += ''
    $('#id-todo-list').html(content)
    $('.editTextbox').hide()
    afterRead()
  })
}

$(document).ready(function () {
  read()
})
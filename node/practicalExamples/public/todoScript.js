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

let elementsArray = []

const escapeHtml = (string) => String(string).replace(/[&<>"'`=\/]/g, s => entityMap[s])

function filterList () {
  const url = location.hash
  $('.filters a').prop('class', '')
  switch (url) {
    case '#/': $('a[href$="#/"').attr('class', 'selected')
      $('.todo-list li').show()
      break
    case '#/active': $('a[href$="#/active"]').attr('class', 'selected')
      $('.todo-list .active').show()
      $('.todo-list .completed').hide()
      break
    case '#/completed': $('a[href$="#/completed" ]').attr('class', 'selected')
      $('.todo-list .active').hide()
      $('.todo-list .completed').show()
      break
  }
}

// function render (data) {

// }

function read (callback = () => {}) {
  let dataObject
  $.get('/api/read', (data) => {
    data.forEach(function (item) {
      elementsArray[item.id] = item
    })
    populate(data)
    assignEventListeners(data)
    hideFooter()
    populateFooter()
    $('.edit').hide()
    dataObject = data
  }).done(function () {
    callback(null, dataObject, `Todo items loaded`)
  }).fail(function () {
    callback('Failed to load todo items', null)
  })
}

function addItem (content, callback = () => {}) {
  let id
  console.log(escapeHtml(content))
  $.post(`/api/write/${escapeHtml(content)}`, function (data) {
    elementsArray[data.id] = {id: data.id, description: escapeHtml(content), status: false}
    populate(elementsArray)
    $('ul').children().off()
    assignEventListeners(elementsArray)
    hideFooter()
    populateFooter()
    id = data.id
  }).done(function () {
    callback(null, `Todo item added`)
  }).fail(function () {
    callback(`Cannot add item`, null)
  })
  $('#id-new-todo').val('')
}

function updateStatus (id, status, callback = () => {}) {
  $.ajax({
    url: `/api/update/${id}`,
    type: 'PUT',
    data: `status=${status}`,
    error: () => { callback(`Failed to update item for given id`, null) },
    success: (result) => {
      elementsArray[id].status = status
      populate(elementsArray)
      $('ul').children().off()
      assignEventListeners(elementsArray)
      hideFooter()
      populateFooter()
      callback(null, result)
    }
  })
}

function updateDescription (id, description, callback = () => {}) {
  $.ajax({
    url: `/api/update/${id}`,
    type: 'PUT',
    data: `task=${escapeHtml(description)}`,
    error: () => { callback(`Failed to update item for given id`, null) },
    success: (result) => {
      elementsArray[id].description = description
      populate(elementsArray)
      $('ul').children().off()
      assignEventListeners(elementsArray)
      hideFooter()
      populateFooter()
      callback(null, result)
    }
  })
}

function hideFooter () {
  if (Object.keys(elementsArray).length === 0) {
    $('.footer').hide()
    $('.toggle-all').hide()
  } else {
    $('.footer').show()
    $('.toggle-all').show()
  }
}

function deleteItem (id, callback = () => {}) {
  $.ajax({
    url: `/api/delete/${id}`,
    type: 'DELETE',
    error: () => { callback(`Failed to delete item for given id`, null) },
    success: (result) => {
      $(`li#${id}`).remove()
      delete elementsArray[id]
      populate(elementsArray)
      $('ul').children().off()
      assignEventListeners(elementsArray)
      hideFooter()
      populateFooter()
      console.log(result)
      callback(null, result)
    }
  })
}

$('#id-new-todo').keyup(function (event) {
  if (event.keyCode === 13) {
    const content = $('#id-new-todo').val()
    addItem(content)
  }
})

function afterRead (id) {
  $(`#btn-${id}`).click(function () {
    deleteItem(id)
  })

  $(`#ckb-${id}`).change(function () {
    $(`#ckb-${id}`).toggleClass('completed')
    $(`#ckb-${id}`).is(':checked') ? updateStatus(id, true) : updateStatus(id, false)

  })

  $(`#label-${id}`).dblclick(function () {
    console.log('dbclick', id)
    const value = $(`#label-${id}`).hide().text()
    $(`#tb-${id}`).show().focus().val(value)
  })

  $(`#tb-${id}`).focusout(function () {
    console.log('focusout')
    const value = $(`#tb-${id}`).hide().val()

    $(`#label-${id}`).text(value).show()
    console.log(value)
    if (value === '')
    { 
      deleteItem(id) 
    }
    else updateDescription(id, value)
  })

  $(`#tb-${id}`).keyup(function (event) {
    if (event.which === 13) {
        $(`#tb-${id}`).focusout()
      }
  })
}

function populate (data) {
  let content = ''
  let checked
  let description
  data.forEach(function (item) {
    description = escapeHtml(item.description)
    checked = (item.status === true) ? 'checked' : ''
    const className = (checked === '') ? 'active' : 'completed'
    content +=
       `<li id="${item.id}" class ="${className} ">
          <div class="view">
            <input class ="checkbox toggle" type="checkbox" name="checkbox" id="ckb-${item.id}" ${checked}>
            <label id="label-${item.id}" >${description}</label>
            <input id="tb-${item.id}" class="edit" type="text" name="editableText" style="display:none">
            <button id="btn-${item.id}" class="destroy"></button>
          </div>
        </li>`
  })
  $('#id-todo-list').html(content)
  filterList()
}

function toggleAll () {
  let numberOfItemsActive = 0, numberOfItemsCompleted = 0
  elementsArray.forEach(function (item) {
    if (item.status === false) {
      numberOfItemsActive++
    }
    if (item.status === true) {
      numberOfItemsCompleted++
    }
  })
  console.log(numberOfItemsActive, elementsArray.length)
  if (numberOfItemsActive === 0) {
     $('.toggle-all').prop('checked', true)
  } else if (numberOfItemsActive === numberOfItemsCompleted){
     $('.toggle-all').prop('checked', false)
  }
}

function populateFooter () {
  let numberOfItemsActive = 0
  elementsArray.forEach(function (item) {
    if (item.status === false) {
       numberOfItemsActive++
    }
  })

  if (numberOfItemsActive === 1)    {
    $('.todo-count').text(`${numberOfItemsActive} item left`)
  } else if (numberOfItemsActive === 0) {
    $('.todo-count').text(`${numberOfItemsActive} items left`)
  } else {
    $('.todo-count').text(`${numberOfItemsActive} items left`)
  }
}

function assignEventListeners (data) {
  data.forEach(function (item) {
    afterRead(item.id)
  })
}

$('#clear-completed-id').click(function () {
  elementsArray.forEach(function (item) {
    if (item.status === true) {
      deleteItem(item.id)
    }
  })
})

function changeAllStatus (status) {
  elementsArray.forEach(function (item) {
    updateStatus(item.id, !status)
  })
  populateFooter()
}

$('.toggle-all').change(function () {
  const status = this.checked
  const toggle = (status) ? 'check' : 'uncheck'
  $('.toggle').prop('checked', status)
  changeAllStatus(status)
})

$(window).on('hashchange', () => filterList())

$(document).ready(function () {
  read()
})

$(`#test`).dblclick(function () {
  console.log('dbclick')
  const value = $(`#test`).hide().text()
  $(`#test-in`).show().focus().val(value)
})

$(`#test-in`).focusout(function () {
  console.log('uiguigui')
  const value = $(`#test-in`).hide().val()
  $(`#test`).text(value).show()
})

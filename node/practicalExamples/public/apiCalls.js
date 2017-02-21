function updateStatus (id, status, callback = () => {}) {
  $.ajax({
    url: `/api/update/${id}`,
    type: 'PUT',
    data: `status=${status}`,
    error: () => { callback(`Failed to update item for given id`, null) },
    success: (result) => {
      elementsArray[id].status = status
      render()
      callback(null, result)
    }
  })
}

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
  let id, dataResponse
  //console.log(escapeHtml(content))
  $.post(`/api/write/${escapeHtml(content)}`, function (data) {
    dataResponse = data
  }).done(function () {
    elementsArray[dataResponse.id] = {id: dataResponse.id, description: escapeHtml(content), status: false}
    render()
    id = dataResponse.id
    callback(null, `Todo item added`)
  }).fail(function () {
    callback(`Cannot add item`, null)
    //alert('Maybe you are disconnected')
  })
  $('#id-new-todo').val('')
}



function updateDescription (id, description, callback = () => {}) {
  $.ajax({
    url: `/api/update/${id}`,
    type: 'PUT',
    data: `task=${escapeHtml(description)}`,
    error: () => { callback(`Failed to update item for given id`, null) },
    success: (result) => {
      elementsArray[id].description = description
      render()
      callback(null, result)
    }
  })
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

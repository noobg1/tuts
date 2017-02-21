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

function render () {
  populate(elementsArray)
  $('ul').children().off()
  assignEventListeners(elementsArray)
  hideFooter()
  populateFooter()
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
    $(`#btn-${id}`).hide()
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

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

const escapeHtml = (string) => String(string).replace(/[&<>"'`=\/]/g, s => entityMap[s])

function filterList () {
  const url = location.hash;
  $('.filters a').prop('class', '');
  switch (url) {
    case '#/': $('a[href$="#/"').attr('class', 'selected');
      $('.todo-list li').show();
      break
    case '#/active': $('a[href$="#/active"]').attr('class', 'selected');
      $('.todo-list .active').show();
      $('.todo-list .completed').hide();
      break
    case '#/completed': $('a[href$="#/completed" ]').attr('class', 'selected');
      $('.todo-list .active').hide();
      $('.todo-list .completed').show();
      break
  }
}

function addItem () {
  const content = $('#id-new-todo').val()
  $.post(`/api/write/${escapeHtml(content)}`, function (data) {
    elementsArray[data.id] = {id: data.id, description: content, status: false};
    console.log(elementsArray[data.id]);
    populate(elementsArray)
    $("ul").children().off();
    assignEventListeners(elementsArray);
    hideFooter();
    populateFooter();
  }).done(function() {
  })
  $('#id-new-todo').val('')
}

function updateStatus (id, status) {
  $.ajax({
    url: `/api/update/${id}`,
    type: 'PUT',
    data: `status=${status}`,
    success:  (result) => {
      elementsArray[id].status = status;
      populate(elementsArray)
      $("ul").children().off();
      assignEventListeners(elementsArray);
      hideFooter();
      populateFooter();
    }
  });
}

function updateDescription (id, description) {
  $.ajax({
    url: `/api/update/${id}`,
    type: 'PUT',
    data: `task=${escapeHtml(description)}`,
    success: (result) => {
      elementsArray[id].description = description;
      populate(elementsArray);
      $("ul").children().off();
      assignEventListeners(elementsArray);
      hideFooter();
      populateFooter();
    }
  })
}

function hideFooter () {
  // console.log('hideWhenNoList')
  if (Object.keys(elementsArray).length === 0) {
    $('.footer').hide()
    $('.toggle-all').hide()
  } else {
    $('.footer').show()
    $('.toggle-all').show()
  }
}


function deleteItem (id) {
  $.ajax({
    url: `/api/delete/${id}`,
    type: 'DELETE',
    success: (result) => {
      $(`li#${id}`).remove()
      delete elementsArray[id];
      populate(elementsArray);
      $("ul").children().off();
      assignEventListeners(elementsArray);
      hideFooter();
      populateFooter();
    }
  });
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
      console.log('dbclick', id);
      //$(`#${id}`).addClass('editing');
      const value = $(`#label-${id}`).hide().text()
      $(`#tb-${id}`).show().focus().val(value)
    });

    $(`#tb-${id}`).focusout(function () {
      console.log("uiguigui")
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
       `<li id="${item.id}" class ="${className} ">
          <div class="view">
            <input class ="checkbox toggle" type="checkbox" name="checkbox" id="ckb-${item.id}" ${checked}>
            <label id="label-${item.id}" for="ckb-${item.id}">${description}</label>
            <input id="tb-${item.id}" class="edit" type="text" name="editableText" style="display:none">
            <button id="btn-${item.id}" class="destroy"></button>
          </div>
        </li>`;
    })
    $('#id-todo-list').html(content);
}


function populateFooter () {
  let numberOfItemsActive = 0;
  elementsArray.forEach(function (item) {
    if (item.status === false)
      numberOfItemsActive++;
  });

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
    hideFooter();
    populateFooter();
    $('.edit').hide();
  })
}

function assignEventListeners (data) {
  data.forEach(function (item) {
    afterRead(item.id);
  })
}

$('#clear-completed-id').click(function () {
  elementsArray.forEach(function (item) {
    if (item.status === true) {
      deleteItem(item.id);
    }
  });
});

function changeAllStatus (status) {
  elementsArray.forEach(function (item) {
   updateStatus(item.id, !item.status);
  })
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
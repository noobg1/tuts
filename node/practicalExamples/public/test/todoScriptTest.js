let expect = chai.expect
let dataObjectArray

describe('addItem function ', function () {
  it('should add new todo item to database', function (done) {
    addItem('test todo 1', function (error, data) {
      expect(data).to.equal(`Todo item added`)
      done()
    })
  })

  it('should return error message on empty input', function (done) {
    addItem('', function (error, data) {
      expect(error).to.equal(`Cannot add item`)
      done()
    })
  })
})

describe('read function ', function () {
  it('should return items from db', function (done) {
    read(function (error, data, msg) {
      dataObjectArray = data
      expect(msg).to.equal(`Todo items loaded`)
      done()
    })
  })
})

describe('updateStatus function ', function () {
  it('should return updated item id ', function (done) {
    updateStatus(dataObjectArray[0].id, false, function (error, data) {
      console.log(error, data)
      console.log(dataObjectArray[0].id, !dataObjectArray[0].status)
      expect(data).to.equal(`{ Updated task for given id = ${dataObjectArray[0].id} }`)
      done()
    })
  })
  it('should return error message on empty input', function (done) {
    updateStatus(123456, false, function (error, data) {
        // dataObjectArray = data;
        // console.log(data);
      expect(error).to.equal(`Failed to update item for given id`)
      done()
    })
  })
})

describe('updateDescription function ', function () {
  it('should return updated item id', function (done) {
    updateDescription(dataObjectArray[0].id, 'update something', function (error, data) {
      expect(data).to.equal(`{ Updated task for given id = ${dataObjectArray[0].id} }`)
      done()
    })
  })
  it('should return error message on invalid input id', function (done) {
    updateDescription(123456, false, function (error, data) {
       expect(error).to.equal(`Failed to update item for given id`)
       done()
     })
  })
})

describe('delete function ', function () {
  it('should return deleted item id', function (done) {
    deleteItem(dataObjectArray[0].id, function (error, data) {
      expect(data).to.equal(`{ Deleted task id = ${dataObjectArray[0].id}}`)
      done()
    })
  })
  it('should return error message on invalid input id', function (done) {
    deleteItem(123456, function (error, data) {
       expect(error).to.equal(`Failed to delete item for given id`)
       done()
     })
  })
})

describe('Escape Special characters', function () {
  it('should return eascaped string when a string with special character is passed', function () {
    const scriptString = '<script></script>'
    expect(escapeHtml(scriptString)).to.equal('&lt;script&gt;&lt;&#x2F;script&gt;')
  })
  it('2 should be greater than 1', function () {
    expect(2).to.be.greaterThan(1)
  })
})


const connectionObject = require('./connectDb')

function read () {
  return connectionObject.query('SELECT ID, DESCRIPTION, STATUS FROM tasks order by ID ASC;')
}

function insert (description) {
  return connectionObject.query('INSERT INTO tasks (DESCRIPTION, STATUS) VALUES ( ?, FALSE) RETURNING id;', { replacements: [description] })
}

function update (description, id, status = false) {
  if (!description) {
    return connectionObject.query('UPDATE tasks SET STATUS = ? WHERE id = ?;', { replacements: [status, id] })
  } else {
    return connectionObject.query('UPDATE tasks SET DESCRIPTION = ?, STATUS = ? WHERE id = ?;', { replacements: [description, status, id] })
  }
}

function destroy (id) {
  return connectionObject.query('DELETE FROM tasks WHERE ID = ?;', { replacements: [id] })
}

module.exports = { read, insert, update, destroy }

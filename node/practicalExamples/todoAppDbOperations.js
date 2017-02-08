const connectionObject = require('./connectDb')

function read () {
  return connectionObject.query('SELECT ID, DESCRIPTION, STATUS FROM tasks;')
}

function insert (description) {
  return connectionObject.query('INSERT INTO tasks (DESCRIPTION, STATUS) VALUES ( ?, FALSE);', { replacements: [description] })
}

function update (description, id, status = false) {
  return connectionObject.query('UPDATE tasks SET DESCRIPTION = ?, STATUS = ? WHERE ID = ?;', { replacements: [description, status, id] })
}

function destroy (id) {
  return connectionObject.query('DELETE FROM tasks WHERE ID = ?;', { replacements: [id] })
}

module.exports = { read, insert, update, destroy }

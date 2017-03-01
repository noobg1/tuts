const getActiveItems = (items) => {
  let activeTodos = 0
  items.forEach((item) => {
    if(!item.status)
      activeTodos++
  })
  return activeTodos
}
module.exports = {getActiveItems}
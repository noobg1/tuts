import React, { Component } from 'react'
import { Link } from 'react-router'

const Footer = (props) => {
  let activeItems = props.activeItems
  let message
  let updateFocusCss = ''
  if (activeItems === 1) {
    message = `${activeItems} item left`
  }
  else {
    message = `${activeItems} items left`
  }
  function clearCompleted() {
    props.clearCompleted()
  }
  function updateFocus (e) {
    console.log('focus',e.target.classid)
  }

  return (
    <footer className="footer">
      <span className="todo-count">{message}</span>
      <ul className="filters">
        <li onClick={updateFocus}>
          <Link classID="all" to="/" className="">All</Link>
        </li>
        <li onClick={updateFocus}>
          <Link classID="active" to="/Active">Active</Link>
        </li>
        <li onClick={updateFocus}>
          <Link classID="completed" to="/Completed">Completed</Link>
        </li>
      </ul>
      <button classID="clear-completed-id" className="clear-completed" onClick={clearCompleted}>Clear completed</button>
    </footer>
  )
}

export default Footer
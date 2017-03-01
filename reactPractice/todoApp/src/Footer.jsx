import React, { Component } from 'react';

const Footer = (props) => {
  let activeItems = props.activeItems;
  let message;
  if (activeItems === 1) {
    message = `${activeItems} item left`;
  }
  else {
    message = `${activeItems} items left`;
  }
  function clearCompleted () {
    props.clearCompleted();
  }

  return (
    <footer className="footer">
      <span className="todo-count">{message}</span>
      <ul className="filters">
        <li>
          <a classID="all" href="#/" className="selected">All</a>
        </li>
        <li>
          <a classID="active" href="#/Active">Active</a>
        </li>
        <li>
          <a classID="completed" href="#/Completed">Completed</a>
        </li>
      </ul>
      <button classID="clear-completed-id" className="clear-completed" onClick={clearCompleted}>Clear completed</button>
    </footer>
  )
}

export default Footer;
import React, { Component } from 'react';

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      showLabel: true,
      value: this.props.todo.description,
      status: this.props.todo.status
    }
  }
  showInput() {
    this.setState((oldState) => {
      oldState.showLabel = !oldState.showLabel;
    })
  }
  updateTodo(e) {
    e.persist();
    if (e.key === 'Enter') {
      this.setState((oldState) => {
        oldState.value = e.target.value;
      })
      this.showInput();
      this.props.updateTodo(this.props.todo, e.target.value, this.state.status);
    }
  }
  updateTodoStatus(e) {
    console.log(e.target.value)
    this.setState ((oldState) => {
      oldState.status = !oldState.status;
      this.props.updateTodo(this.props.todo, this.state.value, oldState.status);
    })
  }
  render() {
    console.log(this.props);
    let item = this.props.todo;
    const checked = (item.status === true) ? 'checked' : 'unchecked';
    const status = (checked === '') ? 'active' : 'completed';
    return (
      <div>
        <li className="${status} ">
          <div className="view">
            <input className="checkbox toggle" type="checkbox" name="checkbox" defaultChecked={this.state.status} onChange={this.updateTodoStatus.bind(this)}/>
            {this.state.showLabel ? <label onDoubleClick={this.showInput.bind(this)}>{this.state.value}</label> : <input className="edit" type="text" defaultValue={this.state.value} onKeyPress={this.updateTodo.bind(this)} />}
            <button className="destroy"></button>
          </div>
        </li>
      </div>
    )
  }
}



export default Todo;
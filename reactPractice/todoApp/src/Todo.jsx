import React, { Component } from 'react';

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = { showLabel: true, value: this.props.todo.description }
  }
  showInput() {
    this.setState((oldState) => {
      oldState.showLabel = !oldState.showLabel;
    })
  }
  updateTodo(e) {
    e.persist();
    if (e.key === 'Enter') {
      console.log(e.target.value);
      this.setState((oldState) => {
        oldState.value = e.target.value;
      })
      this.showInput();
    }
  }
  render() {
    console.log(this.props)
    let item = this.props.todo;
    const checked = (item.status === true) ? 'checked' : '';
    const status = (checked === '') ? 'active' : 'completed';
    return (
      <div>
        <li className="${status} ">
          <div className="view">
            <input className="checkbox toggle" type="checkbox" name="checkbox" checked={checked} />
            {this.state.showLabel ? <label onDoubleClick={this.showInput.bind(this)}>{this.state.value}</label> : <input className="edit" type="text" defaultValue={this.state.value} onKeyPress={this.updateTodo.bind(this)} />}
            <button className="destroy"></button>
          </div>
        </li>
      </div>
    )
  }
}



export default Todo;
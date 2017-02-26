import React, { Component } from 'react';
import './App.css';
import ListView from './ListView.jsx'
import Items from './items.js'
import Cart from './Cart.jsx'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: Items,
      cart: {
        item: [],
        total: 0
      }
    }
  }
  buyItem(itemSelected) {
    //console.log(itemSelected)
    this.setState((oldState) => {
      const index = oldState.items.indexOf(itemSelected);
      let itemRemoved;
      if (index > -1) {
        oldState.items[index].quantity -= 1;
        itemRemoved = oldState.items[index].quantity ? {} : oldState.items.splice(index, 1);
        oldState.cart.item.push(itemSelected);
        oldState.cart.total += itemSelected.price;
      }
    })
  }
  removeFromCart(itemToRemove) {
    this.setState((oldState) => {
      const index = oldState.cart.item.indexOf(itemToRemove);
      let itemAdded;
      if (index > -1) {
        itemToRemove.quantity += 1;
        oldState.cart.item.splice(index, 1);
        itemAdded = itemToRemove.quantity > 1 ? {} : oldState.items.push(itemToRemove);
        oldState.cart.total -= itemToRemove.price;
      }
    })
  }

  render() {
    return (
      <div className="App">
        <div className="">
          <ListView items={this.state.items} buyItem={this.buyItem.bind(this)} />
        </div>
        <Cart className="cart" itemsInCart={this.state.cart} removeFromCart={this.removeFromCart.bind(this)} />
      </div>
    );
  }
}

export default App;

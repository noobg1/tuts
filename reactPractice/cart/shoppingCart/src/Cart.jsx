import React, { Component } from 'react';

class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {showCartList: false}
  }
  showCart (itemsInCart) {
    this.setState({showCartList: true})
  }

  removeItem (item) {
    this.props.removeFromCart(item)
  }

  render() {
    { let itemsIncart;
      if(this.state.showCartList) {
      //console.log(this.props.itemsInCart.item)
      itemsIncart = this.props.itemsInCart.item.map( (eachItem, index) => 
                        { return <li key={index}>
                                  {eachItem.name} <br/>
                                  {eachItem.price} <br/>
                                  <button onClick={this.removeItem.bind(this, eachItem)}>x</button>
                                 </li>
                        })
      return (
        <div>
          {itemsIncart}
        </div>
      )}
      else {
      return (<div>
          <button onClick={this.showCart.bind(this, this.props.itemsInCart)}>{this.props.itemsInCart.item.length}</button>
        </div>)
      }
    }
  }
}

export default Cart;
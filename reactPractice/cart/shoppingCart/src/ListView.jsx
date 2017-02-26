import React, { Component } from 'react';
//import './App.css';


class ListView extends Component {
  render() {
    const itemList = this.props.items.map((item, index) => {
      if (item.quantity > 0)
        return <li key={item.name}><ItemView item={item} buyItem={this.props.buyItem} /></li>
    }
    )
    return (
      <div className="items">
        {itemList}
      </div>
    );
  }
}


class ItemView extends Component {
  buy(item) {
    this.props.buyItem(item)
  }
  render() {
    return (
      <div className="item">
        <img src={this.props.item.image} width="100px" />
        <ul>
          <li>{this.props.item.name}</li>
          <li>$: {this.props.item.price}</li>
        </ul>
        <button onClick={this.buy.bind(this, this.props.item)}>Buy</button>
      </div>
    )
  }
}

export default ListView;

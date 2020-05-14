import React, { Component } from 'react';

import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Order from '../../components/Order/Order';

class Orders extends Component {
  state = {
    orders: []
  }

  componentDidMount() {
    this.getOrders();
  }

  getOrders = async () => {
    const response = await axios.get('/orders.json');
    const fetchedOrders = [];
    Object.keys(response.data).forEach(key => {
      fetchedOrders.push({
        ...response.data[key],
        id: key
      });
    })
    this.setState({orders: fetchedOrders});
  }

  render() {
    return (
      <div>
        {this.state.orders.map(order => {
          return <Order key={order.id} ingredients={order.ingredients} price={order.price} />
        })}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);

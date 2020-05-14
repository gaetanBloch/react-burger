import React, { Component } from 'react';

import axios from '../../axios-orders'
import Order from '../../components/Order/Order';

class Orders extends Component {
  state = {
    orders: []
  }

  componentDidMount() {
    this.getOrders();
  }

  getOrders = async () => {
    const response = await axios.get('/orders');
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
        <Order />
        <Order />
      </div>
    );
  }
}

export default Orders;

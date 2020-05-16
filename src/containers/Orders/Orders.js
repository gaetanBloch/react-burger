import React, { Component } from 'react';

import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
  state = {
    orders: [],
    loading: false
  }

  componentDidMount() {
    this.getOrders();
  }

  getOrders = async () => {
    this.setState({loading: true})
    try {
      const response = await axios.get('/orders.json');
      const fetchedOrders = [];
      Object.keys(response.data).forEach(key => {
        fetchedOrders.push({
          ...response.data[key],
          id: key
        });
      })
      this.setState({orders: fetchedOrders});
    } finally {
      this.setState({loading: false})
    }

  }

  render() {
    let orders = this.state.orders.map(order => {
      return <Order key={order.id} ingredients={order.ingredients} price={order.price} />
    })

    if (this.state.loading) {
      orders = <Spinner />;
    }

    return (
      <div>
        {orders}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);

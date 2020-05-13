import React, { Component } from 'react';
import axios from '../../axios-orders'

import Aux from '../../hoc/ReactAux/ReactAux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 1,
  meat: 2,
  bacon: 1
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 2,
    purchasable: false,
    purchasing: false
  }

  addIngredientHandler = (type) => {
    // Update the count
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type] = updatedCount;

    // Calculate the price
    const oldPrice = this.state.totalPrice;
    const priceAddition = INGREDIENT_PRICES[type];
    const newPrice = oldPrice + priceAddition;

    this.setState({
        ingredients: updatedIngredients,
        totalPrice: newPrice
      }
    );

    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredient = (type) => {
    const oldCount = this.state.ingredients[type];

    if (oldCount > 0) {
      // Update the count
      const updatedCount = oldCount - 1;
      const updatedIngredients = {...this.state.ingredients};
      updatedIngredients[type] = updatedCount;

      // Update the price
      const oldPrice = this.state.totalPrice;
      const priceDeduction = INGREDIENT_PRICES[type];
      const newPrice = oldPrice - priceDeduction;

      this.setState({
          ingredients: updatedIngredients,
          totalPrice: newPrice
        }
      );

      this.updatePurchaseState(updatedIngredients);
    }
  }

  updatePurchaseState = (ingredients) => {

    // let sumIngredients = 0;
    // Object.keys(ingredients).forEach(key => {
    //   sumIngredients += ingredients[key];
    // })
    const sumIngredients = Object.keys(ingredients)
      .map(key => ingredients[key])
      .reduce((sum, element) => sum + element, 0);

    this.setState({purchasable: sumIngredients > 0});
  };

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = async () => {
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Gaëtan Bloch',
        address: {
          street: 'Nantes street',
          zipCode: '44300',
          country: 'France'
        },
        email: 'gaetan.bloch@gmail.com'
      },
      deliveryMethod: 'fastest'
    }

    try {
      const response = await axios.post('/orders.json', order);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const disabledInfo = {...this.state.ingredients};
    Object.keys(disabledInfo).forEach(key => {
      disabledInfo[key] = disabledInfo[key] <= 0;
    });

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          <OrderSummary
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler} />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredient}
          ordered={this.purchaseHandler}
          disabled={disabledInfo} />
      </Aux>
    );
  }
}

export default BurgerBuilder;

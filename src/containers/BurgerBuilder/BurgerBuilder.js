import React, { Component } from 'react';
import Aux from '../../hoc/ReactAux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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
    totalPrice: 2
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
    }
  }

  render() {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredient} />
      </Aux>
    );
  }
}

export default BurgerBuilder;

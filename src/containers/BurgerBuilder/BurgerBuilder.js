import React, { Component } from 'react';
import axios from '../../axios-orders'

import Aux from '../../hoc/ReactAux/ReactAux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  alad: 0.5,
  bacon: 1,
  cheese: 1,
  meat: 2
}

const INITIAL_PRICE = 2;

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 0,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    this.getIngredients();
  }

  getIngredients = async () => {
    try {
      const response = await axios.get('/ingredients.json');
      this.setState({
        ingredients: response.data,
        totalPrice: this.calculateInitialPrice(response.data)
      });
    } catch (error) {
      this.setState({error: true})
    }
  }

  calculateInitialPrice = (ingredients) => {
    const totalPrice = Object.keys(ingredients)
      .map(key => ingredients[key] * INGREDIENT_PRICES[key])
      .reduce((sum, price) => sum + price);
    return INITIAL_PRICE + totalPrice;
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

  purchaseContinueHandler = () => {
    // this.setState({loading: true});
    //
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: 'Gaëtan Bloch',
    //     address: {
    //       street: 'Nantes street',
    //       zipCode: '44300',
    //       country: 'France'
    //     },
    //     email: 'gaetan.bloch@gmail.com'
    //   },
    //   deliveryMethod: 'fastest'
    // }
    //
    // try {
    //   const response = await axios.post('/orders.json', order);
    //   console.log(response);
    // } catch (error) {
    //   console.log(error);
    // } finally {
    //   this.setState({loading: false, purchasing: false});
    // }
    this.props.history.push({
      pathname: '/checkout',
      search: this.buildIngredientsParams()
    });
  };

  buildIngredientsParams = () => {
    let result = '?'
    result += Object.keys(this.state.ingredients)
      .map(key => key + '=' + this.state.ingredients[key])
      .reduce((params, keyValue) => params + keyValue + '&', '');
    result = result.substring(0, result.length - 1);
    console.log(result);
    return result;
  }

  render() {
    const disabledInfo = {...this.state.ingredients};
    Object.keys(disabledInfo).forEach(key => {
      disabledInfo[key] = disabledInfo[key] <= 0;
    });

    let orderSummary = null;
    let burger;

    if (this.state.error) {
      burger = <p style={{textAlign: 'center'}}>Ingredients can't be loaded!</p>
    } else {
      burger = <Spinner />;
    }

    if (this.state.ingredients) {
      burger = <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredient}
          ordered={this.purchaseHandler}
          disabled={disabledInfo} />
      </Aux>;

      orderSummary = <OrderSummary
        ingredients={this.state.ingredients}
        price={this.state.totalPrice}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler} />;
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);

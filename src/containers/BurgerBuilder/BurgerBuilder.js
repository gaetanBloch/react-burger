import React, { Component } from 'react';
import axios from '../../axios-orders'
import { connect } from 'react-redux';

import Aux from '../../hoc/ReactAux/ReactAux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as ActionTypes from '../../store/actions'

const INGREDIENT_PRICES = {
  alad: 0.5,
  bacon: 1,
  cheese: 1,
  meat: 2
}

const INITIAL_PRICE = 2;

class BurgerBuilder extends Component {
  state = {
    totalPrice: 0,
    purchasable: false,
    purchasing: false,
    error: false
  }

  componentDidMount() {
    // this.getIngredients();
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
    this.props.history.push({
      pathname: '/checkout',
      search: this.buildQueryParams()
    });
  };

  buildQueryParams = () => {
    // let result = '?';
    // result += Object.keys(this.props.ingredients)
    //   .map(key => {
    //     return encodeURIComponent(key) + '=' + encodeURIComponent(this.props.ingredients[key]);
    //   })
    //   .reduce((params, keyValue) => params + keyValue + '&', '');
    // result = result.substring(0, result.length - 1);
    // return result;
    const queryParams = [];
    Object.keys(this.props.ingredients).forEach((key) => {
      queryParams.push(
        encodeURIComponent(key) + '=' + encodeURIComponent(this.props.ingredients[key])
      );
    });
    queryParams.push('price=' + this.state.totalPrice);
    return '?' + queryParams.join('&');
  }

  render() {
    const disabledInfo = {...this.props.ingredients};
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

    if (this.props.ingredients) {
      burger = <Aux>
        <Burger ingredients={this.props.ingredients} />
        <BuildControls
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          ingredientAdded={this.props.onIngredientAdded}
          ingredientRemoved={this.props.onIngredientRemoved}
          ordered={this.purchaseHandler}
          disabled={disabledInfo} />
      </Aux>;

      orderSummary = <OrderSummary
        ingredients={this.props.ingredients}
        price={this.state.totalPrice}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler} />;
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

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingredientType) => dispatch(
      {type: ActionTypes.ADD_INGREDIENT, ingredientType: ingredientType}
    ),
    onIngredientRemoved: (ingredientType) => dispatch(
      {type: ActionTypes.REMOVE_INGREDIENT, ingredientType: ingredientType}
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));

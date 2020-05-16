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
import * as actionCreators from '../../store/actions/index'

class BurgerBuilder extends Component {
  state = {
    purchasing: false
  }

  isPurchasable = () => {
    // let sumIngredients = 0;
    // Object.keys(ingredients).forEach(key => {
    //   sumIngredients += ingredients[key];
    // })
    const sumIngredients = Object.keys(this.props.ingredients)
      .map(key => this.props.ingredients[key])
      .reduce((sum, element) => sum + element, 0);

    return sumIngredients > 0;
  };

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  };

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
          price={this.props.totalPrice}
          purchasable={this.isPurchasable()}
          ingredientAdded={this.props.onIngredientAdded}
          ingredientRemoved={this.props.onIngredientRemoved}
          ordered={this.purchaseHandler}
          disabled={disabledInfo} />
      </Aux>;

      orderSummary = <OrderSummary
        ingredients={this.props.ingredients}
        price={this.props.totalPrice}
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
    onIngredientAdded: (ingredientType) => dispatch(actionCreators.addIngredient(ingredientType)),
    onIngredientRemoved: (ingredientType) => dispatch(actionCreators.removeIngredient(ingredientType))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));

import React, { Fragment, useEffect, useState } from 'react';
import axios from '../../axios-orders';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

const BurgerBuilder = props => {

  const { onInitIngredients } = props;

  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const isPurchasable = () => {
    // let sumIngredients = 0;
    // Object.keys(ingredients).forEach(key => {
    //   sumIngredients += ingredients[key];
    // })
    const sumIngredients = Object.keys(props.ingredients)
      .map(key => props.ingredients[key])
      .reduce((sum, element) => sum + element, 0);

    return sumIngredients > 0;
  };

  const purchaseHandler = () => {
    if (props.isAuthenticated) {
      setPurchasing(true);
    } else {
      props.onSetAuthRedirectPath('/checkout');
      props.history.push('/auth');
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    props.onInitPurchase();
    props.history.push('/checkout');
  };

  const disabledInfo = { ...props.ingredients };
  Object.keys(disabledInfo).forEach(key => {
    disabledInfo[key] = disabledInfo[key] <= 0;
  });

  let orderSummary = null;
  let burger;

  if (props.error) {
    burger =
      <p style={{ textAlign: 'center' }}>Ingredients can't be loaded!</p>;
  } else {
    burger = <Spinner />;
  }

  if (props.ingredients) {
    burger = <Fragment>
      <Burger ingredients={props.ingredients} />
      <BuildControls
        price={props.totalPrice}
        purchasable={isPurchasable()}
        ingredientAdded={props.onIngredientAdded}
        ingredientRemoved={props.onIngredientRemoved}
        ordered={purchaseHandler}
        isAuth={props.isAuthenticated}
        disabled={disabledInfo} />
    </Fragment>;

    orderSummary = <OrderSummary
      ingredients={props.ingredients}
      price={props.totalPrice}
      purchaseCancelled={purchaseCancelHandler}
      purchaseContinued={purchaseContinueHandler} />;
  }

  return (
    <Fragment>
      <Modal
        show={purchasing}
        modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingredientType) =>
      dispatch(actions.addIngredient(ingredientType)),
    onIngredientRemoved: (ingredientType) =>
      dispatch(actions.removeIngredient(ingredientType)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)
(withErrorHandler(BurgerBuilder, axios));

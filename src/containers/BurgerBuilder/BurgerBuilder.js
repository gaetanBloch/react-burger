import React, { Fragment, useCallback, useEffect, useState } from 'react';
import axios from '../../axios-orders';
import { connect, useDispatch, useSelector } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

const BurgerBuilder = props => {

  const [purchasing, setPurchasing] = useState(false);

  const dispatch = useDispatch();

  const { ingredients, totalPrice, error, isAuthenticated } = useSelector(
    state => {
      return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
      };
    }
  );

  const onIngredientAdded = (ingredientType) =>
    dispatch(actions.addIngredient(ingredientType));
  const onIngredientRemoved = (ingredientType) =>
    dispatch(actions.removeIngredient(ingredientType));
  const onInitIngredients = useCallback(() =>
    dispatch(actions.initIngredients()), [dispatch]);
  const onInitPurchase = () =>
    dispatch(actions.purchaseInit());
  const onSetAuthRedirectPath = (path) =>
    dispatch(actions.setAuthRedirectPath(path));

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const isPurchasable = () => {
    // let sumIngredients = 0;
    // Object.keys(ingredients).forEach(key => {
    //   sumIngredients += ingredients[key];
    // })
    const sumIngredients = Object.keys(ingredients)
      .map(key => ingredients[key])
      .reduce((sum, element) => sum + element, 0);

    return sumIngredients > 0;
  };

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      onSetAuthRedirectPath('/checkout');
      props.history.push('/auth');
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    onInitPurchase();
    props.history.push('/checkout');
  };

  const disabledInfo = { ...props.ingredients };
  Object.keys(disabledInfo).forEach(key => {
    disabledInfo[key] = disabledInfo[key] <= 0;
  });

  let orderSummary = null;
  let burger;

  if (error) {
    burger =
      <p style={{ textAlign: 'center' }}>Ingredients can't be loaded!</p>;
  } else {
    burger = <Spinner />;
  }

  if (ingredients) {
    burger = <Fragment>
      <Burger ingredients={ingredients} />
      <BuildControls
        price={totalPrice}
        purchasable={isPurchasable()}
        ingredientAdded={onIngredientAdded}
        ingredientRemoved={onIngredientRemoved}
        ordered={purchaseHandler}
        isAuth={isAuthenticated}
        disabled={disabledInfo} />
    </Fragment>;

    orderSummary = <OrderSummary
      ingredients={ingredients}
      price={totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios);

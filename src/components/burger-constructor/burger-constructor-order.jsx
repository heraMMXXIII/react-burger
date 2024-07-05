import { useState } from "react";
import PropTypes from "prop-types";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor-order.module.css";
import Order from "../order/order";

import { useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CLEAR_ORDER,
  createOrderAction,
} from "../../services/actions/create-order";
import { getIngredients, getOrder } from "../../services/selectors";
import Modal from "../modal/modal";

function BurgerConstructorOrder({ number }) {
  const { bun, ingredients, sum } = useSelector(getIngredients);
  const { orderNumber, orderLoading, orderHasErrors } = useSelector(getOrder);

  useEffect(() => {
    if (orderHasErrors) {
      alert("Ошибка при создании заказа");
    }
  }, [orderHasErrors]);

  const disabled = useMemo(() => {
    let hasIngredient = (ingredients && ingredients.length > 0) || bun;
    let hasOrder = orderNumber !== null || orderLoading;
    return !hasIngredient || hasOrder;
  }, [bun, ingredients, orderNumber, orderLoading]);

  const dispatch = useDispatch();

  function showOrder() {
    const orderIngredients = [...ingredients];
    if (bun) {
      orderIngredients.push(bun, bun);
    }
    dispatch(createOrderAction(orderIngredients));
  }

  function hideOrder() {
    dispatch({ type: CLEAR_ORDER });
  }

  return (
    <div className={`${styles.total} mr-4 mt-10`}>
      <div className="text text_type_digits-medium mr-2 mb-1">{sum}</div>
      <div className={`${styles["total-icon"]} mr-10`}>
        <CurrencyIcon type="primary" />
      </div>
      <Button
        htmlType="button"
        type="primary"
        disabled={disabled}
        onClick={showOrder}
      >
        Оформить заказ
      </Button>
      {orderNumber && (
        <Modal onClose={hideOrder}>
          <Order number={orderNumber} />
        </Modal>
      )}
    </div>
  );
}

export default BurgerConstructorOrder;
//fff
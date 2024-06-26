import { useState } from "react";
import PropTypes from "prop-types";
import { ingredientsPropTypes } from "../../utils/propTypes";
import styles from "./burger-ingredient.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientDetails from "../ingredent-details/ingredient-details";
import Modal from "../modal/modal";

function BurgerIngredient({ item, count }) {
  const [show, setShow] = useState(false);

  function showDialog() {
    setShow(true);
  }

  function hideDialog(e) {
    setShow(false);
    e.stopPropagation();
  }

  return (
    <li className={`${styles.card} mt-6 mb-8 ml-3 mr-2`} onClick={showDialog}>
      <img
        className={`${styles.image} ml-4 mr-4 mb-1`}
        src={item.image}
        alt="Ингридиент"
      />
      <div className={`${styles.price} mb-1`}>
        <span className="text text_type_digits-default mr-2">{item.price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <div className={`${styles.title} text text_type_main-default`}>
        {item.name}
      </div>
      {count && count > 0 ? (
        <Counter count={count} size="default" extraClass={styles.count} />
      ) : undefined}
      {show && (
        <Modal onClose={hideDialog}>
          <IngredientDetails item={item} onClose={hideDialog} />
        </Modal>
      )}
    </li>
  );
}

BurgerIngredient.propTypes = {
  item: ingredientsPropTypes.isRequired,
  count: PropTypes.number,
};

export default BurgerIngredient;

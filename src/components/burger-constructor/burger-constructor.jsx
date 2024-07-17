import { useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { dataPropTypes } from "../../utils/propTypes";
import BurgerConstructorOrder from "./burger-constructor-order";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import {
  SET_BUN,
  ADD_INGREDIENT,
  SET_SUM,
  DELETE_INGREDIENT,
} from "../../services/actions/burger-constructor";
import { getIngredients } from "../../services/selectors";
import { BUN, SAUCE, MAIN } from "../../utils/ingredient-types";
import BurgerConstructorIngredient from "../burger-constructor-ingredient/burger-constructor-ingredient";
import { addIngredient } from "../../services/addIngredient";

function BurgerConstructor() {
  const dispatch = useDispatch();
  const { bun, ingredients } = useSelector(getIngredients);

  useEffect(() => {
    let sum = 0;
    if (bun) {
      sum += bun.price * 2;
    }
    sum += ingredients.reduce((sum, item) => (sum += item.price), 0);
    dispatch({ type: SET_SUM, sum });
  }, [bun, ingredients, dispatch]);

  const [, dropTargetBun] = useDrop({
    accept: BUN,
    drop(item) {
      dispatch({ type: SET_BUN, item: item });
    },
  });

  const [, dropTargetIngredient] = useDrop({
    accept: [SAUCE, MAIN],
    drop(item) {
      dispatch(addIngredient(item));
    },
  });

  function deleteIngredient(index) {
    dispatch({ type: DELETE_INGREDIENT, index: index });
  }

  const BunElement = ({ type, bun }) => (
    <div ref={dropTargetBun}>
      {bun ? (
        <ConstructorElement
          type={type}
          isLocked={true}
          text={`${bun.name} (${type === "top" ? "верх" : "низ"})`}
          price={bun.price}
          thumbnail={bun.image}
          extraClass={`${styles.ingredient} ml-8`}
        />
      ) : (
        <div
          className={`${styles["empty-element"]} constructor-element constructor-element_pos_${type} ml-8`}
        >
          <div className={`${styles["empty-element-text"]} text text_type_main-default`}>
            Перетащите булку
          </div>
        </div>
      )}
    </div>
  );

  return (
    <section className={styles.section}>
      <div className={`${styles.burger} mt-25 ml-4`}>
        <BunElement type="top" bun={bun} />
        <ul className={`${styles.scroll} mt-4 mb-4`} ref={dropTargetIngredient}>
          {ingredients && ingredients.length > 0 ? (
            ingredients.map((item, index) => (
              <BurgerConstructorIngredient
                key={item.uniqueId || item._id} // Используем uniqueId или _id в качестве ключа
                item={item}
                index={index}
                onDelete={deleteIngredient}
              />
            ))
          ) : (
            <div
              className={`${styles["empty-element"]} constructor-element ml-8`}
            >
              <div
                className={`${styles["empty-element-text"]} text text_type_main-default`}
              >
                Перетащите ингридиенты
              </div>
            </div>
          )}
        </ul>
        <BunElement type="bottom" bun={bun} />
      </div>

      <BurgerConstructorOrder />
    </section>
  );
}

export default BurgerConstructor;

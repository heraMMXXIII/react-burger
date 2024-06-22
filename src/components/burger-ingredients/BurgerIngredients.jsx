import { useMemo, useRef } from "react";
import PropTypes from "prop-types";
import styles from "./burger-ingredients.module.css";
import { BUN, SAUCE, MAIN, types } from "../../utils/ingredient-types";
import { ingredientsPropTypes } from "../../utils/propTypes";
import BurgerTab from "../burger-tab/burger-tab";
import BurgerIngredient from "../burger-ingredient/BurgerIngredient";

function BurgerIngredients({ data }) {
  const groups = useMemo(() => {
    let res = {};
    res[BUN] = data.filter((i) => i.type === BUN);
    res[SAUCE] = data.filter((i) => i.type === SAUCE);
    res[MAIN] = data.filter((i) => i.type === MAIN);
    return res;
  }, [data]);

  const headers = {};
  headers[BUN] = useRef(null);
  headers[SAUCE] = useRef(null);
  headers[MAIN] = useRef(null);

  function tabChange(value) {
    headers[value].current.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section className={styles.section}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <BurgerTab tabChange={tabChange} />

      <div className={styles.list}>
        {[BUN, SAUCE, MAIN].map((type, typeIndex) => (
          <div key={typeIndex}>
            <h2 className="text text_type_main-medium mt-2" ref={headers[type]}>
              {types  [type]}
            </h2>
            <ul className={styles["group-content"]}>
              {groups[type].map((item, index) => (
                <BurgerIngredient
                  key={type + index}
                  item={item}
                  count={index === 0 ? 1 : 0}
                />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientsPropTypes.isRequired).isRequired,
};

export default BurgerIngredients;

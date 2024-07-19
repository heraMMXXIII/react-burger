import { useEffect, useState } from "react";
import styles from "./main.module.css";

import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../../components/burger-ingredients/BurgerIngredients";
import AppHeader from "../../components/app-header/app-header";
import { useSelector, useDispatch } from "react-redux";
import { loadIngredientsAction } from "../../services/actions/load-ingredients";
import { getData } from "../../services/selectors";

const MESSAGE_LOADING = "Подождите, идет загрузка...";
const MESSAGE_ERROR = "Возникла ошибка при получении данных";

function App() {
  const { data, dataLoading, dataHasErrors } = useSelector(getData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadIngredientsAction());
  }, [dispatch]);

  return (
    <>
      {dataLoading || dataHasErrors ? (
        <main className={styles.wait}>
          <p className="text text_type_main-large">
            {dataLoading
              ? MESSAGE_LOADING
              : dataHasErrors
              ? MESSAGE_ERROR
              : undefined}
          </p>
        </main>
      ) : data && data.length > 0 ? (
        <>

          <main className={styles.main}>
            <div className={styles.inner}>
              <BurgerIngredients />
              <BurgerConstructor />
            </div>
          </main>
        </>
      ) : undefined}
    </>
  );
}

export default App;

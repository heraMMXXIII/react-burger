import PropTypes from "prop-types";
import styles from "./ingredient-details.module.css";
import Modal from "../modal/modal";
import { dataPropTypes } from "../../utils/propTypes";
import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { getData } from "../../services/selectors";
import { MESSAGE_ERROR, MESSAGE_LOADING } from "../../utils/message";
import { loadIngredientsAction } from "../../services/actions/load-ingredients";

function IngredientDetails({ item, onClose }) {
  const dispatch = useDispatch();
  const params = useParams();
  const { data, dataLoading, dataHasErrors } = useSelector(getData);
  let item1 = useMemo(() => {
    if (item) {
      return item;
    } else if (params.id && data && data.length > 0) {
      return data.find((i) => i._id === params.id);
    }
    return null;
  }, [item, params.id, data]);

  if (!item1 && !dataLoading && !dataHasErrors && params && params.id) {
    dispatch(loadIngredientsAction());
  }

  return item1 ? (
    <>
      <img
        className={`${styles.image} mb-4`}
        src={item.image_large}
        alt={item.name}
      />
      <p
        className={`${styles.name} text-center text text_type_main-medium mb-8`}
      >
        {item.name}
      </p>
      <div className={`${styles.detail} mb-15`}>
        <div className={styles["detail-item"]}>
          <div className="text text_type_main-default text_color_inactive mb-2">
            Калории,ккал
          </div>
          <div className="text-center text text_type_digits-default text_color_inactive">
            {item.calories}
          </div>
        </div>
        <div className={styles["detail-item"]}>
          <div className="text text_type_main-default text_color_inactive mb-2">
            Белки, г
          </div>
          <div className="text-center text text_type_digits-default text_color_inactive">
            {item.proteins}
          </div>
        </div>
        <div className={styles["detail-item"]}>
          <div className="text text_type_main-default text_color_inactive mb-2">
            Жиры, г
          </div>
          <div className="text-center text text_type_digits-default text_color_inactive">
            {item.fat}
          </div>
        </div>
        <div className={styles["detail-item"]}>
          <div className="text text_type_main-default text_color_inactive mb-2">
            Углеводы, г
          </div>
          <div className="text-center text text_type_digits-default text_color_inactive">
            {item.carbohydrates}
          </div>
        </div>
      </div>
    </>
  ) : (
    <p className="text text_type_main-medium">
      {dataLoading
        ? MESSAGE_LOADING
        : dataHasErrors
        ? MESSAGE_ERROR
        : undefined}
    </p>
  );
}

IngredientDetails.propTypes = {
  item: dataPropTypes.isRequired,
};

export default IngredientDetails;

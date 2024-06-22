import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./burger-tab.module.css";
import { BUN, SAUCE, MAIN, types } from "../../utils/ingredient-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerTab({ tabChange }) {
  const [tab, setTab] = useState(BUN);

  function change(type) {
    setTab(type);
    tabChange(type);
  }

  return (
    <div className={`${styles.tabs} mb-8`}>
      <Tab value={BUN} active={tab === BUN} onClick={change}>
        {types[BUN]}
      </Tab>
      <Tab value={SAUCE} active={tab === SAUCE} onClick={change}>
        {types[SAUCE]}
      </Tab>
      <Tab value={MAIN} active={tab === MAIN} onClick={change}>
        {types[MAIN]}
      </Tab>
    </div>
  );
}

BurgerTab.propTypes = {
  tabChange: PropTypes.func.isRequired,
};

export default BurgerTab;

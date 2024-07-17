import PropTypes from "prop-types";
import styles from "./burger-tab.module.css";
import { BUN, SAUCE, MAIN, types } from "../../utils/ingredient-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { SET_TAB } from "../../services/actions/tab-info";
import { getTab } from "../../services/selectors";
import { useEffect, useRef } from "react";

function BurgerTab({ tabChange }) {
  const tab = useSelector(getTab);
  const dispatch = useDispatch();
  const sectionsRef = useRef({});

  const change = (type) => {
    dispatch({ type: SET_TAB, tab: type });
    tabChange(type);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            dispatch({ type: SET_TAB, tab: entry.target.dataset.type });
            tabChange(entry.target.dataset.type);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = document.querySelectorAll('.ingredient-section');
    sections.forEach((section) => {
      observer.observe(section);
      sectionsRef.current[section.dataset.type] = section;
    });

    return () => {
      Object.values(sectionsRef.current).forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, [dispatch, tabChange]);

  return (
    <div className={`${styles.tabs} mb-2`}>
      <Tab value={BUN} active={tab === BUN} onClick={() => change(BUN)}>
        {types[BUN]}
      </Tab>
      <Tab value={SAUCE} active={tab === SAUCE} onClick={() => change(SAUCE)}>
        {types[SAUCE]}
      </Tab>
      <Tab value={MAIN} active={tab === MAIN} onClick={() => change(MAIN)}>
        {types[MAIN]}
      </Tab>
    </div>
  );
}

BurgerTab.propTypes = {
  tabChange: PropTypes.func.isRequired,
};

export default BurgerTab;

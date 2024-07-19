import Icon from "../icon/icon";
import styles from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function AppHeader() {
  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <div className={styles.container}>
        <nav className={styles.left}>
          <ul className={styles.list}>
            <li>
              <Icon href="/" icon={BurgerIcon} isActive>
                Конструктор
              </Icon>
            </li>
            <li>
              <Icon href="/" icon={ListIcon}>
                Лента заказов
              </Icon>
            </li>
          </ul>
        </nav>

        <div className={styles.center}>
          <a href = "/">
          <Logo />
          </a>
        </div>

        <div className={styles.right}>
          <Icon href="/" icon={ProfileIcon}>
            Личный кабинет
          </Icon>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;

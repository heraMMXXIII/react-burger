import { useCallback, useEffect } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./modal-overlay";

function Modal({ caption, children, onClose }) {
  // const checkEsc = useCallback(
  //   (e) => {
  //     if (e.key === "Escape") {
  //       onClose(e);
  //     }
  //   },
  //   [onClose]
  // );


  useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        onClose(evt);
      }
    } 
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }

  }, [onClose]) 

  return ReactDOM.createPortal(
    <div className={styles.container}>
      <div className={styles.dialog}>
        <div className={`${styles.header} ml-10 mt-10 mr-10`}>
          <div className={`${styles.caption} text text_type_main-large`}>
            {caption}
          </div>
          <div className={styles["close-btn"]}>
            <CloseIcon type="primary" onClick={onClose} />
          </div>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
      <ModalOverlay onClose={onClose} />
    </div>,
    document.getElementById("modal")
  );
}

Modal.propTypes = {
  caption: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element),
  onClose: PropTypes.func.isRequired,
};

export default Modal;

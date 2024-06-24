
import Modal from "../modal/modal";

import OrderDetails from "./order-details";

function Order({ number, onClose }) {
  return (
    <Modal onClose={onClose}>
      <OrderDetails orderNumber={number}/>
    </Modal>
  );
}


export default Order;

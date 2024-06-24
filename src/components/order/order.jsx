
import Modal from "../modal/modal";

import OrderDetails from "./order-details";

function Order({ number, onClose }) {
  return (
    <Modal onClose={onClose}>
      <OrderDetails number={number}/>
    </Modal>
  );
}


export default Order;

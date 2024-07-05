import Modal from "../modal/modal";

import OrderDetails from "./order-details";

function Order({ number, onClose }) {
  return <OrderDetails number={number} />;
}

export default Order;

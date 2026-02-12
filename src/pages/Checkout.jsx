import { useSelector, useDispatch } from "react-redux";
import { createOrder } from "../features/orders/ordersSlice";
import { clearCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import styles from "./Checkout.module.css";

const Checkout = () => {
  const { items } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    const order = {
      id: new Date().getTime(),
      user: user.email,
      items,
      total,
      status: "Processing",
      date: new Date().toISOString(),
    };

    dispatch(createOrder(order));
    dispatch(clearCart());
    navigate("/orders");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>Checkout</h1>

        <div className={styles.section}>
          <h2>Customer</h2>
          <p>{user.email}</p>
        </div>

        <div className={styles.section}>
          <h2>Order Summary</h2>

          {items.map((item) => (
            <div key={item.id} className={styles.item}>
              <span>{item.title}</span>
              <span>
                {item.quantity} × ${item.price}
              </span>
            </div>
          ))}
        </div>

        <div className={styles.total}>
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <button className={styles.placeBtn} onClick={handleCheckout}>
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;

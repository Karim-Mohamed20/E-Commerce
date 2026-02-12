import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../features/cart/cartSlice";
import { Link } from "react-router-dom";
import styles from "./Cart.module.css";

const Cart = () => {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (!items.length) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <h1 className={styles.title}>Your Cart</h1>
          <p className={styles.empty}>Your cart is empty 🛒</p>
          <Link to="/" className={styles.shopBtn}>Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>Your Cart</h1>

        {items.map((item) => (
          <div key={item.id} className={styles.item}>
            <img
              src={item.thumbnail}
              alt={item.title}
              className={styles.image}
            />

            <div className={styles.details}>
              <h3>{item.title}</h3>
              <p className={styles.price}>${item.price}</p>
            </div>

            <div className={styles.actions}>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  dispatch(
                    updateQuantity({
                      id: item.id,
                      quantity: Number(e.target.value),
                    })
                  )
                }
              />
              <button onClick={() => dispatch(removeFromCart(item.id))}>
                Remove
              </button>
            </div>
          </div>
        ))}

        <div className={styles.summary}>
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <Link to="/checkout" className={styles.checkoutBtn}>
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;

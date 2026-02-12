import { useSelector } from "react-redux";
import styles from "./Orders.module.css";

const Orders = () => {
  const { orders } = useSelector((state) => state.orders);
  const { user } = useSelector((state) => state.auth);

  const userOrders = orders.filter(
    (order) => order.user === user.email
  );

  if (!userOrders.length) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <h1 className={styles.title}>My Orders</h1>
          <p className={styles.empty}>You have no orders yet 📦</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>My Orders</h1>

        {userOrders.map((order) => (
          <div key={order.id} className={styles.order}>
            <div className={styles.header}>
              <div>
                <p className={styles.orderId}>
                  Order #{order.id}
                </p>
                <p className={styles.date}>
                  {new Date(order.date).toLocaleDateString()}
                </p>
              </div>

              <span
                className={`${styles.status} ${
                  styles[order.status.toLowerCase()]
                }`}
              >
                {order.status}
              </span>
            </div>

            <div className={styles.items}>
              {order.items.map((item) => (
                <div key={item.id} className={styles.item}>
                  <span>
                    {item.title} × {item.quantity}
                  </span>
                  <span>${item.price}</span>
                </div>
              ))}
            </div>

            <div className={styles.total}>
              Total: ${order.total.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;

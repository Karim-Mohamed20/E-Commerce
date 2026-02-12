import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./AdminDashboard.module.css";

const AdminDashboard = () => {
  const { orders } = useSelector((state) => state.orders);

  const totalOrders = orders.length;

  const completedOrders = orders.filter(
    (order) => order.status === "Completed",
  );

  const revenue = completedOrders.reduce((sum, order) => sum + order.total, 0);

  const recentOrders = orders.slice(-5).reverse();

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>Admin Dashboard</h1>

        <div className={styles.grid}>
          <div className={styles.stat}>
            <h2>Total Orders</h2>
            <p>{totalOrders}</p>
            <Link to="/admin/orders">View</Link>
          </div>

          <div className={styles.stat}>
            <h2>Products</h2>
            <p>ALL</p>
            <Link to="/admin/products">Manage</Link>
          </div>

          <div className={styles.stat}>
            <h2>Revenue</h2>
            <p>${revenue.toFixed(2)}</p>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Recent Orders</h2>

          {recentOrders.length === 0 ? (
            <p className={styles.empty}>No orders yet</p>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.user}</td>
                    <td>${order.total.toFixed(2)}</td>
                    <td>
                      <span
                        className={`${styles.status} ${
                          styles[order.status.toLowerCase()]
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

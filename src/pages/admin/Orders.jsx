import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateOrderStatus } from "../../features/orders/ordersSlice";
import styles from "./AdminOrders.module.css";

const ITEMS_PER_PAGE = 6;

const AdminOrders = () => {
  const { orders } = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(
    orders.length / ITEMS_PER_PAGE
  );

  const startIndex =
    (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedOrders = orders.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleChange = (id, status) => {
    dispatch(updateOrderStatus({ id, status }));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.header}>
          

          <h1 className={styles.title}>
            Manage Orders
          </h1>
          <button
            className={styles.backBtn}
            onClick={() => navigate("/admin")}
          >
            ← Back
          </button>
        </div>

        {orders.length === 0 ? (
          <p className={styles.empty}>
            No orders found
          </p>
        ) : (
          <>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {paginatedOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.user}</td>
                    <td>
                      ${order.total.toFixed(2)}
                    </td>
                    <td className={styles.status}>
                      {order.status}
                    </td>
                    <td>
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleChange(
                            order.id,
                            e.target.value
                          )
                        }
                        disabled={
                          order.status ===
                          "Cancelled"
                        }
                        className={styles.select}
                      >
                        <option value="Processing">
                          Processing
                        </option>
                        <option value="Completed">
                          Completed
                        </option>
                        <option value="Cancelled">
                          Cancelled
                        </option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className={styles.pagination}>
              <button
                onClick={() =>
                  setCurrentPage((p) =>
                    Math.max(p - 1, 1)
                  )
                }
                disabled={currentPage === 1}
              >
                Prev
              </button>

              <span>
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((p) =>
                    Math.min(p + 1, totalPages)
                  )
                }
                disabled={
                  currentPage === totalPages
                }
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;

import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../services/productsApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AdminProducts.module.css";

const AdminProducts = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useQuery({
    queryKey: ["admin-products", page],
    queryFn: () =>
      fetchProducts({
        queryKey: ["", { page, limit }],
      }),
    keepPreviousData: true,
  });

  const [deletedIds, setDeletedIds] = useState([]);

  if (isLoading) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.card}>Loading products...</div>
      </div>
    );
  }

  const products = data.products.filter((p) => !deletedIds.includes(p.id));

  const handleDelete = (id) => {
    setDeletedIds([...deletedIds, id]);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        

        <div className={styles.header}>
                  
        
                  <h1 className={styles.title}>Manage Products</h1>
                  <button
                    className={styles.backBtn}
                    onClick={() => navigate("/admin")}
                  >
                    ← Back
                  </button>
                </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.title}</td>
                <td>${product.price}</td>
                <td>
                  <button className={styles.editBtn}>Edit</button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className={styles.deleteBtn}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.pagination}>
          <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
            Prev
          </button>

          <span>{page}</span>

          <button
            disabled={data.products.length < limit}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;

import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "../../services/productsApi";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";
import { useState } from "react";
import styles from "./ProductDetails.module.css";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
  });

  if (isLoading) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.card}>Loading product...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.card}>Failed to load product</div>
      </div>
    );
  }

  const handleAddToCart = () => {
    console.log("✅ Add to Cart clicked!");
    console.log("Product ID:", data.id);
    console.log("Quantity:", quantity);
    dispatch(addToCart({ ...data, quantity: parseInt(quantity) }));
    setQuantity(1);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.grid}>
          <img
            src={data.thumbnail}
            alt={data.title}
            className={styles.image}
          />

          <div className={styles.info}>
            <h1 className={styles.title}>{data.title}</h1>
            <p className={styles.brand}>{data.brand}</p>

            <p className={styles.description}>{data.description}</p>

            <p className={styles.price}>${data.price}</p>

            <div className={styles.actions}>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <button 
                type="button"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

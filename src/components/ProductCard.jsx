import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.card}>
      <Link to={`/products/${product.id}`} className={styles.link}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className={styles.image}
        />

        <h3 className={styles.title}>{product.title}</h3>
      </Link>

      <p className={styles.price}>${product.price}</p>

      <button
        className={styles.cartBtn}
        onClick={() => dispatch(addToCart(product))}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;

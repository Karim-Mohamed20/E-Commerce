import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";
import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    console.log("✅ Add to Cart clicked from ProductCard!");
    console.log("Product:", product.title);
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

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
        type="button"
        className={styles.cartBtn}
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;

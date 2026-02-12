import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          Ecommerce
        </Link>

        <div className={styles.links}>
          <Link to="/" className={styles.link}>
            Products
          </Link>

          <Link to="/cart" className={styles.link}>
            Cart
            <span className={styles.badge}>{items.length}</span>
          </Link>

          {!user && (
            <>
              <Link to="/login" className={styles.link}>
                Login
              </Link>
              <Link to="/register" className={styles.primaryBtn}>
                Register
              </Link>
            </>
          )}

          {user && (
            <>
              <Link to="/orders" className={styles.link}>
                My Orders
              </Link>

              {user.role === "admin" && (
                <>
                  <Link to="/admin" className={styles.adminLink}>
                    Dashboard
                  </Link>
                </>
              )}

              <button
                onClick={() => dispatch(logout())}
                className={styles.logoutBtn}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

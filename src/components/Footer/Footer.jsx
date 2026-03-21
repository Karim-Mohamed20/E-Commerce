import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>About Us</h3>
            <p className={styles.description}>
              Premium <span style={{color: '#111827', fontWeight: '600'}}>ecommerce</span> platform offering the finest selection of products with exceptional quality, style, and customer service.
            </p>
          </div>

          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Quick Links</h3>
            <ul className={styles.links}>
              <li>
                <Link to="/">Shop Now</Link>
              </li>
              <li>
                <Link to="/products">Products</Link>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>

          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Categories</h3>
            <ul className={styles.links}>
              <li>
                <a href="#mens">Men's Collection</a>
              </li>
              <li>
                <a href="#electronics">Electronics</a>
              </li>
              <li>
                <a href="#home">Home & Garden</a>
              </li>
              <li>
                <a href="#sports">Sports & Outdoors</a>
              </li>
            </ul>
          </div>

          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Support</h3>
            <ul className={styles.links}>
              <li>
                <a href="#shipping">Shipping Info</a>
              </li>
              <li>
                <a href="#returns">Returns</a>
              </li>
              <li>
                <a href="#track">Track Order</a>
              </li>
            </ul>
          </div>


        </div>

        <div className={styles.divider}></div>

        <div className={styles.bottom}>
          <div className={styles.bottomLeft}>
            <p>&copy; 2026 Premium Store. All rights reserved.</p>
          </div>
          <div className={styles.bottomCenter}>
            <ul className={styles.bottomLinks}>
              <li>
                <a href="#privacy">Privacy Policy</a>
              </li>
              <li>
                <a href="#terms">Terms & Conditions</a>
              </li>
              <li>
                <a href="#cookies">Cookie Policy</a>
              </li>
            </ul>
          </div>
          <div className={styles.bottomRight}>
            <div className={styles.paymentMethods}>
              <span>🔒 Secure Payments</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchProducts,
  searchProducts,
  fetchCategories,
} from "../../services/productsApi";
import ProductCard from "../../components/ProductCard/ProductCard";
import styles from "./Products.module.css";

const Products = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const limit = 12;

  const productsQuery = useQuery({
    queryKey: ["products", { page, limit }],
    queryFn: fetchProducts,
    enabled: !search && !category,
    keepPreviousData: true,
  });

  const searchQuery = useQuery({
    queryKey: ["search", search],
    queryFn: () => searchProducts(search),
    enabled: !!search,
  });

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const categoryQuery = useQuery({
    queryKey: ["category", category],
    queryFn: () =>
      fetch(`https://dummyjson.com/products/category/${category}`).then((res) =>
        res.json(),
      ),
    enabled: !!category,
  });

  // Default to men's shirts when viewing "all categories"
  const menShirtsQuery = useQuery({
    queryKey: ["category", "mens-shirts"],
    queryFn: () =>
      fetch(`https://dummyjson.com/products/category/mens-shirts`).then((res) =>
        res.json(),
      ),
    enabled: !search && !category,
  });

  const isLoading =
  productsQuery.isLoading ||
  searchQuery.isLoading ||
  categoryQuery.isLoading ||
  menShirtsQuery.isLoading;

  let products = search
    ? searchQuery.data?.products
    : category
      ? categoryQuery.data?.products
      : menShirtsQuery.data?.products;

  const hasNoResults =
    products && products.length === 0 && (search || category);

  // Sort categories - Men's items first
  const sortedCategories = (categoriesQuery.data || []).sort((a, b) => {
    const aMens = a.slug.includes("mens") ? 0 : 1;
    const bMens = b.slug.includes("mens") ? 0 : 1;
    return aMens - bMens;
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchSection}>
        <h1 className={styles.title}>Products</h1>
        <div className={styles.searchBox}>
          <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="M21 21l-4.35-4.35"></path>
          </svg>
          <input
            placeholder="Search products..."
            className={styles.input}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCategory("");
            }}
          />
        </div>
      </div>

      <div className={styles.categoriesSection}>
        <h2 className={styles.categoriesTitle}>Shop by Category</h2>
        <div className={styles.categoriesList}>
          <button
            className={`${styles.categoryBtn} ${category === "" ? styles.categoryActive : ""}`}
            onClick={() => {
              setCategory("");
              setSearch("");
            }}
          >
            All Categories
          </button>
          {sortedCategories?.map((cat) => (
            <button
              key={cat.slug}
              className={`${styles.categoryBtn} ${category === cat.slug ? styles.categoryActive : ""}`}
              onClick={() => {
                setCategory(cat.slug);
                setSearch("");
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.grid}>
  {isLoading ? (
    <p className={styles.loading}>Loading products...</p>
  ) : hasNoResults ? (
    <p className={styles.empty}>No products found</p>
  ) : (
    products?.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))
  )}
</div>


      {!search && !category && (
        <div className={styles.pagination}>
          <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
            Prev
          </button>

          <span>{page}</span>

          <button onClick={() => setPage((p) => p + 1)}>Next</button>
        </div>
      )}
    </div>
  );
};

export default Products;

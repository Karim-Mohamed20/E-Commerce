import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchProducts,
  searchProducts,
  fetchCategories,
} from "../services/productsApi";
import ProductCard from "../components/ProductCard";
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

  const isLoading =
  productsQuery.isLoading ||
  searchQuery.isLoading ||
  categoryQuery.isLoading;

  const products = search
    ? searchQuery.data?.products
    : category
      ? categoryQuery.data?.products
      : productsQuery.data?.products;

  const hasNoResults =
    products && products.length === 0 && (search || category);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Products</h1>

      <div className={styles.filters}>
        <input
          placeholder="Search products..."
          className={styles.input}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCategory("");
          }}
        />

        <select
          className={styles.select}
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setSearch("");
          }}
        >
          <option value="">All Categories</option>
          {categoriesQuery.data?.map((cat) => (
            <option key={cat.slug} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>
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

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../services/authApi";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (res) => {
      const { token, user } = res.data;

      dispatch(loginSuccess({ user, token }));

      // redirect based on role
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.email) {
      setError("Email field is required");
      return;
    }

    if (!form.password) {
      setError("Password field is required");
      return;
    }

    mutation.mutate(form);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>Login</h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            className={styles.input}
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          {error && <div className={styles.error}>{error}</div>}

          {mutation.isError && (
            <div className={styles.error}>
              Login failed, email or password is incorrect
            </div>
          )}

          <button
            className={`${styles.loginBtn} ${
              mutation.isLoading ? styles.disabledBtn : ""
            }`}
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <button
          className={styles.registerBtn}
          onClick={() => navigate("/register")}
        >
          Don’t have an account? Register
        </button>
      </div>
    </div>
  );
};

export default Login;

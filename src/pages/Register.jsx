import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../services/authApi";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => navigate("/login"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const { name, email, password, confirmPassword } = form;

    if (!name) {
      setError("Name field is required");
      return;
    }

    if (!email) {
      setError("Email field is required");
      return;
    }

    if (!password) {
      setError("Password field is required");
      return;
    }

    if (!confirmPassword) {
      setError("ConfirmPassword field is required");
      return;
    }


    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    mutation.mutate({ name, email, password });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>Create Account</h1>


        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

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

          <input
            className={styles.input}
            type="password"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({
                ...form,
                confirmPassword: e.target.value,
              })
            }
          />

        {error && <div className={styles.error}>{error}</div>}

        {mutation.isError && (
          <div className={styles.error}>
            {"Registration failed"}
          </div>
        )}

          <button
            className={`${styles.registerBtn} ${
              mutation.isLoading ? styles.disabledBtn : ""
            }`}
            disabled={mutation.isLoading}
          >
            {mutation.isLoading
              ? "Creating account..."
              : "Register"}
          </button>
        </form>

        <button
          className={styles.backBtn}
          onClick={() => navigate("/login")}
        >
          Already have an account? Login
        </button>
      </div>
    </div>
  );
};

export default Register;

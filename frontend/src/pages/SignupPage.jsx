import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SignupPage = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signup(formData);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 p-4">
      <form onSubmit={handleSubmit} className="glass-card w-full max-w-sm p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-indigo-200">PlaceMate AI</p>
        <h1 className="mb-1 mt-2 text-2xl font-semibold text-white">Create Account</h1>
        <p className="mb-4 text-sm text-slate-300">AI Placement & Career Readiness Platform</p>
        {error && (
          <p className="mb-3 rounded-xl border border-rose-400/40 bg-rose-500/20 p-2 text-sm text-rose-100">
            {error}
          </p>
        )}
        <input
          name="name"
          placeholder="Full name"
          className="input-modern mb-3"
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="input-modern mb-3"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="input-modern mb-4"
          onChange={handleChange}
          required
        />
        <button className="btn-primary w-full">
          Signup
        </button>
        <p className="mt-3 text-sm text-slate-300">
          Already have an account?{" "}
          <Link className="text-indigo-300 hover:text-indigo-200" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;

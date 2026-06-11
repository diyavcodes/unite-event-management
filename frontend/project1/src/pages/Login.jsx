import { useState } from "react";
import { api } from "../api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleLogin = async () => {
    try {
      const res = await api.post("/login", form);

      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("user", res.data.user);
      localStorage.setItem("role", res.data.role);

      alert("Login Success");
      window.location.href = "/";
    } catch (error) {
      console.log(error);

      if (error.response?.status === 404) {
        alert("User Not Found");
      } else if (error.response?.status === 401) {
        alert("Wrong Password");
      } else {
        alert("Login Failed");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-[#0f172a] to-black">

      <div className="w-full max-w-md bg-[#111827] border border-gray-800 p-8 rounded-2xl shadow-xl">

        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Login
        </h1>

        <input
          placeholder="Email"
          onChange={e => setForm({ ...form, email: e.target.value })}
          className="w-full mb-4 px-4 py-3 rounded-lg bg-black border border-gray-700 text-white outline-none focus:border-blue-500 transition"
        />

        <input
          type="password"
          placeholder="Password"
          onChange={e => setForm({ ...form, password: e.target.value })}
          className="w-full mb-6 px-4 py-3 rounded-lg bg-black border border-gray-700 text-white outline-none focus:border-blue-500 transition"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg font-semibold shadow-md"
        >
          Login
        </button>

      </div>

    </div>
  );
}
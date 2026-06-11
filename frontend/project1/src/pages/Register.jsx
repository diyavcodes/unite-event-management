import { useState } from "react";
import { api } from "../api";

export default function Register() {
  const [form, setForm] = useState({
  email: "",
  password: "",
  role: "user"
});
  const handleSubmit = async () => {
    await api.post("/register", form);
    alert("Registered!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-[#0f172a] to-black">

      <div className="w-full max-w-md bg-[#111827] border border-gray-800 p-8 rounded-2xl shadow-xl">

        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Register
        </h1>

        <select
  className="w-full p-3 bg-[#0f172a] border border-gray-700 rounded-lg text-white"
  onChange={(e) =>
    setForm({ ...form, role: e.target.value })
  }
>
  <option value="user">User</option>
  <option value="admin">Admin</option>
</select>

        <input
          placeholder="Name"
          onChange={e => setForm({ ...form, name: e.target.value })}
          className="w-full mb-4 px-4 py-3 rounded-lg bg-black border border-gray-700 text-white outline-none focus:border-blue-500 transition"
        />

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
          onClick={handleSubmit}
          className="w-full bg-green-600 hover:bg-green-700 transition text-white py-3 rounded-lg font-semibold shadow-md"
        >
          Register
        </button>

      </div>

    </div>
  );
}
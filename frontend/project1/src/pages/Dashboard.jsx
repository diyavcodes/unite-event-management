import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

import { useEffect, useState } from "react";
import { api } from "../api";

export default function AdminDashboard() {

  const [data, setData] = useState(null);

  // FETCH ANALYTICS
  const fetchAnalytics = async () => {

    try {

      const res = await api.get("/analytics");

      setData(res.data);

    } catch (error) {

      console.log(error.response || error);

    }
  };

  // LOAD DATA
  useEffect(() => {

    const load = async () => {

      await fetchAnalytics();

    };

    load();

  }, []);

  // LOADING SCREEN
  if (!data) {

    return (

      <div className="min-h-screen bg-gradient-to-b from-black via-[#0f172a] to-black flex items-center justify-center">

        <h1 className="text-2xl font-semibold text-gray-300">
          Loading Dashboard...
        </h1>

      </div>
    );
  }

  // CHART DATA
  const chartData = data.events.map((event) => ({
  title: event.title,
  registrations: event.registrations
}));

  return (

    <div className="min-h-screen bg-gradient-to-b from-black via-[#0f172a] to-black text-white p-6">

      {/* PAGE HEADER */}
      <div className="mb-10">

        <h1 className="text-4xl font-bold tracking-wide">
          Admin Dashboard
        </h1>

        <p className="text-gray-400 mt-2 text-lg">
          College Event Management Analytics & Reports
        </p>

      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

        {/* TOTAL EVENTS */}
        <div className="bg-[#111827] border border-gray-800 rounded-2xl p-8 shadow-lg hover:border-blue-500 transition">

          <h2 className="text-gray-400 text-lg font-medium">
            Total Events Created
          </h2>

          <p className="text-5xl font-bold mt-4 text-white">
            {data.total_events}
          </p>

        </div>

        {/* TOTAL REGISTRATIONS */}
        <div className="bg-[#111827] border border-gray-800 rounded-2xl p-8 shadow-lg hover:border-green-500 transition">

          <h2 className="text-gray-400 text-lg font-medium">
            Total Registrations
          </h2>

          <p className="text-5xl font-bold mt-4 text-white">
            {data.total_registrations}
          </p>

        </div>

      </div>

      {/* EVENTS TABLE */}
      <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 shadow-lg mb-10 overflow-x-auto">

        <div className="flex items-center justify-between mb-6">

          <h2 className="text-2xl font-semibold">
            Created Events
          </h2>

          <span className="text-gray-400 text-sm">
            Event Overview
          </span>

        </div>

        <table className="w-full border-collapse">

          <thead>

            <tr className="border-b border-gray-700 text-gray-400">

              <th className="text-left py-4 px-4">
                Event Title
              </th>

              <th className="text-left py-4 px-4">
                Category
              </th>

              <th className="text-left py-4 px-4">
                Date
              </th>

              <th className="text-left py-4 px-4">
                Location
              </th>

              <th className="text-left py-4 px-4">
                Registrations
              </th>

            </tr>

          </thead>

          <tbody>

            {data.events.map((event, index) => (

              <tr
                key={index}
                className="border-b border-gray-800 hover:bg-[#0f172a] transition"
              >

                <td className="py-4 px-4 font-medium text-white">
                  {event.title}
                </td>

                <td className="py-4 px-4 text-gray-300">
                  {event.category}
                </td>

                <td className="py-4 px-4 text-gray-300">
                  {event.date}
                </td>

                <td className="py-4 px-4 text-gray-300">
                  {event.location}
                </td>

                <td className="py-4 px-4 text-blue-400 font-semibold">
                  {event.registrations}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* BAR CHART */}
      <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 shadow-lg">

        <div className="mb-6">

          <h2 className="text-2xl font-semibold">
            Registrations Per Event
          </h2>

          <p className="text-gray-400 mt-1">
            Visualization of users registered in each event
          </p>

        </div>

        <div className="w-full h-[420px]">

          <ResponsiveContainer width="100%" height="100%">

  <BarChart
    data={chartData}
    margin={{
      top: 20,
      right: 30,
      left: 10,
      bottom: 80
    }}
  >

    <CartesianGrid
      strokeDasharray="3 3"
      stroke="#374151"
    />

    <XAxis
      dataKey="title"
      stroke="#9ca3af"
      tick={{ fill: "#9ca3af", fontSize: 12 }}
      angle={-15}
      textAnchor="end"
      interval={0}
    />

    <YAxis
      stroke="#9ca3af"
      tick={{ fill: "#9ca3af" }}
    />

    <Tooltip
      contentStyle={{
        backgroundColor: "#111827",
        border: "1px solid #374151",
        borderRadius: "12px",
        color: "#fff"
      }}
    />

    <Bar
      dataKey="registrations"
      fill="#2563eb"
      radius={[8, 8, 0, 0]}
    />

  </BarChart>

</ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}
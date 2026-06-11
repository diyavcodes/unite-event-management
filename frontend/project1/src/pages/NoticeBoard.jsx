import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";

export default function NoticeBoard() {

  const [notices, setNotices] = useState([]);
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {

    const fetchData = async () => {

      try {

        const res = await api.get("/all-announcements");
        console.log("Announcements:", res.data);

        setNotices(res.data);

        const userEmail =
          localStorage.getItem("user");

        if (userEmail) {

          const regRes = await api.get(
            `/my-events/${userEmail}`
          );

          setRegistrations(regRes.data);
        }

      } catch (error) {

        console.log(error);

      }
    };

    fetchData();

  }, []);

  if (registrations.length === 0) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-[#0f172a] to-black text-white p-6">

        <div className="bg-[#111827] border border-gray-700 rounded-2xl p-8 text-center shadow-2xl max-w-md w-full">

          

          <p className="text-gray-400 mb-6">
            Register in events to see notices.
          </p>

          <Link
            to="/"
            className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-xl transition"
          >
            Go To Events
          </Link>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0f172a] to-black p-6">

      {/* HEADER */}
      <h1 className="text-4xl font-bold mb-10 text-white text-center">
        📢 Notice Board
      </h1>

      {/* EMPTY STATE */}
      {notices.length === 0 ? (
        <p className="text-gray-500 text-center">
          No announcements yet
        </p>
      ) : (
        <div className="max-w-4xl mx-auto space-y-5">

          {notices.map((notice, index) => (
            <div
              key={index}
              className="bg-[#111827] border border-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:scale-[1.01] transition"
            >

              <h2 className="text-2xl font-bold text-white mb-2">
                {notice.title}
              </h2>

              <p className="text-gray-300 leading-relaxed">
                {notice.message}
              </p>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}
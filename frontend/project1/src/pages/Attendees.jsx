import { useEffect, useState } from "react";
import { api } from "../api";

export default function Attendees() {

  const [attendees, setAttendees] = useState([]);

  useEffect(() => {

    const loadData = async () => {

      try {

        const res = await api.get("/attendees/1");

        setAttendees(res.data);

      } catch (error) {

        console.log(error);

      }
    };

    loadData();

  }, []);

  const markAttendance = async (id) => {

    try {

      const res = await api.put(`/check-in/${id}`);

      alert(res.data.message);

      const updated = await api.get("/attendees/1");

      setAttendees(updated.data);

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-b from-black via-[#0f172a] to-black text-white p-6 md:p-10">

      {/* HEADER */}
      <div className="mb-10">

        <h1 className="text-4xl font-bold tracking-tight">
          Event Attendees
        </h1>

        <p className="text-gray-400 mt-2 text-lg">
          Manage student attendance and check-ins
        </p>

      </div>

      {/* EMPTY STATE */}
      {attendees.length === 0 ? (

        <div className="bg-[#111827] border border-gray-800 rounded-3xl p-10 text-center shadow-xl">

          <h2 className="text-2xl font-semibold text-gray-300">
            No attendees found
          </h2>

          <p className="text-gray-500 mt-2">
            Registrations will appear here
          </p>

        </div>

      ) : (

        <div className="grid gap-6">

          {attendees.map((user) => (

            <div
              key={user.id}
              className="bg-[#111827]/90 backdrop-blur-lg border border-gray-800 hover:border-blue-500 rounded-3xl p-6 shadow-xl transition-all duration-300 hover:scale-[1.01]"
            >

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                {/* LEFT */}
                <div className="space-y-3">

                  <div>

                    <h2 className="text-2xl font-semibold text-white break-all">
                      {user.user_email}
                    </h2>

                    <p className="text-gray-500 mt-1">
                      Registered Attendee
                    </p>

                  </div>

                  <div className="flex flex-wrap gap-3">

                    <div className="bg-[#0f172a] border border-gray-700 px-4 py-2 rounded-xl">

                      <p className="text-xs text-gray-500 uppercase tracking-wide">
                        Event ID
                      </p>

                      <p className="text-white font-medium">
                        {user.event_id}
                      </p>

                    </div>

                    <div
                      className={`px-4 py-2 rounded-xl border ${
                        user.attended
                          ? "bg-green-500/10 border-green-500/30"
                          : "bg-red-500/10 border-red-500/30"
                      }`}
                    >

                      <p className="text-xs text-gray-400 uppercase tracking-wide">
                        Attendance
                      </p>

                      <p
                        className={`font-semibold ${
                          user.attended
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {user.attended
                          ? "Present"
                          : "Not Checked-In"}
                      </p>

                    </div>

                  </div>

                </div>

                {/* RIGHT */}
                <div>

                  {!user.attended ? (

                    <button
                      onClick={() => markAttendance(user.id)}
                      className="bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all duration-200 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg"
                    >
                      Check In
                    </button>

                  ) : (

                    <button
                      disabled
                      className="bg-green-500/20 border border-green-500/30 text-green-400 px-6 py-3 rounded-2xl font-semibold cursor-not-allowed"
                    >
                      Attendance Marked
                    </button>

                  )}

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}
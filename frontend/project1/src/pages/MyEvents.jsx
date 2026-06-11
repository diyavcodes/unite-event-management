import { useEffect, useState } from "react";
import { api } from "../api";

export default function MyEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const res = await api.get(
          `/my-events/${localStorage.getItem("user")}`
        );
        console.log(res.data);
        setEvents(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMyEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0f172a] to-black p-6">

      {/* HEADER */}
      <h1 className="text-4xl font-bold mb-10 text-white text-center">
        My Events
      </h1>

      {events.length === 0 ? (
        <p className="text-gray-500 text-center">
          No events registered yet
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">

          {events.map((event) => (
            <div
              key={event.id}
              className="bg-[#111827] border border-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition"
            >

              <h2 className="text-2xl font-bold text-white">
                {event.event_title}
              </h2>

              <p className="mt-2 text-gray-400">
                Registered Successfully
              </p>

              <p className="mt-3 font-semibold">
  Status:
  <span
    className={
      event.attended
        ? "text-green-400 ml-2"
        : "text-yellow-400 ml-2"
    }
  >
    {event.attended
      ? "Attendance Verified"
      : "Awaiting Attendance Verification"}
  </span>
</p>

              {event.status !== "Cancelled" && event.attendance === "Present" ? (

  <button
    className="mt-5 w-full bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-lg font-medium"
    onClick={async () => {

      const res = await api.get(
        `/generate-certificate?email=${localStorage.getItem(
          "user"
        )}&event_id=${event.event_id}`
      );

      alert(res.data.file);

    }}
  >

    🎓 Generate Certificate
  </button>

) :event.status === "Cancelled" ?  (

   <button
    disabled
    className="bg-red-900/40 text-red-300"
  >
    Event Cancelled
  </button>
):(

  <button
  disabled
  className="mt-5 w-full bg-gray-700 text-gray-300 px-4 py-2 rounded-lg cursor-not-allowed"
>
  Certificate will be available after attendance verification
</button>

)}

{event.status === "Cancelled" ? (

  <p className="mt-3 text-red-400 font-semibold">
    ❌ Event Cancelled By Organizer
  </p>

) : (

  <p className="mt-3 text-green-400 font-semibold">
    Status: {event.status}
  </p>

)}

            </div>
          ))}

        </div>
      )}

    </div>
  );
}
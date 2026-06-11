import { useEffect, useState } from "react";
import { api } from "../api";

export default function Recommendations() {
  const [events, setEvents] = useState([]);

  const fetchRecommendations = async () => {
    try {
      const res = await api.get("/recommend-events");
      setEvents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const load = async () => {
      await fetchRecommendations();
    };

    load();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0f172a] to-black p-6">

      <h1 className="text-4xl font-bold mb-8 text-white text-center">
        Recommended Events
      </h1>

      {events.length === 0 ? (
        <p className="text-gray-400 text-center">
          No recommendations available
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">

          {events.map((event) => (
            <div
              key={event.id}
              className="bg-[#111827] border border-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition duration-300"
            >

              <h2 className="text-2xl font-bold text-white">
                {event.title}
              </h2>

              <p className="mt-3 text-gray-300">
                {event.description}
              </p>

              <div className="mt-4 flex flex-col gap-2 text-sm">

                <p className="text-gray-400">
                  🏷️ <span className="text-gray-200">{event.category}</span>
                </p>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";

import NotificationBell from "../pages/Notification";

export default function Events() {

  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const fetchEvents = async () => {
  try {

    const res = await api.get("/events");

    console.log(res.data);

    setEvents(res.data);

    const userEmail =
      localStorage.getItem("user");

    if (userEmail) {

      const regRes = await api.get(
        `/my-events/${userEmail}`
      );

      setRegisteredEvents(regRes.data);
    }

  } catch (error) {

    console.log(error);

  }
};

  useEffect(() => {
    const load = async () => {
      await fetchEvents();
    };
    load();
  }, []);

  useEffect(() => {
    const socket = new WebSocket("import.meta.env.VITE_WS_URL");

    socket.onmessage = () => {
      fetchEvents();
    };

    return () => socket.close();
  }, []);

  const registerEvent = async (event) => {

  const user = localStorage.getItem("user");

  if (!user) {

    setShowLoginPopup(true);

    return;
  }

  try {

    const res = await api.post("/register-event", {
      user_email: user,
      event_id: event.id,
      event_title: event.title
    });

    alert(res.data.message);

  } catch (error) {

    console.log(error);

    alert("Registration Failed");

  }
};

  const addReview = async (eventId) => {

    console.log(localStorage.getItem("token"));
    try {
      await api.post("/reviews", {
        event_id: eventId,
        comment,
        rating
      });

      alert("Review Added");
    } catch (error) {
      console.log(error);
    }
  };

  const btnDark =
    "px-3 py-2 rounded-lg text-sm bg-[#1f2937] border border-gray-700 hover:bg-[#111827] hover:border-gray-500 transition text-gray-200";

  const isAdmin =
    localStorage.getItem("role") === "admin";

  const isRegistered = (eventId) => {

  return registeredEvents.some(
    (event) => event.id === eventId
  );
};

  return (
    <div className="p-6 min-h-screen bg-gradient-to-b from-black via-[#0f172a] to-black text-white">

      {/* HERO SECTION */}
      <section className="pb-10 relative overflow-hidden">

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center relative z-10">

          {/* LEFT CONTENT */}
          <div className="text-center lg:text-left">

            {/* small brand */}
            <div className="mb-4">
              <span className="text-gray-400 font-light tracking-wide">
                unite<span className="text-blue-400">*</span>
              </span>
            </div>

            {/* heading */}
            <h1 className="text-5xl sm:text-6xl font-bold mb-5 leading-[0.95] tracking-tight text-white">
              Discover &<br />
              manage college<br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                events.
              </span>
            </h1>

            {/* subtitle */}
            <p className="text-lg sm:text-xl text-gray-400 mb-8 max-w-lg font-light">
              Create, explore, and register for events in real time.
              Stay updated with AI-powered recommendations and live notifications.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">

              <button
                onClick={() => {
                  document
                    .getElementById("events-section")
                    ?.scrollIntoView({
                      behavior: "smooth"
                    });
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
              >
                Explore Events
              </button>

            </div>

          </div>

        </div>

      </section>

      {/* NOTIFICATIONS */}
      {/* NOTIFICATIONS */}
{registeredEvents.length > 0 && (

  <div className="mb-6 bg-[#111827] border border-gray-800 rounded-2xl p-4 shadow-lg">

    <NotificationBell />

  </div>

)}

      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-6 tracking-wide">
        Events
      </h1>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search events..."
        className="w-full p-3 mb-4 bg-[#111827] border border-gray-700 rounded-xl outline-none focus:border-gray-400 transition"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* CATEGORY */}
      <select
  className="w-full p-3 mb-6 bg-[#111827] border border-gray-700 rounded-xl text-white"
  onChange={(e) => setCategory(e.target.value)}
>
  <option value="">
    All Categories
  </option>

  <option value="Technical Club">
    Technical Club
  </option>

  <option value="Coding Club">
    Coding Club
  </option>

  <option value="AI & ML Club">
    AI & ML Club
  </option>

  <option value="Robotics Club">
    Robotics Club
  </option>

  <option value="Innovation Club">
    Innovation Club
  </option>

  <option value="Cultural Club">
    Cultural Club
  </option>

  <option value="Dance Club">
    Dance Club
  </option>

  <option value="Music Club">
    Music Club
  </option>

  <option value="Drama Club">
    Drama Club
  </option>

  <option value="Arts & Crafts Club">
    Arts & Crafts Club
  </option>

  <option value="Gaming Club">
    Gaming Club
  </option>

  <option value="Literary Club">
    Literary Club
  </option>

  <option value="Public Speaking Club">
    Public Speaking Club
  </option>

  <option value="Social Welfare Club">
    Social Welfare Club
  </option>

  <option value="Environmental Club">
    Environmental Club
  </option>

  <option value="Sports & Wellness Club">
    Sports & Wellness Club
  </option>

  <option value="Energy & Sustainability Club">
    Energy & Sustainability Club
  </option>

  <option value="Civil Engineering Club">
    Civil Engineering Club
  </option>

  <option value="MUN Club">
    MUN Club
  </option>

</select>

      {/* EVENTS SECTION */}
      <div
        id="events-section"
        className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide"
      >

        {events
  .filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "" || event.category === category;

    const notCancelled =
      event.status !== "cancelled";

    return (
      matchesSearch &&
      matchesCategory &&
      notCancelled
    );
  })
          .map((event) => (
            <Link
              to={`/event/${event.id}`}
              key={event.id}
              className="min-w-[350px] max-w-[350px] flex-shrink-0"
            >

              <div className="bg-[#111827] border border-gray-800 rounded-2xl p-5 shadow-lg hover:scale-[1.02] transition h-full">

                <img
                  src={`http://127.0.0.1:8000/${event.image}`}
                  className="w-full h-48 object-cover rounded-xl border border-gray-700"
                />

                <h2 className="text-xl font-bold mt-4">{event.title}</h2>

                <p className="mt-2 text-gray-400">{event.description}</p>

                <p className="mt-2 text-gray-300">📍 {event.location}</p>
                <p className="mt-1 text-gray-300">🏷️ {event.category}</p>
                <p className="mt-1 text-gray-300">📅 {event.date}</p>
                <p className="mt-1 text-gray-300">👤 {event.organizer}</p>

                {/* BUTTONS */}
                <div className="mt-4 flex flex-wrap gap-2">

                  {!isRegistered(event.id) ? (

  <button
    onClick={(e) => {
      e.preventDefault();
      registerEvent(event);
    }}
    className={btnDark}
  >
    Register
  </button>

) : (

  <button
    disabled
    className="px-3 py-2 rounded-lg text-sm bg-green-900/40 border border-green-500/30 text-green-300 cursor-not-allowed"
  >
    ✓ Registered
  </button>

)}

                  <button
                    onClick={(e) => {
                      e.preventDefault();

                      const startDate = new Date(event.date)
                        .toISOString()
                        .replace(/-|:|\.\d+/g, "");

                      const endDate = new Date(
                        new Date(event.date).getTime() + 2 * 60 * 60 * 1000
                      )
                        .toISOString()
                        .replace(/-|:|\.\d+/g, "");

                      const googleUrl =
                        `https://calendar.google.com/calendar/render?action=TEMPLATE` +
                        `&text=${encodeURIComponent(event.title)}` +
                        `&details=${encodeURIComponent(event.description)}` +
                        `&location=${encodeURIComponent(event.location)}` +
                        `&dates=${startDate}/${endDate}`;

                      window.open(googleUrl, "_blank");
                    }}
                    className={btnDark}
                  >
                    Calendar
                  </button>

                  {isAdmin && (
                    <>
                      <button
  onClick={async (e) => {
    e.preventDefault();

    try {

      const res = await api.put(
        `/cancel-event/${event.id}`
      );

      console.log("SUCCESS:", res.data);

      alert("Event cancelled");

      fetchEvents();

    } catch (error) {

      console.log("ERROR:", error);

      console.log(
        error.response?.data
      );

      alert(
        error.response?.data?.detail ||
        "Cancel failed"
      );
    }
  }}
  className={btnDark}
>
  Cancel
</button>

                      <button
                        onClick={async (e) => {
                          e.preventDefault();

                          const newDate = prompt("New Date");
                          const newTime = prompt("New Time");

                          await api.put(`/reschedule-event/${event.id}`, {
                            date: newDate,
                            time: newTime
                          });

                          fetchEvents();
                        }}
                        className={btnDark}
                      >
                        Reschedule
                      </button>

                      <button
                        onClick={async (e) => {
                          e.preventDefault();

                          const title = prompt("Announcement Title");
                          const message = prompt("Message");

                          await api.post(`/announce/${event.id}`, {
                            title,
                            message
                          });
                        }}
                        className={btnDark}
                      >
                        Announce
                      </button>
                    </>
                  )}

                </div>

                {/* REVIEW */}
               {/* REVIEW SECTION */}
{!isAdmin && isRegistered(event.id) && (

  <div>

    <textarea
      className="w-full mt-4 p-2 bg-[#0f172a] border border-gray-700 rounded-lg text-white"
      placeholder="Write review..."
      onClick={(e) => e.preventDefault()}
      onChange={(e) => setComment(e.target.value)}
    />

    <select
      className="w-full mt-2 p-2 bg-[#0f172a] border border-gray-700 rounded-lg text-white"
      onClick={(e) => e.preventDefault()}
      onChange={(e) => setRating(e.target.value)}
    >
      <option value="5">5 ⭐</option>
      <option value="4">4 ⭐</option>
      <option value="3">3 ⭐</option>
      <option value="2">2 ⭐</option>
      <option value="1">1 ⭐</option>
    </select>

    <button
      onClick={(e) => {
        e.preventDefault();
        addReview(event.id);
      }}
      className="mt-3 w-full bg-[#1f2937] border border-gray-700 hover:bg-[#0b0f19] text-white py-2 rounded-lg transition"
    >
      Submit Review
    </button>

  </div>
)}

              </div>
            </Link>
          ))}
      </div>
      {showLoginPopup && (

  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

    <div className="bg-[#111827] border border-gray-700 rounded-2xl p-8 w-[90%] max-w-md text-center shadow-2xl">

      <h2 className="text-2xl font-bold text-white mb-4">
        Login Required
      </h2>

      <p className="text-gray-400 mb-6">
        You need to login first to register for events.
      </p>

      <div className="flex justify-center gap-4">

        <button
          onClick={() => setShowLoginPopup(false)}
          className="px-5 py-2 rounded-xl bg-gray-800 border border-gray-600 text-white hover:bg-gray-700 transition"
        >
          Close
        </button>

        <button
          onClick={() => {
            window.location.href = "/login";
          }}
          className="px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Login
        </button>

      </div>

    </div>

  </div>
)}
    </div>
  );
}
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api";

export default function EventDetails() {

  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {

    const loadData = async () => {

      try {

        const eventRes = await api.get(`/events/${id}`);
        setEvent(eventRes.data);

        const reviewRes = await api.get(`/reviews/${id}`);
        setReviews(reviewRes.data);

      } catch (error) {

        console.log(error);

      }
    };

    loadData();

  }, [id]);

  if (!event) {

    return (

      <div className="min-h-screen bg-black flex items-center justify-center text-white font-light tracking-wide">

        <p className="text-xl">
          Loading Event...
        </p>

      </div>

    );
  }

  if (event?.status === "cancelled") {

  return (

    <div className="min-h-screen bg-black flex items-center justify-center text-white">

      <div className="text-center">

        <h1 className="text-4xl font-bold text-red-500">
          Event Cancelled
        </h1>

        <p className="text-gray-400 mt-3">
          This event is no longer available.
        </p>

      </div>

    </div>

  );
}

  return (

    <div className="min-h-screen w-full bg-gradient-to-b from-[#050505] via-[#0b1120] to-black text-white p-6 font-light tracking-wide">

      {/* IMAGE */}
      <div className="relative overflow-hidden rounded-[36px] border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.7)]">

        <img
          src={`http://127.0.0.1:8000/${event.image}`}
          alt="event"
          className="w-full h-[450px] object-cover"
        />

        {/* GLASS OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

      </div>
  
      {/* EVENT DETAILS */}
      <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-black/40 backdrop-blur-[35px] shadow-[0_8px_40px_rgba(0,0,0,0.7)] mt-8">

        {/* GLASS LIGHT */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-white/[0.03]"></div>

        {/* BLUE GLOW */}
        <div className="absolute -top-20 left-0 h-72 w-72 bg-blue-500/10 blur-3xl rounded-full"></div>

        {/* PURPLE GLOW */}
        <div className="absolute bottom-0 right-0 h-72 w-72 bg-purple-500/10 blur-3xl rounded-full"></div>

        <div className="relative z-10 p-8">

          {/* LABEL */}
          <p className="text-[11px] uppercase tracking-[0.25em] text-gray-500">
            Featured Event
          </p>

          {/* TITLE */}
          <h1 className="text-5xl font-light text-white mt-4 tracking-wide">
            {event.title}
          </h1>

          {/* DESCRIPTION */}
          <p className="mt-6 text-gray-400 text-lg leading-relaxed tracking-wide">
            {event.description}
          </p>

          {/* INFO GRID */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-5">

              <p className="text-[11px] uppercase tracking-[0.25em] text-gray-500">
                Event Location
              </p>

              <p className="text-white mt-3 text-lg">
                📍 {event.location}
              </p>

            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-5">

              <p className="text-[11px] uppercase tracking-[0.25em] text-gray-500">
                Event Date
              </p>

              <p className="text-white mt-3 text-lg">
                📅 {event.date}
              </p>

            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-5">

              <p className="text-[11px] uppercase tracking-[0.25em] text-gray-500">
                Event Category
              </p>

              <p className="text-white mt-3 text-lg">
                🏷️ {event.category}
              </p>

            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-5">

              <p className="text-[11px] uppercase tracking-[0.25em] text-gray-500">
                Organized By
              </p>

              <p className="text-white mt-3 text-lg">
                👤 {event.organizer}
              </p>

            </div>

          </div>

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-4 mt-10">

            {[
              "Register",
              "Add To Calendar",
              "Cancel Event",
              "Reschedule",
              "Generate QR",
              "Google Calendar",
              "Send Announcement"
            ].map((btn, index) => (

              <button
                key={index}
                className="rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-xl px-5 py-3 text-sm text-white hover:bg-white/[0.10] hover:border-white/20 transition-all duration-300 tracking-wide"
              >
                {btn}
              </button>

            ))}

          </div>

        </div>

      </div>

      {/* REVIEWS */}
      <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-black/40 backdrop-blur-[35px] shadow-[0_8px_40px_rgba(0,0,0,0.7)] mt-8">

        {/* GLASS */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-white/[0.03]"></div>

        <div className="relative z-10 p-8">

          <p className="text-[11px] uppercase tracking-[0.25em] text-gray-500">
            User Feedback
          </p>

          <h2 className="text-3xl font-light text-white mt-3">
            Reviews
          </h2>

          {reviews.length === 0 ? (

            <div className="text-center py-20">

              <p className="text-gray-500 text-lg">
                No reviews yet
              </p>

            </div>

          ) : (

            <div className="space-y-5 mt-8">

              {reviews.map((review) => (

                <div
                  key={review.id}
                  className="rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-6"
                >

                  <p className="text-[11px] uppercase tracking-[0.25em] text-gray-500">
                    Event Review
                  </p>

                  <p className="text-white text-lg mt-3">
                    {review.user_email}
                  </p>

                  <p className="mt-4 text-gray-400 leading-relaxed">
                    {review.comment}
                  </p>

                  <p className="mt-4 text-yellow-400 tracking-wide">
                    ⭐ {review.rating}/5
                  </p>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}
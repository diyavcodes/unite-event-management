import { useEffect, useState } from "react";
import { api } from "../api";

export default function NotificationBell() {

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {

    const loadNotifications = async () => {

      try {

        const res = await api.get(
          `/notifications/${localStorage.getItem("user")}`
        );

        if (Array.isArray(res.data)) {

          setNotifications(res.data);

        } else {

          setNotifications([]);

        }

      } catch (error) {

        console.log(error);

        setNotifications([]);

      }
    };

    loadNotifications();

  }, []);

  return (

    <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-black/40 backdrop-blur-[35px] shadow-[0_8px_40px_rgba(0,0,0,0.7)] font-light tracking-wide">

      {/* GLASS OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-white/[0.03] pointer-events-none"></div>

      {/* BLUE GLOW */}
      <div className="absolute -top-24 left-0 h-72 w-72 bg-blue-500/10 blur-3xl rounded-full"></div>

      {/* PURPLE GLOW */}
      <div className="absolute bottom-0 right-0 h-72 w-72 bg-purple-500/10 blur-3xl rounded-full"></div>

      <div className="relative z-10">

        {/* HEADER */}
        <div className="flex items-center justify-between px-7 py-6 border-b border-white/10">

          <div>

            <p className="text-[11px] uppercase tracking-[0.25em] text-gray-500">
              Event Center
            </p>

            <h2 className="text-2xl font-light text-white flex items-center gap-3 mt-2 tracking-wide">
              Notifications
            </h2>

            <p className="text-sm text-gray-400 mt-2 tracking-wide">
              Latest event alerts & announcements
            </p>

          </div>

          <div className="flex items-center justify-center min-w-[52px] h-12 px-4 rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-xl">

            <span className="text-white text-sm tracking-wider">
              {notifications.length}
            </span>

          </div>

        </div>

        {/* EMPTY */}
        {notifications.length === 0 ? (

          <div className="flex flex-col items-center justify-center py-24 px-6 text-center">

            

            <p className="text-[11px] uppercase tracking-[0.25em] text-gray-500">
              Notification Center
            </p>

            <h3 className="text-xl font-light text-white mt-3 tracking-wide">
              No Notifications
            </h3>

            <p className="text-gray-500 text-sm mt-2 tracking-wide">
              Updates will appear here
            </p>

          </div>

        ) : (

          <div className="p-5 space-y-4 max-h-[520px] overflow-y-auto">

            {notifications.map((note, index) => (

              <div
                key={index}
                className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl px-5 py-5 transition-all duration-300 hover:bg-white/[0.07] hover:border-white/20 hover:scale-[1.01]"
              >

                {/* IOS SHINE */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.10] via-transparent to-transparent opacity-70 pointer-events-none"></div>

                <div className="relative z-10">

                  {/* LABEL */}
                  <p className="text-[11px] uppercase tracking-[0.25em] text-gray-500">
                    Event Update
                  </p>

                  {/* CONTENT */}
                  <div className="flex justify-between items-start gap-4 mt-3">

                    <div>

                      <h3 className="text-lg font-light text-white tracking-wide">
                        {note.title}
                      </h3>

                      <p className="text-sm text-gray-400 leading-relaxed mt-3 tracking-wide">
                        {note.message}
                      </p>

                    </div>

                    <div className="h-3 w-3 rounded-full bg-blue-400 shadow-[0_0_14px_rgba(96,165,250,0.9)] mt-2"></div>

                  </div>

                  {/* FOOTER */}
                  <div className="flex items-center justify-between mt-6">

                    <p className="text-[11px] uppercase tracking-[0.25em] text-gray-500">
                      Live Notification
                    </p>

                    <button className="text-sm text-blue-400 hover:text-blue-300 transition tracking-wide">
                      Open
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}
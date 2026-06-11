import { useEffect, useState } from "react";
import { api } from "../api";

export default function CoordinatorDashboard() {

  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  const role = localStorage.getItem("role");

  useEffect(() => {

    const fetchAdmins = async () => {

      if (role !== "coordinator") {
        setLoading(false);
        return;
      }

      try {

        const res = await api.get("/pending-admins");

        setAdmins(res.data || []);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }
    };

    fetchAdmins();

  }, []);

  const approveAdmin = async (id) => {

    try {

      await api.put(`/approve-admin/${id}`);

      setAdmins((prev) =>
        prev.filter((admin) => admin.id !== id)
      );

      alert("Admin Approved");

    } catch (error) {

      console.log(error);

      alert("Approval Failed");

    }
  };

  const rejectAdmin = async (id) => {

    try {

      await api.put(`/reject-admin/${id}`);

      setAdmins((prev) =>
        prev.filter((admin) => admin.id !== id)
      );

      alert("Admin Rejected");

    } catch (error) {

      console.log(error);

      alert("Reject Failed");

    }
  };

  if (role !== "coordinator") {

    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          Access Denied
        </h1>
      </div>
    );
  }

  if (loading) {

    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-2xl">
          Loading...
        </h1>
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gradient-to-b from-black via-[#0f172a] to-black text-white p-8">

      <h1 className="text-4xl font-bold mb-8">
        Coordinator Dashboard
      </h1>

      <h2 className="text-xl text-gray-400 mb-6">
        Pending Admin Requests
      </h2>

      {admins.length === 0 ? (

        <div className="bg-[#111827] border border-gray-700 rounded-2xl p-6">
          No Pending Requests
        </div>

      ) : (

        <div className="space-y-5">

          {admins.map((admin) => (

            <div
              key={admin.id}
              className="bg-[#111827] border border-gray-700 rounded-2xl p-6"
            >

              <h3 className="text-2xl font-semibold">
                {admin.name}
              </h3>

              <p className="text-gray-400 mt-2">
                {admin.email}
              </p>

              <p className="text-yellow-400 mt-2">
                Requested Role: {admin.role}
              </p>

              <div className="flex gap-4 mt-5">

                <button
                  onClick={() => approveAdmin(admin.id)}
                  className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-xl"
                >
                  Approve
                </button>

                <button
                  onClick={() => rejectAdmin(admin.id)}
                  className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-xl"
                >
                  Reject
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );
}
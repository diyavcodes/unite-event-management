import { useState } from "react";
import { api } from "../api";

export default function CreateEvent() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    date: "",
    time: "",
    organizer: "",
    image: null
  });

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("category", form.category);
      formData.append("location", form.location);
      formData.append("date", form.date);
      formData.append("time", form.time);
      formData.append("organizer", form.organizer);
      formData.append("image", form.image);

      await api.post("/events", formData);

      alert("Event Created!");
    } catch (error) {
      console.log(error);
      alert("Failed to create event");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-[#0f172a] to-black text-white p-6">

      <div className="w-full max-w-xl bg-[#111827] border border-gray-800 shadow-2xl rounded-2xl p-8">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Create Event
        </h1>

        <div className="space-y-4">

          <input
            placeholder="Title"
            className="w-full p-3 bg-[#0f172a] border border-gray-700 rounded-lg text-white outline-none focus:border-blue-500"
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <textarea
            placeholder="Description"
            className="w-full p-3 bg-[#0f172a] border border-gray-700 rounded-lg text-white outline-none focus:border-blue-500"
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <select
  className="w-full p-3 bg-[#0f172a] border border-gray-700 rounded-lg text-white outline-none focus:border-blue-500"
  value={form.category}
  onChange={(e) =>
    setForm({ ...form, category: e.target.value })
  }
>

  <option value="">
    Select Category
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

          <input
            placeholder="Location"
            className="w-full p-3 bg-[#0f172a] border border-gray-700 rounded-lg text-white outline-none focus:border-blue-500"
            onChange={(e) =>
              setForm({ ...form, location: e.target.value })
            }
          />

          <input
            type="date"
            className="w-full p-3 bg-[#0f172a] border border-gray-700 rounded-lg text-white outline-none focus:border-blue-500"
            onChange={(e) =>
              setForm({ ...form, date: e.target.value })
            }
          />

          <input
            type="time"
            className="w-full p-3 bg-[#0f172a] border border-gray-700 rounded-lg text-white outline-none focus:border-blue-500"
            onChange={(e) =>
              setForm({ ...form, time: e.target.value })
            }
          />

          <input
            placeholder="Organizer"
            className="w-full p-3 bg-[#0f172a] border border-gray-700 rounded-lg text-white outline-none focus:border-blue-500"
            onChange={(e) =>
              setForm({ ...form, organizer: e.target.value })
            }
          />

          <input
            type="file"
            className="w-full p-3 bg-[#0f172a] border border-gray-700 rounded-lg text-white file:bg-gray-800 file:text-white file:border-0 file:px-3 file:py-1 file:rounded"
            onChange={(e) =>
              setForm({ ...form, image: e.target.files[0] })
            }
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white p-3 rounded-lg transition"
          >
            Create Event
          </button>

        </div>

      </div>
    </div>
  );
}
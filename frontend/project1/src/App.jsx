import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./pages/Navbar";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Events from "./pages/Events";
import CreateEvent from "./pages/CreateEvent";
import MyEvents from "./pages/MyEvents";
import Recommendations from "./pages/Recommendations";
import Dashboard from "./pages/Dashboard";
import EventDetails from "./pages/EventDetails";
import Attendees from "./pages/Attendees";
import AIReport from "./pages/AIReport";
import NoticeBoard from "./pages/NoticeBoard";
import CoordinatorDashboard from "./pages/Coordinator"

export default function App() {
  return (
    <BrowserRouter>

      {/* NAVBAR */}
      <Navbar />

      {/* ROUTES */}
      <Routes>

        <Route path="/" element={<Events />} />

        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />

        <Route path="/create-event" element={<CreateEvent />} />

        <Route path="/my-events" element={<MyEvents />} />

        <Route path="/recommendations" element={<Recommendations />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/event/:id" element={<EventDetails />} />

        <Route path="/attendees" element={<Attendees />} />

        <Route path="/ai-report" element={<AIReport />} />

        <Route path="/notice-board" element={<NoticeBoard />} />

        <Route path="/coordinator" element={<CoordinatorDashboard />} />

      </Routes>

    </BrowserRouter>
  );
}
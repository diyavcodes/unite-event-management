import { useState } from "react";
import { api } from "../api";
import jsPDF from "jspdf";

export default function AIReport() {

  const [eventId, setEventId] = useState("");
  const [report, setReport] = useState("");
  const [editing, setEditing] = useState(false);

  const generateReport = async () => {

    try {

      const res = await api.get(`/ai-report/${eventId}`);

      setReport(res.data.report);

    } catch (error) {

      console.log(error);

    }
  };

  // PDF DOWNLOAD
  const downloadPDF = () => {

    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");

    doc.setFontSize(20);

    doc.text("AI Event Report", 20, 20);

    doc.setFontSize(11);

    doc.setFont("helvetica", "normal");

    const lines = doc.splitTextToSize(report, 170);

    doc.text(lines, 20, 40);

    doc.save(`event-report-${eventId}.pdf`);
  };

  return (

    <div className="min-h-screen bg-gradient-to-b from-black via-[#0f172a] to-black text-white p-6 md:p-10">

      {/* CONTAINER */}
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="mb-10 border-b border-gray-800 pb-6">

          <h1 className="text-4xl font-bold tracking-tight">
            AI Event Report
          </h1>

          <p className="text-gray-400 mt-3 text-lg">
            Generate formal AI-powered analytical reports for events.
          </p>

        </div>

        {/* INPUT SECTION */}
        <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 shadow-xl">

          <div className="flex flex-col md:flex-row gap-4 items-center">

            <input
              type="number"
              placeholder="Enter Event ID"
              value={eventId}
              onChange={(e) => setEventId(e.target.value)}
              className="w-full md:w-80 p-4 bg-[#0f172a] border border-gray-700 rounded-xl text-white outline-none focus:border-blue-500 transition"
            />

            <button
              onClick={generateReport}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-4 rounded-xl transition font-medium"
            >
              Generate Report
            </button>

          </div>

        </div>

        {/* REPORT SECTION */}
        {report && (

          <div className="mt-10 bg-[#111827] border border-gray-800 rounded-2xl shadow-2xl overflow-hidden">

            {/* REPORT HEADER */}
            <div className="border-b border-gray-800 px-8 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

              <div>

                <h2 className="text-2xl font-bold">
                  Event Analysis Report
                </h2>

                <p className="text-gray-400 mt-1">
                  Generated using AI analytics engine
                </p>

              </div>

              <div className="flex gap-3">

                <button
                  onClick={() => setEditing(!editing)}
                  className="bg-gray-800 hover:bg-gray-700 border border-gray-700 px-5 py-2 rounded-lg transition"
                >
                  {editing ? "Save Report" : "Edit Report"}
                </button>

                <button
                  onClick={downloadPDF}
                  className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg transition"
                >
                  Download PDF
                </button>

              </div>

            </div>

            {/* REPORT BODY */}
            <div className="p-8">

              {editing ? (

                <textarea
                  value={report}
                  onChange={(e) => setReport(e.target.value)}
                  className="w-full h-[500px] bg-[#0f172a] border border-gray-700 rounded-xl p-6 text-gray-200 outline-none focus:border-blue-500 leading-relaxed"
                />

              ) : (

                <div className="whitespace-pre-wrap leading-8 text-gray-200 text-[16px]">
                  {report}
                </div>

              )}

            </div>

            {/* FOOTER */}
            <div className="border-t border-gray-800 px-8 py-4 text-sm text-gray-500 flex justify-between">

              <span>
                Smart Event Management Platform
              </span>

              <span>
                AI Generated Report
              </span>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}
"use client"; 

import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    partner: "",
    email: "",
    attendance: "Hadir", 
    message: "", 
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [responseMsg, setResponseMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setResponseMsg("");

    try {
      const res = await fetch("http://localhost:3000/api/rsvp/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        setStatus("success");
        setResponseMsg("RSVP Berhasil! Mengalihkan...");

        if (result.redirectUrl) {
        setTimeout(() => {
            if (result.redirectUrl.startsWith('http')) {
                window.location.href = result.redirectUrl;
            } else {
                window.location.href = `http://localhost:3000${result.redirectUrl}`;
            }
          }, 1500);
        }
      } else {
        setStatus("error");
        setResponseMsg(result.message || "Terjadi kesalahan.");
      }
    } catch (error) {
      setStatus("error");
      setResponseMsg("Gagal menghubungi server. (Cek apakah Backend nyala?)");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF2F0] flex items-center justify-center p-4 font-serif">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden max-w-md w-full border border-rose-100">        
        <div className="bg-rose-200 h-32 relative flex items-center justify-center">
            <div className="text-center">
                <h2 className="text-rose-800 text-sm tracking-widest uppercase font-semibold">The Wedding Of</h2>
                <h1 className="text-rose-900 text-3xl font-bold mt-1" style={{fontFamily: 'cursive'}}>Malvin & Jeannete</h1>
            </div>
        </div>

        <div className="p-8">
          <div className="text-center mb-6">
            <p className="text-gray-600 text-sm">We Look forward for your Attendance</p>
            <div className="w-16 h-1 bg-rose-300 mx-auto mt-2 rounded-full"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-rose-900 mb-1">Guest Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-rose-200 rounded-md focus:ring-2 focus:ring-rose-400 focus:outline-none text-gray-700"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-rose-900 mb-1">Partner Name</label>
              <input
                type="text"
                name="partner"
                value={formData.partner}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-rose-200 rounded-md focus:ring-2 focus:ring-rose-400 focus:outline-none text-gray-700"
                placeholder="Partner Name (Optional)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-rose-900 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-rose-200 rounded-md focus:ring-2 focus:ring-rose-400 focus:outline-none text-gray-700"
                placeholder="email@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-rose-900 mb-1">Attendance</label>
              <select
                name="attendance"
                value={formData.attendance}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-rose-200 rounded-md focus:ring-2 focus:ring-rose-400 focus:outline-none text-gray-700 bg-white"
              >
                <option value="Hadir">Will Attend</option>
                <option value="Tidak">Cannot Attend</option>
              </select>
            </div>
            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-rose-200 rounded-md focus:ring-2 focus:ring-rose-400 focus:outline-none text-gray-700"
                placeholder="Write your wishes here..."
              ></textarea>
            </div>
            {responseMsg && (
                <div className={`text-center text-sm p-2 rounded ${status === 'error' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                    {responseMsg}
                </div>
            )}
            <button
              type="submit"
              disabled={status === 'loading'}
              className={`w-full py-3 rounded-full text-white font-semibold shadow-md transition-all 
                ${status === 'loading' ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#C27A72] hover:bg-[#A8655E]'}
              `}
            >
              {status === 'loading' ? 'Sending RSVP...' : 'SUBMIT RSVP'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
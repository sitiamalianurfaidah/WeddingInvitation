"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// Definisi tipe data Guest sesuai database
type Guest = {
    _id: string;
    name: string;
    partner: string;
    email: string;
    attendance: string;
    message: string;
    timestamp: string;
    };

    export default function Dashboard() {
    const [guests, setGuests] = useState<Guest[]>([]);
    const [loading, setLoading] = useState(true);

    // --- 1. Fungsi Ambil Data (Fetch List) ---
    const fetchGuests = async () => {
        try {
        // Pastikan backend jalan di port 3000
        const res = await fetch("http://localhost:3000/api/rsvp/list");
        const json = await res.json();
        if (json.success) {
            setGuests(json.data);
        }
        } catch (err) {
        console.error("Gagal ambil data", err);
        } finally {
        setLoading(false);
        }
    };

    // Panggil fetch saat halaman dibuka pertama kali
    useEffect(() => {
        fetchGuests();
    }, []);

    // --- 2. Fungsi Hapus Data (Delete) ---
    const handleDelete = async (id: string) => {
        // Konfirmasi dulu biar gak kepencet
        if (!window.confirm("Yakin mau hapus data ini?")) return;

        try {
        const res = await fetch(`http://localhost:3000/api/rsvp/delete/${id}`, {
            method: "DELETE",
        });
        const json = await res.json();

        if (json.success) {
            // Kalau sukses di backend, kita hapus juga di tampilan (State) biar gak usah refresh page
            setGuests((prevGuests) => prevGuests.filter((guest) => guest._id !== id));
        } else {
            alert("Gagal menghapus: " + json.message);
        }
        } catch {
        alert("Error koneksi ke server saat menghapus.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-800">
        <div className="max-w-6xl mx-auto">
            
            {/* Header Dashboard */}
            <div className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-3xl font-bold text-rose-900">Guest List Dashboard</h1>
                <p className="text-gray-500">Malvin & Jeannete Wedding</p>
            </div>
            <Link 
                href="/" 
                className="bg-white border border-rose-300 text-rose-600 px-4 py-2 rounded-lg hover:bg-rose-50 transition"
            >
                &larr; Back to Form
            </Link>
            </div>

            {/* Stats Card Sederhana */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-400">
                    <h3 className="text-gray-500 text-sm">Total Hadir</h3>
                    <p className="text-2xl font-bold">{guests.filter(g => g.attendance === 'Hadir').length}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-red-400">
                    <h3 className="text-gray-500 text-sm">Tidak Hadir</h3>
                    <p className="text-2xl font-bold">{guests.filter(g => g.attendance === 'Tidak').length}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-400">
                    <h3 className="text-gray-500 text-sm">Total Respon</h3>
                    <p className="text-2xl font-bold">{guests.length}</p>
                </div>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
            <table className="w-full text-left border-collapse">
                <thead className="bg-rose-100 text-rose-900">
                <tr>
                    <th className="p-4 font-semibold text-sm">Name</th>
                    <th className="p-4 font-semibold text-sm">Partner</th>
                    <th className="p-4 font-semibold text-sm">Email</th>
                    <th className="p-4 font-semibold text-sm">Status</th>
                    <th className="p-4 font-semibold text-sm">Message</th>
                    <th className="p-4 font-semibold text-sm text-center">Action</th> 
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                {loading ? (
                    <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-500">Loading data...</td>
                    </tr>
                ) : guests.length === 0 ? (
                    <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-500">Belum ada tamu yang RSVP.</td>
                    </tr>
                ) : (
                    guests.map((guest) => (
                    <tr key={guest._id} className="hover:bg-gray-50 transition group">
                        <td className="p-4 font-medium text-gray-900">{guest.name}</td>
                        <td className="p-4 text-gray-600">{guest.partner}</td>
                        <td className="p-4 text-gray-500 text-sm">{guest.email}</td>
                        <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold 
                            ${guest.attendance === 'Hadir' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {guest.attendance}
                        </span>
                        </td>
                        <td className="p-4 text-gray-600 text-sm max-w-xs truncate" title={guest.message}>
                        {guest.message || "-"}
                        </td>
                        
                        {/* TOMBOL DELETE (TEMPAT SAMPAH) */}
                        <td className="p-4 text-center">
                        <button 
                            onClick={() => handleDelete(guest._id)}
                            className="text-gray-400 hover:text-red-600 transition p-2 rounded-full hover:bg-red-50"
                            title="Delete Guest"
                        >
                            {/* Ikon Sampah (SVG) */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                        </td>
                    </tr>
                    ))
                )}
                </tbody>
            </table>
            </div>

        </div>
        </div>
    );
}
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./dashboard.module.css";

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
    const [searchTerm, setSearchTerm] = useState("");

    const API_BASE_URL = "https://weddinginvitation-production-a4b6.up.railway.app";

    const fetchGuests = async () => {
        try {
        const res = await fetch(`${API_BASE_URL}/api/rsvp/list`);
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

    useEffect(() => {
        fetchGuests();
    }, []);

    const handleDelete = async (id: string) => {
        if (!window.confirm("Yakin mau hapus data ini?")) return;

        try {
        const res = await fetch(`${API_BASE_URL}/api/rsvp/delete/${id}`, {
            method: "DELETE",
        });
        const json = await res.json();

        if (json.success) {
            setGuests((prevGuests) => prevGuests.filter((guest) => guest._id !== id));
        } else {
            alert("Gagal menghapus: " + json.message);
        }
        } catch {
        alert("Error koneksi ke server saat menghapus.");
        }
    };

    const filteredGuests = guests.filter(guest =>
        guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guest.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const attendingCount = guests.filter(g => g.attendance === 'Hadir').length;
    const notAttendingCount = guests.filter(g => g.attendance === 'Tidak').length;

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                
                <div className={styles.header}>
                    <div className={styles.headerContent}>
                        <div>
                            <h1 className={styles.title}>Guest List Dashboard</h1>
                            <p className={styles.subtitle}>Faishal & Nadin Wedding</p>
                        </div>
                        <Link href="/" className={styles.backButton}>
                            ← Back to Form
                        </Link>
                    </div>
                </div>

                <div className={styles.statsGrid}>
                    <div className={`${styles.statCard} ${styles.statCardGreen}`}>
                        <div className={styles.statIcon}>✓</div>
                        <div>
                            <p className={styles.statLabel}>Attending</p>
                            <p className={styles.statNumber}>{attendingCount}</p>
                        </div>
                    </div>

                    <div className={`${styles.statCard} ${styles.statCardRed}`}>
                        <div className={styles.statIcon}>✕</div>
                        <div>
                            <p className={styles.statLabel}>Not Attending</p>
                            <p className={styles.statNumber}>{notAttendingCount}</p>
                        </div>
                    </div>

                    <div className={`${styles.statCard} ${styles.statCardBlue}`}>
                        <div className={styles.statIcon}>👥</div>
                        <div>
                            <p className={styles.statLabel}>Total Responses</p>
                            <p className={styles.statNumber}>{guests.length}</p>
                        </div>
                    </div>
                </div>

                <div className={styles.searchContainer}>
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.searchInput}
                    />
                    <svg className={styles.searchIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>

                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead className={styles.tableHead}>
                            <tr>
                                <th className={styles.tableHeader}>Name</th>
                                <th className={styles.tableHeader}>Partner</th>
                                <th className={styles.tableHeader}>Email</th>
                                <th className={styles.tableHeader}>Status</th>
                                <th className={styles.tableHeader}>Message</th>
                                <th className={styles.tableHeader}>Action</th>
                            </tr>
                        </thead>
                        <tbody className={styles.tableBody}>
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className={styles.emptyCell}>
                                        <div className={styles.loadingSpinner}></div>
                                        Loading data...
                                    </td>
                                </tr>
                            ) : filteredGuests.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className={styles.emptyCell}>
                                        {guests.length === 0 ? "No guests have RSVP'd yet." : "No results found."}
                                    </td>
                                </tr>
                            ) : (
                                filteredGuests.map((guest, index) => (
                                    <tr key={guest._id} className={styles.tableRow} style={{ animationDelay: `${index * 50}ms` }}>
                                        <td className={styles.tableCell}>
                                            <span className={styles.nameBadge}>{guest.name}</span>
                                        </td>
                                        <td className={styles.tableCell}>
                                            {guest.partner || <span className={styles.noData}>-</span>}
                                        </td>
                                        <td className={styles.tableCell}>
                                            <a href={`mailto:${guest.email}`} className={styles.emailLink}>
                                                {guest.email}
                                            </a>
                                        </td>
                                        <td className={styles.tableCell}>
                                            <span className={guest.attendance === 'Hadir' ? styles.statusAttending : styles.statusNotAttending}>
                                                {guest.attendance}
                                            </span>
                                        </td>
                                        <td className={styles.tableCell}>
                                            <span className={styles.messageText} title={guest.message}>
                                                {guest.message || <span className={styles.noData}>-</span>}
                                            </span>
                                        </td>
                                        <td className={styles.tableCell}>
                                            <button
                                                onClick={() => handleDelete(guest._id)}
                                                className={styles.deleteButton}
                                                title="Delete Guest"
                                            >
                                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
"use client"; 

import { useState } from "react";
import styles from "./page.module.css";

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
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <p className={styles.heroSubtitle}>THE WEDDING OF</p>
          <h1 className={styles.heroTitle}>Josh & Nadine</h1>
          <p className={styles.heroDate}>02 02 2026</p>
        </div>
      </section>

      {/* Events Section */}
      <section className={styles.eventsSection}>
        <div className={styles.eventsContainer}>
          {/* Wedding Ceremony Card */}
          <div className={styles.eventCard}>
            <div 
              className={styles.cardImage} 
              style={{ backgroundImage: "url('/wedding-ceremony.svg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
            ></div>
            <div className={styles.cardOverlay}></div>
            <div className={styles.cardContent}>
              <div>
                <h2 className={styles.eventTitle}>Wedding Ceremony</h2>
                <div className={styles.eventTitleLine}></div>
              </div>
              <p className={styles.eventTime}>07.00 - 08.00</p>
              <div>
                <p className={styles.eventLocation}>Raffles Hotel</p>
                <p className={styles.eventAddress}>
                  Jl. Terusan Jakarta No.53, Cicaheum, Kec. Kiaracondong, Kota Bandung, Jawa Barat 40291
                </p>
              </div>
            </div>
          </div>

          {/* Wedding Party Card */}
          <div className={styles.eventCard}>
            <div 
              className={styles.cardImage} 
              style={{ backgroundImage: "url('/wedding-party.svg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
            ></div>
            <div className={styles.cardOverlay}></div>
            <div className={styles.cardContent}>
              <div>
                <h2 className={styles.eventTitle}>Wedding Party</h2>
                <div className={styles.eventTitleLine}></div>
              </div>
              <p className={styles.eventTime}>11.00 - 14.00</p>
              <div>
                <p className={styles.eventLocation}>Bride`s house</p>
                <p className={styles.eventAddress}>
                  Jl. Jakarta Raya No.221, Cicaheum, Kec. Kiaracondong, Kota Bandung, Jawa Barat 40291
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section className={styles.rsvpSection}>
        <h2 className={styles.rsvpTitle}>We Look forward for your Attendance</h2>
        
        <form onSubmit={handleSubmit} className={styles.rsvpFormContainer}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Guest</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={styles.formInput}
              placeholder="Name"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Partner</label>
            <input
              type="text"
              name="partner"
              value={formData.partner}
              onChange={handleChange}
              className={styles.formInput}
              placeholder="Name"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={styles.formInput}
              placeholder="Email"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={styles.formTextarea}
              placeholder="Write your wishes here..."
            ></textarea>
          </div>

          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              id="attending"
              name="attendance"
              checked={formData.attendance === "Hadir"}
              onChange={(e) => setFormData({ ...formData, attendance: e.target.checked ? "Hadir" : "Tidak" })}
              className={styles.checkbox}
            />
            <label htmlFor="attending" className={styles.checkboxLabel}>Attending</label>
          </div>

          {responseMsg && (
            <div className={`${styles.statusMessage} ${status === 'error' ? styles.error : styles.success}`}>
              {responseMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className={styles.submitButton}
          >
            {status === 'loading' ? 'Sending RSVP...' : 'SUBMIT'}
          </button>
        </form>
      </section>

      {/* Bottom Section */}
      <section className={styles.bottomSection}>
        <div className={styles.bottomOverlay}></div>
      </section>
    </div>
  );
}
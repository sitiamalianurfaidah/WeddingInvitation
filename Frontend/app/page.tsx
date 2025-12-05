"use client";

import { useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";

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

    const API_BASE_URL = "https://weddinginvitation-production-a4b6.up.railway.app";

    try {
      const res = await fetch(`${API_BASE_URL}/api/rsvp/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
              window.location.href = `${API_BASE_URL}${result.redirectUrl}`;
            }
          }, 1500);
        }
      } else {
        setStatus("error");
        setResponseMsg(result.message || "Terjadi kesalahan.");
      }
    } catch (error) {
      setStatus("error");
      setResponseMsg("Gagal menghubungi server.");
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <p className={styles.heroSubtitle}>THE WEDDING OF</p>
          <h1 className={styles.heroTitle}>Faishal & Nadin</h1>
          <p className={styles.heroDate}>08 . 08 . 2025</p>
        </div>
      </section>

      <section className={styles.coupleSection}>
        <div className={styles.coupleHeader}>
          <h2>Groom & Bride</h2>
          <p>Together with our families, we request the honor of your presence.</p>
        </div>
        <div className={styles.coupleContainer}>
          <div className={styles.coupleCard}>
            <div className={styles.coupleImageWrapper}>
                <Image src="/groom.jpg" alt="Faishal" width={400} height={600} className={styles.coupleImg} />
            </div>
            <h3>Faishal Tanjung</h3>
            <p className={styles.coupleParents}>Son of Mr. Rasjwardi Tanjung & Mrs. Linda Melinda</p>
          </div>
          
          <div className={styles.coupleCard}>
            <div className={styles.coupleImageWrapper}>
                <Image src="/bride.jpg" alt="Nadin" width={400} height={600} className={styles.coupleImg} />
            </div>
            <h3>Nadin Amizah</h3>
            <p className={styles.coupleParents}>Daughter of Mr. Raja & Mrs. Intan Gurnita Widiatie</p>
          </div>
        </div>
      </section>

      <section className={styles.eventsSection}>
        <h2 className={styles.sectionTitle}>Save The Date</h2>
        <div className={styles.eventsContainer}>
          <div className={styles.eventCard}>
            <div
              className={styles.cardImage}
              style={{ backgroundImage: "url('/wedding-ceremony.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
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
                  Jl. Terusan Jakarta No.53, Bandung
                </p>
              </div>
            </div>
          </div>

          <div className={styles.eventCard}>
            <div
              className={styles.cardImage}
              style={{ backgroundImage: "url('/wedding-party.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
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
                  Jl. Jakarta Raya No.221, Bandung
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section 
        className={styles.parallaxSection}
        style={{ backgroundImage: "url('/parallax-bg.jpg')" }}
      >
        <div className={styles.parallaxContent}>
          <p>&ldquo;And I knew exactly how old Walt Disney&apos;s Cinderella felt when she found her prince&rdquo;</p>
        </div>
      </section>

      <section className={styles.gallerySection}>
        <h2 className={styles.sectionTitle}>Our Moments</h2>
        <div className={styles.galleryGrid}>
            <Image src="/gallery-1.jpg" alt="Moment 1" width={400} height={500} className={styles.galleryItem} />
            <Image src="/gallery-2.jpg" alt="Moment 2" width={400} height={500} className={styles.galleryItem} />
            <Image src="/gallery-3.jpg" alt="Moment 3" width={400} height={500} className={styles.galleryItem} />
            <Image src="/gallery-4.jpg" alt="Moment 4" width={400} height={500} className={styles.galleryItem} />
            <Image src="/gallery-5.jpg" alt="Moment 5" width={400} height={500} className={styles.galleryItem} />
            <Image src="/gallery-6.jpg" alt="Moment 6" width={400} height={500} className={styles.galleryItem} />
        </div>
      </section>

      <section className={styles.rsvpSection}>
        <h2 className={styles.rsvpTitle}>RSVP</h2>
        <p className={styles.rsvpSubtitle}>We look forward to celebrating with you!</p>
        
        <form onSubmit={handleSubmit} className={styles.rsvpFormContainer}>
            <div className={styles.formGroup}>
                <label className={styles.formLabel}>Guest Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className={styles.formInput} placeholder="Write your name" />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.formLabel}>Partner</label>
                <input type="text" name="partner" value={formData.partner} onChange={handleChange} className={styles.formInput} placeholder="Partner Name" />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.formLabel}>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required className={styles.formInput} placeholder="your@email.com" />
            </div>
            
            <div className={styles.formGroup}>
                <label className={styles.formLabel}>Wishes</label>
                <textarea 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  className={styles.formTextarea} 
                  placeholder="Write something sweet..."
                  maxLength={5000} 
                ></textarea>
                <div style={{ textAlign: 'right', fontSize: '12px', color: '#888', marginTop: '5px', fontFamily: 'var(--font-comfortaa)' }}>
                    {formData.message.length}/5000 characters
                </div>
            </div>

            <div className={styles.checkboxWrapper}>
                <label className={styles.customCheckboxLabel}>
                  <input 
                    type="checkbox" 
                    id="attending" 
                    name="attendance" 
                    checked={formData.attendance === "Hadir"} 
                    onChange={(e) => setFormData({ ...formData, attendance: e.target.checked ? "Hadir" : "Tidak" })} 
                  />
                  <span className={styles.heartCheckmark}></span>
                  <span className={styles.labelText}>Yes, I will attend!</span>
                </label>
            </div>

            {responseMsg && (
                <div className={`${styles.statusMessage} ${status === 'error' ? styles.error : styles.success}`}>
                {responseMsg}
                </div>
            )}
            <button type="submit" disabled={status === 'loading'} className={styles.submitButton}>
                {status === 'loading' ? 'Sending RSVP...' : 'Confirm Attendance'}
            </button>
        </form>
      </section>

      <section className={styles.bottomSection}>
          <div className={styles.bottomContent}>
              <h2>Thank You</h2>
              <p>Faishal & Nadin</p>
          </div>
          <div className={styles.bottomOverlay}></div>
      </section>
    </div>
  );
}
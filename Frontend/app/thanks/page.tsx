"use client"; 

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import styles from "./thanks.module.css";

function ThanksContent() {
    const searchParams = useSearchParams();
    const redirectTarget = searchParams.get("next") || "/";

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                
                {/* Success Icon */}
                <div className={styles.iconContainer}>
                    <svg className={styles.checkmark} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>

                {/* Title */}
                <h1 className={styles.title}>Thank You!</h1>
                
                {/* Message */}
                <p className={styles.message}>
                    Your RSVP has been received successfully. We can&apos;t wait to celebrate with you on our special day!
                </p>

                {/* Decorative Line */}
                <div className={styles.decorativeLine}></div>

                {/* Details */}
                <div className={styles.details}>
                    <p className={styles.detailText}>
                        A confirmation email will be sent to you shortly with all the event details.
                    </p>
                </div>

                {/* Button */}
                <a 
                    href={redirectTarget} 
                    className={styles.backButton}
                >
                    ← Back to Home
                </a>
            </div>
        </div>
    );
}

export default function Thanks() {
    return (
        <Suspense fallback={
            <div className={styles.container}>
                <div className={styles.loadingSpinner}></div>
            </div>
        }>
            <ThanksContent />
        </Suspense>
    );
}
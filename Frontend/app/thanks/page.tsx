"use client"; 

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Image from "next/image"; 
import styles from "./thanks.module.css";

function ThanksContent() {
    const searchParams = useSearchParams();
    const redirectTarget = searchParams.get("next") || "/";

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                
                <div className={styles.imageWrapper}>
                    <Image 
                        src="/closing-bg.jpg" 
                        alt="Faishal & Nadine" 
                        fill
                        className={styles.coupleImage} 
                    />
                </div>

                <div className={styles.iconContainer}>
                    <svg className={styles.checkmark} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>

                <h1 className={styles.title}>Thank You!</h1>
                
                <p className={styles.message}>
                    Your RSVP has been received. <br/>
                    We can&apos;t wait to see you there!
                </p>

                <div className={styles.decorativeLine}></div>

                {/* Details */}
                <div className={styles.details}>
                    <p className={styles.detailText}>
                        See you on our special day,<br/>
                        <span className={styles.names}>Faishal & Nadin</span>
                    </p>
                </div>

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
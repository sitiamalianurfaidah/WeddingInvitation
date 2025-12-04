
# Wedding Invitation - Pentest Demo Application

![Security Status](https://img.shields.io/badge/SECURITY_STATUS-INTENTIONALLY_VULNERABLE-red?style=for-the-badge)
![Purpose](https://img.shields.io/badge/PURPOSE-EDUCATION_ONLY-blue?style=for-the-badge)
 
## 🛠️ Tech Stack

This project is built using the following modern web technologies:

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)


## 📂 Project Structure

```bash
.
├── 📂 Backend/           # Node.js + Express API Server
│   ├── src/
│   │   ├── config/      # Database configuration
│   │   ├── controllers/ # ⚠️ Vulnerable Logic Here
│   │   │   ├── common.controller.js  # Open Redirect Logic
│   │   │   └── rsvp.controller.js    # DoS Logic
│   │   ├── models/
│   │   └── routes/
│   ├── index.js         # Entry point
│   └── .env             # Env variables
│
└── 📂 Frontend/          # Next.js 13+ (App Router)
    ├── src/
    │   ├── app/
    │   │   ├── dashboard/ # Admin View
    │   │   ├── thanks/    # Redirect Target
    │   │   └── page.tsx   # RSVP Form
    └── ...
````


## Setup Instructions

### 1️⃣ Backend Setup (API)

```bash
cd Backend
npm install
```

Create `.env` file in `Backend/`:

```env
MONGO_URI=mongodb+srv://<your_connection_string>
PORT=3000
```

Run the server:

```bash
npm start
# Server is running on http://localhost:3000
```

### 2️⃣ Frontend Setup (Client)

```bash
cd Frontend
npm install
```

Run the client:

```bash
npm run dev
#  ▲ Next.js 16.0.5 (Turbopack)
#   - Local:         http://localhost:3001
#   - Network:       http://192.168.56.1:3001
```

## Vulnerabilities Demonstrated

This project showcases two specific vulnerabilities commonly found in web applications:

| Vulnerability Type | Endpoint | Impact Level |
| :--- | :--- | :--- |
| Application-Layer DoS | `POST /api/rsvp/submit` | Critical (Service Outage) |
| Open Redirect | `GET /api/common/redirect` | High (Phishing Risk) |

### __1\. Denial of Service (Resource Exhaustion)__ 

  * **Trigger:** Sending a `message` body longer than **200 characters**.
  * **Mechanism:** The server enters a computationally expensive mathematical loop (`Math.sqrt`, `Math.tan`).
  * **Result:** Because Node.js is single-threaded, the **Event Loop is blocked**. The server hangs and cannot process requests from any other users.

### __2\. Open Redirect (Unvalidated Forward)__ 

  * **Trigger:** Accessing `?next=http://malicious-site.com`.
  * **Mechanism:** The backend accepts the `next` query parameter and immediately redirects the user using `res.redirect()`.
  * **Result:** No validation (whitelist) is performed, allowing attackers to redirect users from a trusted domain to a phishing site.

## Branches & Scenarios

We use a dual-branch system to demonstrate the effectiveness of our security patches.

| Feature | 🔴 `main` (Vulnerable) | 🟢 `remediation` (Secured) |
| :--- | :--- | :--- |
| DoS Attack | Server Crashes/Hangs  | Rejected  |
| Redirect Logic | Any URL Allowed (e.g., Google) | Whitelisted (Localhost Only) |
| Input Limit | No Validation |  200 chars |
| Status |  Unsafe | Production Ready |

## Security Best Practices Applied

In the `remediation` branch, we implemented the following defenses:

1.  **Input Validation:** "Never trust user input." We reject invalid data before processing.
2.  **Allow-listing:** We explicitly define allowed destinations instead of trying to block bad ones.
3.  **Defense in Depth:** Validation layers on both Client-side (Frontend) and Server-side (Backend).
4.  **Graceful Error Handling:** Returning proper HTTP Status Codes instead of crashing.


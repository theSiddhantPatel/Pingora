<div align="center">

<img width="1344" height="768" alt="Pingora Chat App" src="https://github.com/user-attachments/assets/3b30d73e-ebe2-48dc-99fb-486ff5029f85" />

# 💬 Pingora - Real-Time Chat App

A modern, full-stack **real-time chat application** built with **Next.js 15**, **TypeScript**, **Pusher Channels**, and **MongoDB**.  
Featuring secure authentication with **JWT**, **Google OAuth**, **Forgot Password & Account Recovery** via Nodemailer, **Cloudinary media uploads**, and a sleek, responsive UI.

🌐 **Live Demo:** [https://pingora-rouge.vercel.app/](https://pingora-rouge.vercel.app/)

</div>

---

## 🌟 Highlights & Features

- 🔐 **Authentication System**:
  - Custom secure **JWT authentication** with HTTP-only cookies.
  - **Google OAuth** integration.
  - 🔑 **Forgot Password & Password Reset**: Secure one-hour hashed token generation with instant email delivery.
- ⚡ **Real-Time Messaging**: Instant 1-on-1 messaging powered by **Pusher Channels**.
- 🟢 **Live Online/Offline Presence**: Real-time user status indicators.
- 🔔 **Interactive Sound Effects**: Notification and message sounds with an in-app mute toggle.
- 📨 **Email Service**: Automated password recovery and welcome emails powered by **Nodemailer** (Gmail SMTP).
- 🗂️ **Cloud Media Storage**: Profile picture and chat image uploads handled via **Cloudinary**.
- 🧱 **Persistent Storage**: Robust data modeling using **MongoDB** & **Mongoose**.
- 🎨 **Modern Cyberpunk/Dark UI**: Crafted using **Tailwind CSS**, **DaisyUI**, and **Lucide Icons**.
- 🧠 **Global State**: Streamlined client-side state management using **Zustand**.
- 📱 **Fully Responsive**: Optimized for desktop, tablet, and mobile browsers.

---

## 🧩 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 15 (App Router), React 19, TypeScript |
| **Styling** | Tailwind CSS, DaisyUI |
| **Realtime** | Pusher Channels (`pusher`, `pusher-js`) |
| **Database** | MongoDB with Mongoose ODM |
| **Authentication** | JWT (JSON Web Tokens), Google OAuth |
| **Email Service** | Nodemailer (Gmail SMTP) |
| **Media Storage** | Cloudinary |
| **State Management** | Zustand |
| **Deployment** | Vercel |

---

## ⚙️ Getting Started Locally

### 1. Clone the Repository
```bash
git clone https://github.com/theSiddhantPatel/Pingora.git
cd Pingora
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory:

```env
# MongoDB Connection String
MONGO_URI=your_mongodb_connection_string

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_here

# Pusher Channels (Server & Client)
PUSHER_APP_ID=your_pusher_app_id
PUSHER_KEY=your_pusher_key
PUSHER_SECRET=your_pusher_secret
PUSHER_CLUSTER=your_pusher_cluster
NEXT_PUBLIC_PUSHER_KEY=your_pusher_key
NEXT_PUBLIC_PUSHER_CLUSTER=your_pusher_cluster

# Cloudinary (Media Uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email Service (Nodemailer / Gmail SMTP)
EMAIL_USER=your_gmail_address@gmail.com
EMAIL_PASS=your_16_digit_google_app_password
EMAIL_FROM_NAME="Pingora"

# Google OAuth Credentials
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔒 Forgot Password Flow

1. User requests a password reset link at `/forgot-password`.
2. A cryptographically secure 32-byte token is generated, hashed with SHA-256, and stored with a 1-hour expiration.
3. Nodemailer dispatches an email containing the reset link (`/reset-password?token=...`).
4. In local development (`NODE_ENV !== "production"`), the link is also output to the terminal and shown directly in the UI for quick testing.
5. User updates their password securely via `/reset-password`.

---

## 🚀 Deployment

The easiest way to deploy Pingora is with [Vercel](https://vercel.com):

1. Push your repository to GitHub.
2. Import the project in Vercel.
3. Add all the environment variables from your `.env.local` into the Vercel Project Settings.
4. Hit **Deploy**.

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/theSiddhantPatel">Siddhant Patel</a></sub>
</div>

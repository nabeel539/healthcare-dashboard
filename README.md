# Clinical Atelier — B2B Healthcare Dashboard

A production-ready, React-based healthcare dashboard application built with precision and a premium "Clinical Atelier" aesthetic.

## 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Login Credentials (Demo Mode)**
   - **Email**: `demo@clinic.com`
   - **Password**: `password123`

## 🛠 Tech Stack

- **Framework**: React 18 (Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3
- **State Management**: Zustand
- **Authentication**: Firebase Auth (with Demo Fallback)
- **Charts**: Recharts
- **Animations**: `ldrs` (Cardio loader)
- **Icons**: Material Symbols

## 📁 Project Structure

- `src/components`: Reusable UI, Layout, and Page-specific components.
- `src/pages`: Application views (Login, Dashboard, Analytics, Patients).
- `src/store`: Zustand stores for Auth, UI, and Patients.
- `src/services`: Firebase configuration and auth service.
- `src/data`: Mock data for the clinical ledger and charts.
- `src/types`: Global TypeScript interfaces.
- `public/sw.js`: Service worker for offline caching and notifications.

## ✨ Key Features

- **Clinical Aesthetic**: "No-line" design philosophy, glassmorphism, and ambient shadows.
- **Responsive Layout**: Optimized for both Desktop and Mobile (with bottom nav).
- **Patient Directory**: Toggle between Grid and List views with persistent state.
- **Medical Analytics**: Interactive charts for patient volume and diagnostic distribution.
- **Auth Guard**: Protected routes with session persistence.
- **Notifications**: Integrated service worker for clinical alerts.

## 🔒 Security & Performance

- **HIPAA-Ready**: Designed with medical data sensitivity in mind.
- **Skeleton Loaders**: Premium loading experience using custom CSS animations.
- **Modular Architecture**: Clean separation of concerns for scalability.

---
Built by Antigravity for Clinical Atelier.

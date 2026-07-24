# 🚀 TCONGS - Interactive Modern Landing Page

A high-performance, visually stunning interactive landing page built with **React 19**, **Vite**, **Three.js**, **GSAP**, **Framer Motion**, and **Tailwind CSS v4**.

---

## 🌟 Overview

**TCONGS** is a futuristic, dark-themed web application designed with immersive 3D graphics, rich micro-animations, dynamic cursor tracking, and fluid scroll interactions. Built for optimal performance and responsiveness across all desktop, tablet, and mobile displays.

---

## 🛠️ Tech Stack

### **Core Framework & Build System**
- **[React 19](https://react.dev/)** – Latest React features for efficient UI rendering and state management.
- **[Vite 8](https://vitejs.dev/)** – Ultra-fast build tool and local development server with instant HMR.

### **3D & Graphics**
- **[Three.js](https://threejs.org/)** – WebGL rendering engine powering real-time 3D scenes, particle systems, floating geometries, and interactive canvasses.

### **Animations & Motion**
- **[GSAP (GreenSock)](https://greensock.com/gsap/)** & **ScrollTrigger** – High-performance timeline animations, page loader transitions, and scroll-synced effects.
- **[Framer Motion](https://www.framer.com/motion/)** – Fluid UI transitions, interactive modal dialogs, tab switching, and component state animations.

### **Styling & Icons**
- **[Tailwind CSS v4](https://tailwindcss.com/)** – Utility-first CSS framework for custom responsive design, custom color palettes, and glassmorphism styling.
- **[Lucide React](https://lucide.dev/)** – Clean, modern vector icon set.

### **Linting & Code Quality**
- **[Oxlint](https://oxc.rs/)** – Rust-powered JavaScript/JSX linter for lightning-fast code checks.

---

## 🎨 Homepage Features & Sections

| Section | Description |
| :--- | :--- |
| **🚀 Hero Section** | Dynamic headline with interactive **Three.js 3D canvas**, floating geometric particles, call-to-action badges, and stats badges. |
| **🏢 Logo Ticker** | Continuous infinite scroll ticker displaying partner & client logos. |
| **⚡ Services Section** | Feature grid highlighting core offerings with interactive hover effects and modal detail cards. |
| **📊 Stats Section** | Key performance indicators and metrics highlighting business scale and achievements. |
| **⚙️ Process Workflow** | Interactive step-by-step process visualization with timeline controls. |
| **💬 Testimonials** | Client feedback cards with star ratings and user profiles. |
| **❓ FAQ Section** | Collapsible accordion Q&A paired with a real-time interactive **3D particle canvas**. |
| **🎯 Call to Action (CTA)** | High-converting final proposal block with interactive form inputs. |
| **📌 Navigation & Footer** | Glassmorphism sticky navbar with quick links, floating quick-chat widget, and complete site footer. |

### ⚡ Visual & Interactive Highlights
- **Cursor Glow Tracker**: Soft radial glow following user mouse movements on desktop viewports.
- **Background Noise Overlay**: Subtraction-grade grain texture overlay for a tactile dark-mode UI finish.
- **Curated Theme Colors**: Accent yellow (`#E2EC07`), crimson red (`#E51A4B`), and deep void background (`#080808`).

---

## 📁 Project Structure

```text
assignment-tcongs/
├── public/                # Static public assets
├── src/
│   ├── assets/            # Static images and icons
│   ├── components/
│   │   ├── 3d/            # Three.js 3D Canvas scenes (Hero3DCanvas, Faq3DCanvas)
│   │   ├── layout/        # Navbar and Footer layout components
│   │   └── sections/      # Hero, Services, Stats, Process, Testimonials, FAQ, CTA, LogoTicker
│   ├── styles/            # Custom CSS & Tailwind definitions (globals.css)
│   ├── App.jsx            # Main App layout component with GSAP cursor tracking & page loader
│   ├── App.css            # Styles for custom components
│   ├── index.css          # Tailwind CSS imports & global rules
│   └── main.jsx           # Application entry point
├── index.html             # HTML shell
├── package.json           # Project dependencies & npm scripts
├── vite.config.js         # Vite configuration file
└── README.md              # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js** (v18.0.0 or higher) and **npm** installed on your system.

### 1. Installation

Clone the repository and install the project dependencies:

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd assignment-tcongs

# Install dependencies
npm install
```

### 2. Development

Start the local development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173` (or the port specified in terminal).

### 3. Production Build

Build the optimized application for production deployment:

```bash
npm run build
```

The compiled assets will be saved to the `dist/` directory.

### 4. Preview Build

Preview the production build locally:

```bash
npm run preview
```

### 5. Linting

Run Oxlint to check code quality:

```bash
npm run lint
```

---

## 📄 License

This project is created for assignment evaluation purposes.

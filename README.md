# Quizary

A dark cream & gold glassmorphic quiz platform — pick a category, take a quiz, track your XP, streaks, and climb the leaderboard.

**Live demo:** [quizary.netlify.app](https://quizary.netlify.app/)

---

## Overview

Quizary is a multi-page front-end quiz web app focused on a premium, gamified learning experience. It combines a glassmorphic design system, XP/leveling, daily challenges, streak tracking, and a leaderboard to make short quizzes feel rewarding rather than routine.

## Features

- 🏠 **Dashboard/Home** — personalized welcome, hero XP card, "Continue your journey" section, daily challenge banner, and quick stats
- 🗂️ **Categories** — browse quizzes by subject
- 📝 **Quiz Interface** — interactive quiz-taking experience
- 📊 **Results** — post-quiz score breakdown
- 🕘 **History** — past quiz activity
- 🏆 **Leaderboard** — weekly top players and rankings
- ⚙️ **Settings** — account and preference management
- 🔐 **Auth** — login and signup pages
- 💬 **Support** — help/contact page
- 📱 **Fully responsive** — sidebar collapses to an off-canvas mobile nav, layouts reflow cleanly across desktop, tablet, and phone breakpoints

## Tech Stack

- **HTML5** — semantic, multi-page structure
- **CSS3** — custom design system (CSS custom properties, no framework), glassmorphism, responsive grid/flex layouts
- **JavaScript (Vanilla)** — page-specific modules, no build step
- **GSAP** — scroll-triggered and entrance animations
- **Google Fonts** — Playfair Display (display) + Inter (body)

## Design System

- **Palette:** deep charcoal background with a dark cream & gold (glassmorphic) accent system
- **Typography:** Playfair Display for headings, Inter for body text
- **Components:** reusable panel, badge, button, and card classes shared across all pages via `variables.css` and `components.css`

## File Structure

```
Quizary/
├── index.html              # Home / dashboard
├── categories.html         # Browse quiz categories
├── quiz.html                # Quiz landing
├── quizinterface.html      # Active quiz-taking screen
├── results.html             # Quiz results/score
├── history.html             # Past activity
├── leaderboard.html        # Rankings
├── setting.html             # User settings
├── login.html                # Login
├── signup.html               # Sign up
├── support.html              # Help/contact
├── README.md
└── assets/
    ├── css/
    │   ├── variables.css     # Design tokens (colors, spacing, fonts)
    │   ├── base.css           # Global resets & base styles
    │   ├── sidebar.css        # Shared nav rail (desktop + mobile)
    │   ├── topbar.css         # Top bar / search / profile menu
    │   ├── components.css    # Shared reusable components (badges, buttons, panels)
    │   ├── home.css           # Home/dashboard page styles
    │   ├── categories.css
    │   ├── quiz.css
    │   ├── quizinterface.css
    │   ├── result.css
    │   ├── history.css
    │   ├── leaderboard.css
    │   ├── setting.css
    │   ├── login.css
    │   ├── signup.css
    │   └── support.css
    ├── js/
    │   ├── app.js              # Shared app init
    │   ├── nav.js               # Sidebar/mobile nav toggle logic
    │   ├── topbar.js            # Topbar interactions (search, profile menu)
    │   ├── data.js               # Shared/mock data
    │   ├── home.js               # Home page (GSAP animations, counters)
    │   ├── categories.js
    │   ├── quiz.js
    │   ├── quizinterface.js
    │   ├── result.js
    │   ├── history.js
    │   ├── leaderboard.js
    │   ├── setting.js
    │   ├── signup.js
    │   └── support.js
    ├── images/
    └── icons/
```

## Getting Started

No build step required — it's plain HTML/CSS/JS.

1. Clone the repo
```bash
   git clone https://github.com/AlamgirKhan24/Quizary.git
   cd Quizary
```
2. Open `index.html` directly in a browser, or serve it locally:
```bash
   python3 -m http.server 8080
```
3. Visit `http://localhost:8080`

## Deployment

Deployed on **Netlify**: [https://quizary.netlify.app/](https://quizary.netlify.app/)

## Author

**Alamgir Khan**
GitHub: [@AlamgirKhan24](https://github.com/AlamgirKhan24)

## License

This project is open source and available for learning/reference purposes.
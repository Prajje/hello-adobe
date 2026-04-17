# Adobe Landing Page — Design Spec

**Date:** 2026-04-17
**Target:** Adobe recruiter (MLE / Sensei GenAI / Digital Experience team)
**Owner:** Prajwal Prakash

## Goal

A single-page, Adobe-branded interactive resume experience hosted on GitHub Pages. The URL is shared with one Adobe recruiter; content is laser-targeted to Adobe. The resume PDF is embedded and downloadable. Animations are meant to feel "blown away" without being gimmicky.

## Scope

**In scope**
- Single long-scroll landing page, 6 sections (hero, "Dear Adobe" letter, experience timeline, signature work, skills + publications, closing CTA)
- Adobe visual language: Source Serif 4 / Source Sans 3 typography, Adobe red `#FA0F00`, dark/light alternating sections, Creative-Cloud-style product tiles
- Scroll-triggered and load-triggered animations (GSAP + ScrollTrigger)
- Resume PDF hosted at `assets/` and linked from hero + closing CTA
- Deployed to `https://prajje.github.io/hello-adobe/`

**Out of scope**
- CMS / dynamic content
- Analytics, contact form, chatbots
- Custom domain (can be added later)
- Multi-page site

## Architecture

- Vanilla HTML / CSS / JS — no build step.
- GSAP 3 + ScrollTrigger loaded from CDN for animations.
- Google Fonts: Source Serif 4 (900), Source Sans 3 (400, 600), Source Code Pro (500).
- Three files only: `index.html`, `css/styles.css`, `js/main.js`. Plus `assets/Prajwal_Prakash_Resume.pdf`.

## Visual language

- **Palette:** background `#0D0D0D` (hero + closing) / `#FAFAFA` (mid-sections). Accent `#FA0F00` Adobe red. Product tile gradients: Ps blue `#31A8FF`, Ai orange `#FF9A00`, Sensei purple `#9999FF`.
- **Type:** Source Serif 4 Black for headlines (tight tracking); Source Sans 3 for body; Source Code Pro for metric callouts.
- **Grid:** 12-column, 1200px max-width, generous whitespace.
- **Section rhythm:** full-bleed alternating dark/light slabs.
- **Oversized metrics:** numbers like "100+" rendered at 120px display size.

## Sections

### 1. Hero (dark)
Full viewport. Typewriter animation on name. Red accent bar slides in underneath. Rotating tagline ("ML Engineer / Computer Vision Researcher / GenAI Builder"). Two CTAs: "View Resume" (scrolls to embedded PDF iframe / closing CTA) and "Download" (downloads PDF). Subtle particle-field backdrop.

### 2. "Dear Adobe" letter (light)
Letter-style personal message (~150–200 words) connecting CV work to Sensei GenAI and Digital Experience: segmentation → audience personalization, SAM auto-labeling → annotation velocity, FP16/INT8 quantization → inference cost at Adobe scale, LLM/agent experience → GenAI product surface. Word "Adobe" rendered in red and subtly pulses. Closes with "Let's Adobe together. — Prajwal".

### 3. Experience timeline (dark)
Vertical timeline with four nodes: Cogniac (Senior MLE), UCSF (Data Scientist), IntelinAir (ML + CV Intern), Columbia (MS EE). Each node scroll-animates in with scale+fade. Metric callouts count up when in view: 100+ live tables, 3 patents, 70% defect-detection lift, 60% model-size reduction, 94.71% pathology accuracy.

### 4. Signature Work (light)
Four Creative-Cloud-style tiles (rounded-square monogram badges, two-letter abbrev inside gradient background):
- **Sb** — Smart Blackjack Table (YOLACT + ViT + K-Means)
- **Bc** — Baccarat Player Rating System (production at Manila, Sri Lanka)
- **Pc** — Pathology Cell Detection (Inception V3 + Conv2D-Transpose decoder)
- **Pd** — Pineapple Density Estimation (U-Net, AWS deploy, published paper)

Cards tilt on hover (vanilla-tilt.js via CDN).

### 5. Skills + Publications (dark)
Two-column layout. Left: skill chips grouped by category (Frameworks, Computer Vision, LLMs & Agents, MLOps & Cloud). Right: three publications with year badges; "Best Paper Award" highlighted with a red flag.

### 6. Closing CTA (dark, red-washed)
Oversized serif headline "Create the future." — letters assemble from scattered positions via GSAP. Subhead: "Together." Contact buttons: email, LinkedIn, GitHub, phone. Large "Download resume" button. Footer: "Built for Adobe · April 2026".

## Animations

- **Hero:** typewriter on name; red bar slide-in; rotating tagline via CSS keyframes.
- **Global:** scroll-progress red "ink trail" down the left gutter.
- **Dear Adobe:** pulsing red "Adobe" word.
- **Timeline:** node scale+fade on enter viewport.
- **Metrics:** count-up on enter viewport.
- **Cards:** tilt-on-hover.
- **Closing:** letters assemble from scattered positions when section reaches viewport.

Respect `prefers-reduced-motion` and disable all animations for users who set it.

## Deployment

- Repo: `github.com/Prajje/hello-adobe` (public)
- Pages source: `main` branch, root directory
- Live URL: `https://prajje.github.io/hello-adobe/`

## Success criteria

- Recruiter opens URL on desktop or mobile; loads in < 2s on broadband.
- Page tells a personal, Adobe-specific story that makes the recruiter remember the candidate.
- Resume is one click away (embedded + downloadable).
- No broken links, no console errors, no layout shift on load.
- Works in current Chrome, Safari, Firefox. Mobile responsive down to 375px.

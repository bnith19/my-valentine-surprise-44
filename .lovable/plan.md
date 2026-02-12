

# 💖 Valentine Single-Page Website

A playful, romantic, scroll-based Valentine experience with fun interactions and a celebratory finale.

---

## Section 1: Welcome / Intro Screen
- Full-screen romantic intro with a large heading ("Hi XXX 💖") and heartfelt subtext
- Soft pink/red gradient background with floating heart particles
- "Read my message below ↓" button that smooth-scrolls to the next section
- All text driven by a central config object for easy editing

## Section 2: Reasons I Love You
- Vertical stack of soft, rounded cards with romantic reasons
- Staggered fade-in animations as cards scroll into view
- Easy-to-edit array of reasons in the config — add or remove without touching layout code

## Section 3: Our Favourite Moments (Photo Collage)
- Responsive grid/collage of 8–12 images with rounded corners and playful overlap
- Hover effects (gentle zoom + glow)
- Placeholder images used initially; URLs easily swappable in the config

## Section 4: Will You Be My Valentine? (Main Interaction)
- Centered question with two buttons: **Yes 💖** and **No 😈**
- **No button:** moves to a random spot on screen each time it's clicked, with a bounce/shake animation — feels chaotic and funny
- **Yes button:** grows slightly bigger and gains a romantic glow/pulse each time "No" is clicked, becoming irresistible

## Section 5: "Yes" Celebration Modal
- On clicking Yes, a playful popup appears: *"Yesss 😌 Now you're a good girl 💖"*
- "Continue 💕" button to proceed to the finale
- All modal text editable via config

## Section 6: Final Valentine Screen
- Full-screen celebratory reveal with "Happy Valentine's Day 💋"
- Floating hearts / confetti animation
- Kissing GIF or romantic animation
- Optional "Replay" button to restart the experience

---

## Design & Technical Approach
- **Romantic color palette:** pinks, reds, blush tones with soft gradients
- **Typography:** elegant, modern fonts with large headings and comfortable spacing
- **All content** (name, texts, reasons, images) stored in a single editable config object at the top of the code
- **Mobile-first responsive** design
- **Keyboard accessible** buttons with proper labels
- **Smooth scroll** navigation between sections
- **Frontend-only** — no backend needed


# Maheen Wahid — Portfolio

A dependency-free, responsive portfolio built with HTML, CSS, and vanilla JavaScript. Deploy the project directory to any static web host; no build step or server-side runtime is required.

## Updating content

- Edit `index.html` for portfolio copy, skills, projects, work history, and links.
- Edit `styles.css` for the design system and responsive layouts.
- Edit `script.js` for theme persistence, navigation behavior, and the automatically updated footer year.
- Edit `resume.html` as the editable resume source. It deliberately omits a phone number. Use **Print / Save as PDF** in a browser to export a fresh `resume.pdf`; keep the PDF beside `index.html` so the resume links continue to work.
- Keep the email (`maheen.1wahid@gmail.com`), GitHub, and LinkedIn links consistent in both HTML files.

The light/dark theme follows the visitor's operating-system preference on first visit and remembers a manual choice in browser storage. Subtle scroll reveals and card transitions respect reduced-motion preferences and do not hide content if JavaScript is unavailable. The engineering and project previews are drawn with HTML and CSS, so there are no missing screenshot assets to manage. Geist and DM Mono load from Google Fonts, with system-font fallbacks.

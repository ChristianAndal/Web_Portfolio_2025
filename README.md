# Modern Responsive Portfolio

A beautiful, modern, and fully responsive web portfolio built with HTML, CSS, JavaScript, and Bootstrap 5.

## Features

- ✅ **Responsive Design** - Works perfectly on all devices (desktop, tablet, mobile)
- ✅ **Modern UI/UX** - Clean and professional design with smooth animations
- ✅ **About Me Section** - Showcase your skills and experience
- ✅ **Featured Projects** - Display your work with hover effects and links
- ✅ **Education Timeline** - Beautiful timeline design for your educational background
- ✅ **Awards Section** - Highlight your achievements and recognitions
- ✅ **Contact Form** - Working contact form with validation
- ✅ **Smooth Scrolling** - Enhanced navigation experience
- ✅ **Animated Sections** - Fade-in animations on scroll
- ✅ **Social Media Links** - Connect your social profiles

## Technologies Used

- **HTML5** - Structure and content
- **CSS3** - Styling and animations
- **JavaScript** - Interactivity and dynamic features
- **Bootstrap 5** - Responsive grid system and components
- **Bootstrap Icons** - Beautiful icon library
- **GSAP + ScrollTrigger** - Reusable, reduced-motion-aware animation utilities loaded via CDN

## Codex frontend workflow

Project-specific frontend guidance lives in `AGENTS.md` and `.codex/skills/`. Read the relevant skill before UI work:

- `frontend-design` for layout and composition
- `ui-ux-pro-max` for interaction, accessibility, and responsive behavior
- `impeccable` for visual refinement
- `gsap` for shared motion utilities

GSAP is configured in `animations/gsap.js`. Add `data-gsap="fade-up"` or `data-gsap="fade-in"` to markup when a simple scroll reveal is appropriate, or call the exposed `window.PortfolioAnimations` helpers for more specific motion. Existing Bootstrap and custom JavaScript behavior remains unchanged.

## Getting Started

1. Open `index.html` in your web browser
2. Customize the content with your own information
3. Replace placeholder images with your actual project screenshots
4. Update contact information and social media links
5. Modify colors and styling in `styles.css` to match your brand

## Customization

### Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    --dark-color: #212529;
    --light-color: #f8f9fa;
}
```

### Content
- Update personal information in `index.html`
- Add your projects, education, and awards
- Modify the contact form action URL if needed

### Images
Replace placeholder images with your own:
- Profile picture in the About section
- Project screenshots in the Projects section

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Feel free to use this portfolio template for your personal or commercial projects.

---

**Note:** Remember to replace placeholder content and images with your actual information before publishing!


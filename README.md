# Personal Portfolio Website

[![Angular](https://img.shields.io/badge/Angular-19.2.13-DD0031?style=flat-square&logo=angular)](https://angular.io/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.1-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PWA](https://img.shields.io/badge/PWA-ready-5B0BB5.svg?style=flat-square&logo=pwa)](https://web.dev/progressive-web-apps/)

This is a modern, responsive portfolio website built with Angular 19.2 and TailwindCSS. The site showcases my professional work, skills, and experiences through an intuitive and clean interface.

## Features

- 🚀 Built with Angular 19.2
- 💨 Styled with TailwindCSS
- 📱 Fully Responsive Design
- 🌙 Dark Mode Support
- ⚡ Progressive Web App (PWA)
- 🔍 SEO Optimized
- 🎯 Dynamic Content Loading
- 🌐 Social Media Integration

## Sections

- Home Page with Hero Section
- About Me
- Projects Showcase
- Skills & Technologies
- Contact Information
- Blog Integration

## Technology Stack

- **Frontend Framework:** Angular 19.2.13
- **Styling:** 
  - TailwindCSS 3.4.1
  - SCSS
  - PostCSS 8.4.35
  - Autoprefixer 10.4.17
- **Configuration:** YAML 2.7.1
- **Routing:** Angular Router
- **State Management:** RxJS 7.8.0
- **Deployment:** GitHub Pages (angular-cli-ghpages 2.0.3)
- **Server:** Express.js 4.21.2 (for production)
- **Testing:** 
  - Jasmine 5.6.0
  - Karma 6.4.0

## Development Tools

- TypeScript 5.7.2
- Node.js (LTS version)
- Angular CLI 19.2.13
- npm (package manager)

## Getting Started

### Prerequisites

- Node.js (LTS version)
- npm (comes with Node.js)
- Angular CLI (`npm install -g @angular/cli`)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/jamithnimantha/jamithnimantha.github.io.git
   cd jamithnimantha.github.io
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start development server
   ```bash
   npm start
   ```
   Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Deployment

The site is automatically deployed to GitHub Pages using the following command:
```bash
npm run deploy
```

## Development Commands

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Watch mode for development
npm run watch

# Deploy to GitHub Pages
npm run deploy
```

### Environment Setup

1. Make sure you have Node.js LTS installed
2. Install Angular CLI globally:
   ```bash
   npm install -g @angular/cli@19.2.13
   ```
3. Follow the installation steps in the section below

## Project Structure

```
src/
├── app/
│   ├── pages/          # Main page components
│   ├── shared/         # Shared components
│   ├── services/       # Application services
│   └── interceptors/   # HTTP interceptors
├── assets/
│   ├── profile.yml     # Profile configuration
│   └── images/         # Image assets
└── styles/            # Global styles
```

## Configuration

The site content is configured through `profile.yml` in the assets folder. Update this file to modify:
- Personal Information
- Social Media Links
- Project Details
- Skills & Technologies

## Testing

The project uses Jasmine and Karma for unit testing. Run tests with:
```bash
npm test
```

## Progressive Web App

This project is configured as a Progressive Web App (PWA) using @angular/service-worker. Key features include:
- Offline functionality
- App-like experience
- Fast loading times
- Home screen installation

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- iOS Safari
- Chrome for Android

## Performance Optimizations

- Lazy loading of modules
- Image optimization
- Service Worker caching
- Minification and bundling
- Tree shaking
- Differential loading

## Contributing

Feel free to fork this project and submit pull requests for any improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- Website: [jamith.com](https://jamith.com)
- Blog: [blog.jamith.com](https://blog.jamith.com)
- GitHub: [@JamithNimantha](https://github.com/JamithNimantha)
- LinkedIn: [JamithNimantha](https://www.linkedin.com/in/JamithNimantha)

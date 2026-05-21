
# Subam Hospital Website

A modern hospital website built with React, Vite, TypeScript, and Tailwind CSS. The project is structured as a responsive public-facing healthcare site with dedicated pages for hospital information, specialties, doctors, services, blogs, and contact flows.

## Project Highlights

- Responsive public website for desktop, tablet, and mobile
- Reusable UI components for hero sections, doctor cards, services, testimonials, and headers/footers
- Page-based routing for hospital, specialty, and content sections
- Clean design system with Tailwind CSS utility classes
- Motion-enhanced interactions using Framer Motion-compatible motion primitives
- Iconography powered by Lucide React

## Tech Stack

### Frontend

- HTML5
- CSS3
- JavaScript / TypeScript
- React 19
- Vite
- Tailwind CSS
- Lucide React
- Motion
- React Router

### CMS and Content Layer

This project is designed to work with a WordPress-driven content workflow where needed.

- WordPress as the central CMS
- Gutenberg Block Editor
- Custom Post Types for doctors, departments, and news/blogs
- WordPress REST API for dynamic content delivery

### Deployment and Hosting

- Hostinger hosting infrastructure
- Domain and DNS management through Hostinger
- SSL/TLS for secure delivery

## CMS-Driven Architecture

The system follows a CMS-first architecture:

- WordPress stores and manages hospital content for non-technical staff
- The frontend presents a custom, branded experience to site visitors
- The WordPress REST API can be used to fetch posts, pages, and custom post types
- This separation keeps content management simple while preserving frontend flexibility

## Recommended WordPress Plugins

- Advanced Custom Fields for structured content
- WPForms or Contact Form 7 for inquiries
- Wordfence Security for protection
- Rank Math SEO or Yoast SEO for search visibility
- UpdraftPlus for backups
- LiteSpeed Cache, Smush, or ShortPixel for performance optimization

## Project Structure

```text
src/
   App.tsx
   main.tsx
   index.css
   constants.ts
   components/
      Doctors.tsx
      Footer.tsx
      Header.tsx
      Hero.tsx
      Services.tsx
      TestimonialCarousel.tsx
   pages/
      Home.tsx
      About.tsx
      Contact.tsx
      DoctorsPage.tsx
      ServicesPage.tsx
      Facilities.tsx
      Gallery.tsx
      HealthBlogs.tsx
      MedicalJournals.tsx
      OurNetwork.tsx
      SuccessStories.tsx
      Videos.tsx
      hospitals/
      specialities/
```

## Getting Started

### Prerequisites

- Node.js
- npm

### Install Dependencies

```bash
npm install
```

### Run the Development Server

```bash
npm run dev
```

The app runs on Vite with port 3000 configured in the project scripts.

### Build for Production

```bash
npm run build
```

### Preview the Production Build

```bash
npm run preview
```

### Type Check

```bash
npm run lint
```

## Available Scripts

- `npm run dev` - start the Vite development server
- `npm run build` - create a production build
- `npm run preview` - preview the production build locally
- `npm run clean` - remove the `dist` directory
- `npm run lint` - run TypeScript type checking

## Content Areas

The website includes sections for:

- Home
- About
- Doctors
- Services
- Facilities
- Contact
- Articles and blogs
- Medical journals
- Gallery and videos
- Hospital and specialty pages

## Notes

This repository currently contains the frontend implementation. If the WordPress CMS layer is connected later, the frontend can be extended to fetch live content through the REST API without changing the overall UI structure.

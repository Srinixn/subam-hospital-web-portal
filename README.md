# Subam Hospital Website

A production hospital website created for my client, Subam Hospital, with connected pages for Sunsrishti Speciality Hospital and Sunsrishti Fertility Center.

**Live website:** [subamhospital.in](https://subamhospital.in)

## Website Preview

![Subam Hospital homepage](https://subamhospital.in/assert1/hero%20image/C9072T01.JPG)

![Sunsrishti Fertility Center](https://subamhospital.in/assert1/home%20page/C9268T01.JPG)

![Sunsrishti Speciality Hospital](https://subamhospital.in/assert1/hero%20image/C9342T01.JPG)

![Hospital facilities](https://subamhospital.in/assert1/home%20page/C9353T01.JPG)

## My Responsibilities

- Client requirement analysis and project planning
- Website architecture and responsive UI development
- Content management and service presentation
- Contact, enquiry, and feedback workflows
- Admin portal and backend integration
- SEO structure and performance-focused implementation
- Deployment coordination and ongoing maintenance

## Features

- Responsive public website for desktop, tablet, and mobile
- Hospital services, departments, doctors, facilities, articles, and careers pages
- Contact and enquiry forms with file-upload support
- Admin portal for managing content and support tickets
- Chat assistant with FAQ and fallback enquiry workflows
- SEO-friendly metadata, routes, sitemap, and robots configuration
- Session-based and token-based authentication for protected admin features

## Technology

- React and TypeScript
- Vite
- Tailwind CSS
- Node.js and Express
- MySQL
- JWT and session authentication
- OpenAI integration with a keyword-search fallback

## Repository Structure

```text
frontend/   Public website
admin/      Admin portal
backend/    REST API and database services
```

## Local Development

```bash
npm install
copy backend\.env.example backend\.env
npm run createdb --workspace=backend
npm run migrate --workspace=backend
npm run seed --workspace=backend
```

Start the applications in separate terminals:

```bash
npm run dev:backend
npm run dev:frontend
npm run dev:admin
```

The local applications run on ports `4000` (API), `3000` (website), and `3001` (admin portal). Refer to the environment example for local configuration. No production credentials or client deployment details are included in this repository.

## Validation

```bash
npm run lint:frontend
npm run lint:backend
npm run build:frontend
npm run build:admin
npm run build
```

## Portfolio Notice

This repository is shared solely for portfolio and interview purposes. Client-sensitive information, credentials, and proprietary assets have been removed. Public branding and preview images are included only for portfolio presentation.

You may view or clone this repository only to evaluate the author's work, skills, and implementation during a portfolio review, interview, or educational discussion. You may not copy, reuse, modify, deploy, publish, redistribute, resell, or incorporate this code or its assets into another project without written permission. See the [LICENSE](LICENSE) file for the complete terms.

## License

This repository is provided under a custom Portfolio Evaluation License. It is not open-source software and is not licensed for production, commercial, client, or public reuse.

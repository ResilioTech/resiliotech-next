# Resiliotech - Next.js Website

> A modern, high-performance DevOps consultancy website built with Next.js 14, TypeScript, and Tailwind CSS.

![Resiliotech Banner](public/og-image.png)

## 🚀 Overview

Resiliotech is a cutting-edge DevOps consultancy website showcasing modern infrastructure solutions, cloud automation, and enterprise-grade development services. Built with performance, accessibility, and SEO optimization in mind.

### ✨ Key Features

- **🏗️ Modern Architecture**: Next.js 14 with App Router, TypeScript, and Server Components
- **🎨 Beautiful UI**: Custom dark theme with smooth animations using Framer Motion
- **📱 Responsive Design**: Mobile-first approach with Tailwind CSS
- **📝 Content Management**: MDX-based blog system with syntax highlighting
- **🚀 Performance**: Optimized with image optimization, code splitting, and caching
- **♿ Accessible**: WCAG compliant with semantic HTML and proper ARIA attributes
- **🔍 SEO Optimized**: Structured data, meta tags, and sitemap generation
- **📧 Newsletter**: Integrated newsletter signup with Netlify Forms
- **🔒 Security**: CSP headers, security best practices, and form validation

## 🛠️ Tech Stack

### Core Technologies
- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

### Content & Forms
- **Content**: [MDX](https://mdxjs.com/) with [remark](https://remark.js.org/) & [rehype](https://github.com/rehypejs/rehype)
- **Forms**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) validation
- **Search**: [Fuse.js](https://fusejs.io/) for fuzzy search functionality

### Development Tools
- **Build Tool**: Next.js built-in webpack configuration
- **Linting**: ESLint with Next.js config
- **Type Checking**: TypeScript compiler
- **Deployment**: [Netlify](https://netlify.com/) with CI/CD

## 📁 Project Structure

```
resiliotech-next/
├── 📂 src/
│   ├── 📂 app/                    # Next.js App Router pages
│   │   ├── 📂 about/              # About page
│   │   ├── 📂 blog/               # Blog listing and individual posts
│   │   ├── 📂 contact/            # Contact form page
│   │   ├── 📂 products/           # Product showcase pages
│   │   ├── 📂 projects/           # Project portfolio
│   │   ├── 📂 services/           # Service detail pages
│   │   ├── layout.tsx             # Root layout with navigation
│   │   ├── page.tsx               # Homepage
│   │   ├── not-found.tsx          # Custom 404 page
│   │   └── globals.css            # Global styles
│   │
│   ├── 📂 components/             # Reusable React components
│   │   ├── 📂 about/              # About page components
│   │   ├── 📂 blog/               # Blog-related components
│   │   ├── 📂 contact/            # Contact form components
│   │   ├── 📂 layout/             # Layout components (Header, Footer)
│   │   ├── 📂 sections/           # Homepage sections
│   │   ├── 📂 seo/                # SEO components
│   │   └── 📂 ui/                 # Generic UI components
│   │
│   ├── 📂 content/                # Content files
│   │   ├── 📂 blog/               # MDX blog posts
│   │   ├── authors.json           # Author information
│   │   └── categories.json        # Blog categories
│   │
│   ├── 📂 data/                   # Static data files
│   │   ├── company.ts             # Company information
│   │   ├── product-features.ts    # Product feature data
│   │   └── sample-projects.ts     # Project portfolio data
│   │
│   ├── 📂 lib/                    # Utility functions
│   │   ├── blog-data.ts           # Blog content processing
│   │   └── utils.ts               # General utilities
│   │
│   └── 📂 types/                  # TypeScript type definitions
│       ├── blog.ts                # Blog-related types
│       ├── company.ts             # Company data types
│       └── projects.ts            # Project types
│
├── 📂 public/                     # Static assets
│   ├── 📂 blog-images/            # Blog post images
│   ├── 📂 icons/                  # Favicon and app icons
│   ├── 📂 og-images/              # Open Graph images
│   ├── 📂 project-images/         # Project thumbnails
│   ├── 📂 team/                   # Team member photos
│   ├── 📂 tech-logos/             # Technology logos (SVG)
│   │   ├── aws.svg                # Cloud platform logos
│   │   ├── docker.svg             # Container technology
│   │   ├── kubernetes.svg         # Orchestration tools
│   │   └── README.md              # Logo usage guide
│   ├── favicon.ico                # Website favicon
│   ├── site.webmanifest           # PWA manifest
│   └── _redirects                 # Netlify redirects
│
├── next.config.js                 # Next.js configuration
├── tailwind.config.ts             # Tailwind CSS configuration
├── tsconfig.json                  # TypeScript configuration
├── netlify.toml                   # Netlify build configuration
└── package.json                   # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** 18+ 
- **npm** or **yarn** package manager
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/resiliotech-next.git
   cd resiliotech-next
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the website.

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server at localhost:3000 |
| `npm run build` | Build production-ready application |
| `npm run start` | Start production server (requires build) |
| `npm run lint` | Run ESLint code quality checks |
| `npm run type-check` | Run TypeScript type checking |
| `npm run export` | Export static site (if using static export) |

## 🎨 Design System

### Color Palette

Our design uses a sophisticated dark theme with accent colors:

```css
/* Primary Colors */
--background: #0a0a0a        /* Main background */
--surface: #111111           /* Card surfaces */  
--surface-elevated: #1a1a1a  /* Elevated surfaces */
--border: #333333            /* Border color */

/* Accent Colors */  
--primary: #00D4FF           /* Primary brand color */
--secondary: #6366f1         /* Secondary actions */
--accent: #10b981            /* Success/highlights */

/* Text Colors */
--text-primary: #ffffff      /* Primary text */
--text-secondary: #d4d4d8    /* Secondary text */
--text-muted: #9ca3af        /* Muted text */
```

### Typography

- **Primary Font**: Inter (system-ui fallback)
- **Font Sizes**: Responsive scale from 12px to 64px
- **Line Height**: Optimized for readability (1.5 - 1.7)

### Animations

- **Entrance Animations**: Fade-in, slide-up effects
- **Hover Effects**: Scale, glow, and color transitions
- **Page Transitions**: Smooth loading states
- **Scroll Animations**: Intersection Observer based

## 📝 Content Management

### Blog Posts

Blog posts are written in MDX format and stored in `src/content/blog/`. Each post includes:

```markdown
---
title: "Your Blog Post Title"
excerpt: "Brief description of the post"
date: "2024-01-15"
author: "author-id"
category: "category-id"  
tags: ["devops", "kubernetes", "automation"]
image: "/blog-images/your-image.jpg"
---

Your MDX content here with React components support...
```

### Adding New Content

1. **Blog Posts**: Create new `.mdx` files in `src/content/blog/`
2. **Authors**: Update `src/content/authors.json`
3. **Categories**: Modify `src/content/categories.json`
4. **Projects**: Edit `src/data/sample-projects.ts`
5. **Images**: Add to respective folders in `public/`

## 🌐 SEO & Performance

### SEO Features

- **Structured Data**: JSON-LD for rich snippets
- **Meta Tags**: Dynamic Open Graph and Twitter cards
- **Sitemap**: Auto-generated XML sitemap
- **Robots.txt**: Search engine directives
- **Canonical URLs**: Proper URL canonicalization

### Performance Optimizations

- **Image Optimization**: Next.js Image component with WebP
- **Code Splitting**: Automatic route-based splitting
- **Lazy Loading**: Components and images
- **Caching**: Static generation with ISR
- **Bundle Analysis**: Webpack bundle optimization

### Core Web Vitals

Target metrics:
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

## 🔒 Security

### Security Features

- **CSP Headers**: Content Security Policy implementation
- **Form Validation**: Client and server-side validation
- **XSS Protection**: Built-in Next.js protections
- **HTTPS Only**: Secure connections enforced
- **Dependencies**: Regular security updates

### Best Practices

- Sanitized user inputs
- Secure environment variables
- Protected API routes
- Safe external link handling

## 📧 Newsletter Integration

The website includes newsletter signup functionality using Netlify Forms:

1. **Forms**: Located in contact page and modal
2. **Processing**: Netlify handles form submissions
3. **Storage**: Submissions stored in Netlify dashboard
4. **Notifications**: Email alerts for new signups

## 🚀 Deployment

### Netlify Deployment

1. **Connect Repository**: Link your Git repository to Netlify
2. **Build Settings**:
   ```toml
   [build]
   command = "npm run build"
   publish = ".next"
   ```
3. **Environment Variables**: Set any required environment variables
4. **Deploy**: Automatic deployments on git push

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm run start
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for local development:

```env
# Optional: Add any API keys or configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Customization

1. **Colors**: Modify `tailwind.config.ts`
2. **Typography**: Update font imports in `layout.tsx`
3. **Content**: Edit files in `src/data/` and `src/content/`
4. **Components**: Customize components in `src/components/`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Development Guidelines

- Follow existing code style and conventions
- Write TypeScript for type safety
- Add proper documentation for new features
- Test your changes across different devices
- Ensure accessibility standards are met

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:

- **Email**: contact@resiliotech.com
- **Website**: [resiliotech.com](https://resiliotech.com)
- **Issues**: [GitHub Issues](https://github.com/your-username/resiliotech-next/issues)

## 🏆 Acknowledgments

- **Next.js Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Framer Motion** for smooth animations
- **Lucide** for beautiful icons
- **Netlify** for seamless deployment

---

<p align="center">
  <strong>Built with ❤️ by the Resiliotech Team</strong>
</p>

<p align="center">
  <img src="public/tech-logos/aws.svg" width="32" height="32" alt="AWS" />
  <img src="public/tech-logos/docker.svg" width="32" height="32" alt="Docker" />
  <img src="public/tech-logos/kubernetes.svg" width="32" height="32" alt="Kubernetes" />
  <img src="public/tech-logos/terraform.svg" width="32" height="32" alt="Terraform" />
</p>
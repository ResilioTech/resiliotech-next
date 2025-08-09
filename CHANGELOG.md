# Changelog

## [Credibility & SEO Improvements] - 2024-08-09

### 🎯 Credibility & Copy Updates
- **Home Hero**: Updated CTAs to "Get Started" (primary) and "See Case Studies" (secondary)
- **Social Proof**: Removed generic "YC/Series A/Unicorn" badges 
- **Stats Enhancement**: Added "See how →" links to all quantified claims, linking to relevant project case studies
- **Response Time**: Unified copy to "We respond within 24 hours" across home and contact pages
- **Product Status**: Updated product launch dates to current status:
  - DeployFlow: Changed to "Launched" 
  - Others: Changed to "Join Waitlist" with appropriate CTAs

### 🧭 Information Architecture & Linking
- **Navigation**: Changed "Projects" → "Case Studies" in header/footer (preserving /projects URLs)
- **Service Pages**: Updated "View Case Studies" CTAs to link to filtered project pages (/projects?category=service)
- **Cross-linking**: Enhanced stat callouts with direct links to supporting case studies

### 📝 Blog Content Updates
- **Freshness**: Changed "Weekly updates" → "Occasional updates on DevOps, Cloud & MLOps" 
- **Timestamps**: Enhanced blog post layout with "Updated on" display (frontmatter supported)

### 🔍 Technical SEO
- **robots.txt**: Created with sitemap reference, allowing public pages, blocking admin/api routes
- **sitemap.xml**: Generated dynamic sitemap including all static pages, blog posts, and project pages
- **Structured Data**: Enhanced JSON-LD support for:
  - Organization schema with social links and contact info
  - Service schemas for all service pages  
  - Product schemas with launch status and pricing
  - BlogPosting schemas with author and publisher data
  - FAQPage schemas for service page Q&As
  - BreadcrumbList schemas across all pages
- **Breadcrumb Helper**: Created utility for consistent breadcrumb generation with route-aware naming

### 🏗️ Technical Improvements
- **Product Logic**: Enhanced product status handling (launched/waitlist/beta)
- **Link Consistency**: Updated internal linking to use consistent "Case Studies" language
- **SEO Foundation**: Established structured data infrastructure for Google Rich Results

### 📊 Impact
- ✅ Improved credibility with backed claims and real case study links
- ✅ Enhanced SEO with comprehensive structured data and proper sitemaps  
- ✅ Better user experience with consistent language and clear CTAs
- ✅ Technical foundation ready for analytics and conversion tracking

---

*Generated with [Claude Code](https://claude.ai/code)*
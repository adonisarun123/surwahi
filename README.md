# 🌿 Surwahi Eco-Lodge Website

A comprehensive Next.js 15 website for Surwahi Eco-Lodge, an eco-friendly forest retreat in Madhya Pradesh, India. Built with sustainability and conservation at its core.

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)

## 🌟 Features

### 🏨 **Complete Hospitality Platform**
- **Room Booking System** - Advanced reservation system with availability checking
- **Activity Management** - Forest experiences and guided tours
- **Gallery Showcase** - Stunning photo collections with lightbox viewing
- **Contact & Inquiry** - Comprehensive contact forms with validation

### ♻️ **Sustainability Focus**
- **Impact Dashboard** - Real-time environmental metrics
- **Conservation Stories** - Blog system highlighting eco-initiatives  
- **Transparency Reports** - Monthly sustainability tracking
- **Responsible Tourism** - Ethical wildlife viewing guidelines

### 🎯 **User Experience**
- **Mobile Responsive** - Optimized for all devices
- **Performance Optimized** - Fast loading with Next.js 15 features
- **SEO Ready** - Rich snippets and structured data
- **Accessibility** - WCAG compliant design

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design tokens
- **Database**: PostgreSQL with Prisma ORM
- **Validation**: Zod schemas
- **Icons**: Lucide React
- **Performance**: Built-in Next.js optimizations

## 📂 Project Structure

```
surwahi-website/
├── src/
│   ├── app/                    # App Router pages
│   │   ├── accommodations/     # Room listings & details
│   │   ├── around-surwahi/     # Regional attractions
│   │   ├── blog/              # Conservation stories
│   │   ├── contact/           # Contact & directions
│   │   ├── gallery/           # Photo gallery
│   │   ├── sustainability/    # Environmental impact
│   │   ├── things-to-do/      # Activities & experiences
│   │   └── api/               # API routes
│   ├── components/            # Reusable components
│   ├── lib/                   # Utilities & configuration
│   └── types/                # TypeScript definitions
├── prisma/
│   └── schema.prisma         # Database schema
├── tailwind.config.ts        # Design system
└── next.config.ts           # Next.js configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/adonisarun123/surwahi.git
   cd surwahi
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure your environment variables:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/surwahi"
   NEXT_PUBLIC_SITE_URL="http://localhost:3000"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📚 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma studio` - Open database admin
- `npx prisma generate` - Generate Prisma client

## 🎨 Design System

### Colors
- **Forest Greens**: Primary brand colors for nature connection
- **Earth Tones**: Warm browns and creams for comfort
- **Natural Accents**: Moss greens and river blues for highlights

### Typography
- **Display Font**: Fraunces (serif) for elegant headings
- **UI Font**: Inter (sans-serif) for clean readability

## 🌍 Environmental Impact

This website showcases real sustainability metrics:
- **Solar Power**: 100% renewable energy tracking
- **Water Conservation**: Rainwater harvesting monitoring  
- **Zero Waste**: Complete waste elimination reporting
- **Carbon Negative**: Reforestation impact measurement

## 📱 Pages Overview

| Page | Description | Features |
|------|-------------|----------|
| **Homepage** | Welcome experience | Hero, booking widget, featured content |
| **Accommodations** | Room showcase | Listings, details, availability |
| **Sustainability** | Environmental impact | Metrics, initiatives, certifications |
| **Things to Do** | Activities guide | Experiences, booking, guidelines |
| **Around Surwahi** | Regional attractions | Local destinations, travel tips |
| **Gallery** | Photo showcase | Masonry layout, lightbox viewing |
| **Blog** | Conservation stories | Dynamic content, SEO optimized |
| **Contact** | Get in touch | Forms, directions, travel info |

## 🔒 Security Features

- **Input Validation** - Zod schemas for all forms
- **CSRF Protection** - Built-in Next.js security
- **Security Headers** - Comprehensive HTTP headers
- **Environment Variables** - Secure configuration management

## 📈 Performance

- **Core Web Vitals** optimized
- **Image optimization** with next/image
- **Font optimization** with next/font
- **Code splitting** for efficient loading
- **Static generation** where possible

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Surwahi Eco-Lodge** for their commitment to sustainable tourism
- **Next.js Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Prisma** for the excellent database toolkit

---

**Built with ❤️ for sustainable tourism and conservation**

For more information about Surwahi Eco-Lodge's mission and conservation efforts, visit the deployed website.
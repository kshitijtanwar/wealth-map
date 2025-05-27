# Wealth Map

Unlock detailed ownership, valuation, and wealth insights—powered by advanced mapping and integrated data intelligence.

## Description

Wealth Map is a powerful platform designed to help teams discover, analyze, and manage property ownership and wealth data across the United States. With an intuitive interface and seamless third-party integrations, users can navigate interactive maps, access detailed property records, and evaluate owner financial profiles. Built for modern businesses, Wealth Map streamlines data exploration and reporting, empowering companies to make informed decisions with confidence. Whether you're conducting research, building reports, or exploring new markets, Wealth Map equips you with the tools and insights to uncover hidden value and opportunity.

## Features

- 🔐 **Access Control** - Manage employee access with role-based permissions, usage tracking, and company-wide data preferences
- 🗺️ **Interactive Property Map** - Explore properties across the U.S. with dynamic filtering, clustering, and satellite view support
- 📈 **Seamless Scalability** - From startups to enterprises, Wealth Map scales with your team's needs through robust APIs and performance optimization
- 📊 **Data-Driven Insights** - Unlock wealth estimates, ownership history, and financial breakdowns to support strategic decision-making

## Tech Stack

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS, Shadcn
- **State Management**: ContextAPI

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 18.0 or higher)
- npm or yarn package manager

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kshitijtanwar/wealth-map.git
   cd your-project-name
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
   Navigate to `http://localhost:5173` to view the application

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check for code issues

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
├── assets/             # Static assets (images, icons, etc.)
├── index.css             # Global styles and theme
└── main.tsx            # Application entry point
```

## Configuration

### Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_KEY=

VITE_EMAILJS_SERVICE_ID = 
VITE_EMAILJS_INVITATION_TEMPLATE_ID = 
VITE_EMAILJS_PUBLIC_KEY = 
VITE_GOOGLE_MAPS_API_KEY=
VITE_GOOGLE_MAPS_ID=


VITE_BACKEND_URL=
VITE_BACKEND_URL_PROD=
```

Copy `.env.example` to `.env` and update the values according to your setup.

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Your Name - [your.email@example.com](mailto:your.email@example.com)

Project Link: [https://github.com/yourusername/your-project-name](https://github.com/yourusername/your-project-name)

## Acknowledgments

- [React](https://reactjs.org/) - The web framework used
- [Vite](https://vitejs.dev/) - Build tool and development server
- [TypeScript](https://www.typescriptlang.org/) - Language for type safety

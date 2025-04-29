# SpaceNext Launch Tracker

A sleek, modern web application that displays upcoming space launches using SpaceX's public API. The application features a beautiful 3D coverflow carousel that showcases upcoming missions with key details.

## Features

- 🚀 Live tracking of upcoming SpaceX launches
- ✨ Visually striking 3D coverflow carousel 
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🎯 Detailed mission information for each launch
- 🔄 Real-time data fetching from SpaceX API v5

## Demo

![SpaceNext Demo](screenshot.png)

## Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Icons**: React Icons

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/spacenext.git
cd spacenext
```

2. Install dependencies
```bash
npm install
# or with yarn
yarn install
```

3. Start the development server
```bash
npm run dev
# or with yarn
yarn dev
```

4. Open your browser and visit `http://localhost:5173/`

### Building for Production

```bash
npm run build
# or with yarn
yarn build
```

The built files will be in the `dist` directory.

## Project Structure

```
spacenext/
├── docs/                  # Project documentation
│   ├── checklist.md       # Development checklist
│   ├── wow.md             # Ways of Working document
│   ├── recipes/           # Development recipes
│   └── specs/             # Project specifications
├── public/                # Static assets
│   └── favicon.ico
├── src/                   # Source code
│   ├── assets/            # Images, fonts, etc.
│   ├── components/        # React components
│   │   ├── LaunchCarousel/    # Carousel implementation
│   │   │   ├── LaunchCarousel.tsx
│   │   │   ├── LaunchCard.tsx
│   │   │   └── CarouselNav.tsx
│   │   ├── Header.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── ErrorMessage.tsx
│   ├── hooks/             # Custom React hooks
│   │   └── useLaunchData.ts
│   ├── services/          # API services
│   │   └── launchService.ts
│   ├── types/             # TypeScript type definitions
│   │   └── launchTypes.ts
│   ├── styles/            # Global styles
│   ├── App.tsx            # Main application component
│   ├── main.tsx           # Application entry point
│   ├── index.css          # Global CSS
│   └── vite-env.d.ts      # Vite environment definitions
├── .eslintrc.js           # ESLint configuration
├── .prettierrc            # Prettier configuration
├── index.html             # HTML entry point
├── package.json           # Project dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite configuration
```

## API

The application uses the SpaceX API v5, specifically the launches/query endpoint:

```
https://api.spacexdata.com/v5/launches/query
```

The API service is configured to fetch upcoming launches with populated rocket and launchpad information.

## Development

### Key Components

- **LaunchCarousel**: The main carousel component that implements the 3D coverflow effect
- **LaunchCard**: Individual launch information cards displayed in the carousel
- **CarouselNav**: Navigation buttons for the carousel
- **useLaunchData**: Custom hook for fetching and managing launch data

### Styling

The project uses Tailwind CSS for styling with custom configuration for colors, typography, and responsive breakpoints. Additional 3D transform utilities are defined in `index.css`.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [SpaceX API](https://github.com/r-spacex/SpaceX-API) for providing the launch data
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [React Icons](https://react-icons.github.io/react-icons/) for the icon set
- [Vite](https://vitejs.dev/) for the fast build tool and development server

# Kalendlyy 📅

A modern, interactive calendar application built with React and TypeScript, featuring a beautiful 3D background and smooth animations. Kalendlyy provides an intuitive interface for managing your events with both grid and list views.


## ✨ Features

- **📅 Interactive Calendar Grid**: Navigate through months with an intuitive grid layout
- **📋 List View**: Switch between grid and list views for different perspectives
- **➕ Event Management**: Create, edit, and delete events with ease
- **🎨 Beautiful UI**: Modern design with smooth animations and transitions
- **🌓 Dark/Light Theme**: Toggle between dark and light modes
- **💾 Local Storage**: Events are automatically saved to your browser's local storage
- **🎯 3D Background**: Stunning floating orbs with Three.js for visual appeal
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices
- **⚡ Fast Performance**: Built with Vite for lightning-fast development and builds

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd Kalendlyy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application running.

## 🛠️ Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run build:dev` - Build the project in development mode
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## 🎯 Usage

### Creating Events
1. Click the "New Event" button or click on any date in the calendar
2. Fill in the event details (title, time, description, category)
3. Choose a category (work, personal, important) for color coding
4. Save the event

### Managing Events
- **Edit**: Click on any existing event to modify its details
- **Delete**: Use the delete button when editing an event
- **View**: Switch between grid and list views using the toggle buttons

### Navigation
- Use the arrow buttons to navigate between months
- Click "Today" to quickly return to the current month
- The calendar automatically highlights today's date

## 🏗️ Tech Stack

### Core Technologies
- **[React 18](https://reactjs.org/)** - UI library for building user interfaces
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Vite](https://vitejs.dev/)** - Fast build tool and development server

### UI & Styling
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful and accessible UI components
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible UI primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful & consistent icon toolkit

### Animations & 3D
- **[Framer Motion](https://www.framer.com/motion/)** - Production-ready motion library
- **[Three.js](https://threejs.org/)** - 3D graphics library
- **[React Three Fiber](https://docs.pmnd.rs/react-three-fiber)** - React renderer for Three.js
- **[React Three Drei](https://docs.pmnd.rs/drei)** - Useful helpers for React Three Fiber

### State Management & Forms
- **[TanStack Query](https://tanstack.com/query)** - Powerful data synchronization
- **[React Hook Form](https://react-hook-form.com/)** - Performant forms with easy validation
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation

### Date Handling
- **[date-fns](https://date-fns.org/)** - Modern JavaScript date utility library

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── Calendar.tsx    # Main calendar component
│   ├── CalendarGrid.tsx # Grid view component
│   ├── CalendarList.tsx # List view component
│   ├── EventForm.tsx   # Event creation/editing form
│   └── ThreeBackground.tsx # 3D background component
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── pages/              # Page components
├── types/              # TypeScript type definitions
└── main.tsx           # Application entry point
```

## 🎨 Customization

### Themes
The application supports both light and dark themes. The theme toggle is available in the header, and the preference is automatically saved.

### Event Categories
Events can be categorized as:
- **Work** (Blue) - Professional events and meetings
- **Personal** (Purple) - Personal appointments and activities
- **Important** (Green) - High-priority events

### Styling
The application uses Tailwind CSS for styling. You can customize the appearance by modifying the Tailwind configuration or the CSS custom properties defined in the stylesheets.

## 🔧 Development

### Local Development
To contribute to this project:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Code Quality
- ESLint is configured for code linting
- TypeScript provides type safety
- Prettier can be added for code formatting

## 📱 Browser Support

Kalendlyy works on all modern browsers that support:
- ES2020+ features
- CSS Grid and Flexbox
- WebGL (for 3D background)
- Local Storage API

## 🚀 Deployment

### Build for Production
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting provider
3. Configure your server to serve the `index.html` for all routes (SPA routing)

### Deployment Options
- **Vercel**: Connect your GitHub repository for automatic deployments
- **Netlify**: Drag and drop the `dist` folder or connect via Git
- **GitHub Pages**: Use GitHub Actions to build and deploy
- **Firebase Hosting**: Use Firebase CLI to deploy
- **Any Static Host**: Upload the `dist` folder contents

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📞 Support

If you have any questions or need help with the project:
- Open an issue on GitHub
- Check the documentation for the technologies used
- Contribute to the project by submitting pull requests
- ## AI Tools Used :
- Lovable for basic UI
- Github Augment extension for debugging 

---

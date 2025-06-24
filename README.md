# MiniTask - Modern Task Management App

A beautiful, modern Kanban-style task management application built with React, Tailwind CSS, and Supabase. Features a stunning glass morphism design with smooth animations and intuitive drag-and-drop functionality.

![MiniTask Screenshot](https://via.placeholder.com/800x400/667eea/ffffff?text=MiniTask+App)

## ✨ Features

- **🔐 User Authentication**: Secure sign up/sign in with Supabase auth
- **📝 Task Management**: Create, edit, complete, and delete tasks
- **🎯 Kanban Board**: Three-column workflow (To Do, In Progress, Done)
- **🔄 Drag & Drop**: Intuitive task movement between columns
- **🎨 Modern UI**: Glass morphism design with gradient backgrounds
- **📱 Responsive**: Optimized for desktop, tablet, and mobile
- **⚡ Real-time**: Instant updates with Supabase real-time subscriptions
- **🔒 Secure**: Row-level security ensures data privacy

## 🎯 How It Works

### Kanban Workflow:
- **🔄 To Do** (Gray): New tasks waiting to be started
- **🚧 In Progress** (Light Red): Tasks currently being worked on
- **✅ Done** (Green): Completed tasks and accomplishments

### Task Operations:
1. **Add Tasks**: Click the "+" button in any column
2. **Drag & Drop**: Move tasks between columns or reorder within columns
3. **Edit Tasks**: Click the edit icon to modify task details
4. **Delete Tasks**: Click the trash icon to remove tasks
5. **Real-time Sync**: Changes appear instantly across all devices

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Supabase account

### 1. Clone and Install
```bash
git clone <repository-url>
cd minitask-app
npm install
```

### 2. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your project URL and anon key
3. Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Set up Database

Run this SQL in your Supabase SQL editor:

```sql
-- Create tasks table
CREATE TABLE tasks (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'todo',
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to only see their own tasks
CREATE POLICY "Users can only access their own tasks" ON tasks
  FOR ALL USING (auth.uid() = user_id);

-- Create index for better performance
CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_status ON tasks(status);
```

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern React with hooks and context
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **@hello-pangea/dnd** - Drag and drop functionality
- **Lucide React** - Beautiful icons

### Backend
- **Supabase** - Backend-as-a-Service
  - PostgreSQL database
  - Real-time subscriptions
  - Row-level security
  - Built-in authentication

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 📁 Project Structure

```
src/
├── components/
│   ├── Auth.jsx          # Authentication forms (login/signup)
│   ├── TaskBoard.jsx     # Main Kanban board container
│   ├── TaskColumn.jsx    # Individual column component
│   └── TaskCard.jsx      # Individual task card with actions
├── contexts/
│   └── AuthContext.jsx   # Authentication state management
├── lib/
│   └── supabase.js       # Supabase client configuration
├── App.jsx               # Main app component with routing
├── main.jsx              # React entry point
└── index.css             # Global styles and Tailwind imports
```

## 🎨 Design Features

- **Glass Morphism**: Modern translucent card design with backdrop blur
- **Gradient Backgrounds**: Beautiful color gradients throughout the app
- **Smooth Animations**: Hover effects, transitions, and drag animations
- **Color-coded Columns**: Distinct colors for each workflow stage
- **Responsive Design**: Optimized for all screen sizes
- **Modern Typography**: Clean, readable fonts with proper hierarchy
- **Interactive Elements**: Hover states and visual feedback

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add your environment variables in Vercel dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy with one click!

### Deploy to Netlify

1. Push your code to GitHub
2. Connect your repository to [Netlify](https://netlify.com)
3. Add environment variables in Netlify dashboard
4. Deploy automatically on every push

### Environment Variables

Make sure to set these in your hosting platform:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🔒 Security Features

- **Row Level Security (RLS)**: Users can only access their own tasks
- **Secure Authentication**: Supabase handles auth with best practices
- **Environment Variables**: Sensitive data kept out of client code
- **CORS Protection**: Configured for production deployment

## 🐛 Troubleshooting

### Common Issues

1. **PostCSS Errors**: Make sure all Tailwind utilities are used in JSX, not in `@apply` directives
2. **Drag & Drop Not Working**: Ensure `@hello-pangea/dnd` is properly installed
3. **Authentication Issues**: Verify your Supabase credentials in `.env`
4. **Build Errors**: Check that all dependencies are installed with `npm install`

### Getting Help

- Check the [Issues](https://github.com/yourusername/minitask/issues) page
- Review the Supabase documentation
- Ensure your Node.js version is 16 or higher

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation if needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Supabase](https://supabase.com) for the amazing backend platform
- [Tailwind CSS](https://tailwindcss.com) for the utility-first CSS framework
- [Lucide](https://lucide.dev) for the beautiful icons
- [Vite](https://vitejs.dev) for the fast build tool

## 📞 Support

- **GitHub Issues**: [Report a bug](https://github.com/yourusername/minitask/issues)
- **Email**: your-email@example.com
- **Discord**: Join our community server

---

**Built with ❤️ using React, Tailwind CSS, and Supabase**

*Happy task managing! 🎉* 
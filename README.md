# MiniTask - Simple Task Management App

A beautiful, user-friendly Kanban-style task management application built with React, Tailwind CSS, and Supabase.

## ✨ Features

- **🎯 User Authentication**: Sign up/sign in with Supabase auth
- **📝 Add Tasks**: Create tasks with title and optional description
- **✏️ Edit Tasks**: Modify existing task details inline
- **✅ Mark as Done**: Drag tasks between columns to change status
- **🗑️ Delete Tasks**: Remove tasks with confirmation
- **🎨 Clean Design**: Beautiful, responsive interface with distinct column colors
- **📱 Responsive**: Works great on all devices
- **🔄 Drag & Drop**: Intuitive task management with drag and drop

## 🎯 How It Works

### 3-Column Kanban Board:
- **To Do**: New tasks and things you haven't started yet
- **In Progress**: Tasks you're actively working on  
- **Done**: Completed tasks (your accomplishments!)

### Task Management:
1. **Add Tasks**: Click the "+" button in any column to add a task there
2. **Drag Between Columns**: Grab any task card and drag it to a different column
3. **Reorder Within Columns**: Drag tasks up/down within the same column
4. **Edit Tasks**: Click the edit button on any task card
5. **Delete Tasks**: Click the trash button to remove tasks

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

- **Frontend**: React 18, Vite, Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth)
- **Drag & Drop**: react-beautiful-dnd
- **Icons**: Lucide React
- **Styling**: Tailwind CSS with custom color scheme

## 📁 Project Structure

```
src/
├── components/
│   ├── Auth.jsx          # Authentication forms
│   ├── TaskBoard.jsx     # Main Kanban board
│   ├── TaskColumn.jsx    # Individual column component
│   └── TaskCard.jsx      # Individual task card
├── contexts/
│   └── AuthContext.jsx   # Authentication state management
├── lib/
│   └── supabase.js       # Supabase configuration
├── App.jsx               # Main app component
├── main.jsx              # React entry point
└── index.css             # Global styles
```

## 🎨 Design Features

- **Color-coded columns**: Each column has distinct colors (gray, blue, green)
- **Sticky note design**: Task cards look like real sticky notes
- **Smooth animations**: Hover effects and drag animations
- **Responsive layout**: Works on desktop, tablet, and mobile
- **Modern UI**: Clean, minimalist design with great UX

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

Make sure to set these in your hosting platform:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Happy task managing! 🎉** 
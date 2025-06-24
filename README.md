# MiniTask - Modern Task Management App

## Project Overview

MiniTask is a modern, responsive Kanban-style task management application built with React and Supabase. The application features a beautiful glass morphism design with intuitive drag-and-drop functionality, allowing users to efficiently organize and track their tasks across three workflow stages: To Do, In Progress, and Done. The app includes user authentication, real-time updates, and a mobile-responsive interface that works seamlessly across all devices.

## Features

- **🔐 User Authentication**: Secure sign up/sign in with Supabase authentication
- **📝 Task Management**: Create, edit, complete, and delete tasks with ease
- **🎯 Kanban Board**: Three-column workflow (To Do, In Progress, Done) for organized task tracking
- **🔄 Drag & Drop**: Intuitive task movement between columns and reordering within columns
- **🎨 Modern UI**: Glass morphism design with gradient backgrounds and smooth animations
- **📱 Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **⚡ Real-time Updates**: Instant synchronization across all devices using Supabase real-time subscriptions
- **🔒 Data Security**: Row-level security ensures users can only access their own tasks
- **🎨 Beautiful Design**: Modern typography, hover effects, and visual feedback

## Installation Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Supabase account

### Step 1: Clone the Repository
```bash
git clone https://github.com/ThathsiluRa/MiniTask1.git
cd MiniTask1
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Set up Supabase
1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your project URL and anon key
3. Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Step 4: Set up Database
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

### Step 5: Run the Development Server
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the application in your browser.

## Usage

### Getting Started
1. **Sign Up/Login**: Create an account or sign in with existing credentials
2. **Add Tasks**: Click the "+" button in any column to create a new task
3. **Organize Tasks**: Drag and drop tasks between columns to change their status
4. **Edit Tasks**: Click the edit icon on any task card to modify details
5. **Delete Tasks**: Click the trash icon to remove unwanted tasks

### Kanban Workflow
- **🔄 To Do** (Gray): New tasks waiting to be started
- **🚧 In Progress** (Light Red): Tasks currently being worked on
- **✅ Done** (Green): Completed tasks and accomplishments

### Task Operations
- **Create**: Add new tasks with title and optional description
- **Move**: Drag tasks between columns to update status
- **Reorder**: Arrange tasks within the same column
- **Edit**: Modify task details inline
- **Delete**: Remove tasks with confirmation
- **Real-time Sync**: Changes appear instantly across all devices

## Technologies Used

### Frontend Technologies
- **React 18**: Modern React with hooks and context for state management
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework for styling
- **@hello-pangea/dnd**: Drag and drop functionality for task management
- **Lucide React**: Beautiful and consistent icon library

### Backend Technologies
- **Supabase**: Backend-as-a-Service platform
  - PostgreSQL database for data storage
  - Real-time subscriptions for live updates
  - Row-level security for data protection
  - Built-in authentication system

### Development Tools
- **ESLint**: Code linting and quality assurance
- **PostCSS**: CSS processing and optimization
- **Autoprefixer**: Automatic CSS vendor prefixing

### Project Structure
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

## Future Improvements

### Planned Features
- **📊 Task Analytics**: Dashboard with task completion statistics and productivity insights
- **📅 Due Dates**: Add deadlines and reminders for tasks
- **🏷️ Task Categories**: Organize tasks with tags and labels
- **👥 Team Collaboration**: Share boards and collaborate with team members
- **📱 Mobile App**: Native mobile application for iOS and Android
- **🔔 Notifications**: Email and push notifications for task reminders
- **📋 Task Templates**: Pre-defined task templates for common workflows
- **🔍 Advanced Search**: Search and filter tasks by various criteria

### Technical Enhancements
- **Performance Optimization**: Implement virtual scrolling for large task lists
- **Offline Support**: PWA features for offline task management
- **Data Export**: Export tasks to CSV, PDF, or other formats
- **API Integration**: Connect with external tools like Slack, Trello, or Jira
- **Dark Mode**: Toggle between light and dark themes
- **Accessibility**: Improve accessibility features for users with disabilities
- **Internationalization**: Multi-language support for global users

### User Experience Improvements
- **Keyboard Shortcuts**: Power user shortcuts for faster task management
- **Bulk Operations**: Select and modify multiple tasks at once
- **Task Dependencies**: Link related tasks and show dependencies
- **Progress Tracking**: Visual progress indicators for project completion
- **Custom Workflows**: Allow users to create custom column configurations
- **Task Comments**: Add comments and discussions to tasks
- **File Attachments**: Attach files and documents to tasks

---

**Built with ❤️ using React, Tailwind CSS, and Supabase**

*Happy task managing! 🎉* 
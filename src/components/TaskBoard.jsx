import React, { useState, useEffect } from 'react'
import { DragDropContext } from '@hello-pangea/dnd'
import { LogOut, User, Sparkles } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { supabase, TASK_STATUS } from '../lib/supabase'
import TaskColumn from './TaskColumn'

const TaskBoard = () => {
  const { user, signOut } = useAuth()
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  const columns = [
    { id: TASK_STATUS.TODO, title: 'To Do' },
    { id: TASK_STATUS.IN_PROGRESS, title: 'In Progress' },
    { id: TASK_STATUS.DONE, title: 'Done' }
  ]

  useEffect(() => {
    if (user) {
      fetchTasks()
    }
  }, [user])

  const fetchTasks = async () => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setTasks(data || [])
    } catch (error) {
      console.error('Error fetching tasks:', error)
    } finally {
      setLoading(false)
    }
  }

  const addTask = async (taskData) => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert([
          {
            title: taskData.title,
            description: taskData.description,
            status: taskData.status,
            user_id: user.id
          }
        ])
        .select()

      if (error) throw error
      setTasks(prev => [data[0], ...prev])
    } catch (error) {
      console.error('Error adding task:', error)
    }
  }

  const editTask = async (taskId, updates) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update(updates)
        .eq('id', taskId)

      if (error) throw error
      setTasks(prev => prev.map(task => 
        task.id === taskId ? { ...task, ...updates } : task
      ))
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }

  const deleteTask = async (taskId) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId)

      if (error) throw error
      setTasks(prev => prev.filter(task => task.id !== taskId))
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  const moveTask = async (taskId, newStatus) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ status: newStatus })
        .eq('id', taskId)

      if (error) throw error
      setTasks(prev => prev.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      ))
    } catch (error) {
      console.error('Error moving task:', error)
    }
  }

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result

    if (!destination) return

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const taskId = parseInt(draggableId)
    const newStatus = destination.droppableId
    moveTask(taskId, newStatus)
  }

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status)
  }

  const getTotalTasks = () => tasks.length
  const getCompletedTasks = () => tasks.filter(task => task.status === TASK_STATUS.DONE).length
  const getProgressPercentage = () => {
    if (tasks.length === 0) return 0
    return Math.round((getCompletedTasks() / tasks.length) * 100)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="loading-spinner w-16 h-16 mx-auto border-2 border-gray-200 border-t-violet-600"></div>
          <div className="space-y-2">
            <p className="text-white/90 font-semibold text-lg">Loading your workspace...</p>
            <p className="text-white/70 text-sm">Preparing your tasks</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="header-glass">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg bg-gradient-to-br from-violet-500 to-purple-600">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">MiniTask</h1>
                  <p className="text-gray-600 text-sm">Your personal workspace</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              {/* Stats */}
              <div className="hidden lg:flex items-center space-x-4">
                <div className="stats-card">
                  <div className="text-center">
                    <div className="font-bold text-gray-900 text-lg">{getTotalTasks()}</div>
                    <div className="text-gray-600 text-xs">Total Tasks</div>
                  </div>
                </div>
                <div className="stats-card">
                  <div className="text-center">
                    <div className="font-bold text-green-600 text-lg">{getCompletedTasks()}</div>
                    <div className="text-gray-600 text-xs">Completed</div>
                  </div>
                </div>
                <div className="stats-card">
                  <div className="text-center">
                    <div className="font-bold text-violet-600 text-lg">{getProgressPercentage()}%</div>
                    <div className="text-gray-600 text-xs">Progress</div>
                  </div>
                </div>
              </div>
              
              {/* User Menu */}
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-gray-100">
                  <User className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-700 text-sm font-medium">{user.email}</span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-300"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm font-medium">Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {columns.map((column) => (
              <TaskColumn
                key={column.id}
                id={column.id}
                title={column.title}
                tasks={getTasksByStatus(column.id)}
                onAddTask={addTask}
                onEditTask={editTask}
                onDeleteTask={deleteTask}
                onMoveTask={moveTask}
              />
            ))}
          </div>
        </DragDropContext>
      </main>
    </div>
  )
}

export default TaskBoard 
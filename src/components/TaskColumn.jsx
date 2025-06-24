import React, { useState } from 'react'
import { Droppable, Draggable } from '@hello-pangea/dnd'
import { Plus, Circle } from 'lucide-react'
import { TASK_STATUS } from '../lib/supabase'
import TaskCard from './TaskCard'

const TaskColumn = ({ id, title, tasks, onAddTask, onEditTask, onDeleteTask, onMoveTask }) => {
  const [isAdding, setIsAdding] = useState(false)
  const [newTask, setNewTask] = useState({ title: '', description: '' })

  const getColumnClass = () => {
    switch (id) {
      case TASK_STATUS.TODO:
        return 'column column-todo'
      case TASK_STATUS.IN_PROGRESS:
        return 'column column-progress'
      case TASK_STATUS.DONE:
        return 'column column-done'
      default:
        return 'column column-todo'
    }
  }

  const getColumnTitleClass = () => {
    switch (id) {
      case TASK_STATUS.TODO:
        return 'text-gray-700 font-bold text-lg mb-4'
      case TASK_STATUS.IN_PROGRESS:
        return 'text-red-700 font-bold text-lg mb-4'
      case TASK_STATUS.DONE:
        return 'text-green-700 font-bold text-lg mb-4'
      default:
        return 'text-gray-700 font-bold text-lg mb-4'
    }
  }

  const getTaskCountClass = () => {
    switch (id) {
      case TASK_STATUS.TODO:
        return 'bg-gray-200 text-gray-700'
      case TASK_STATUS.IN_PROGRESS:
        return 'bg-red-200 text-red-700'
      case TASK_STATUS.DONE:
        return 'bg-green-200 text-green-700'
      default:
        return 'bg-gray-200 text-gray-700'
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newTask.title.trim()) {
      onAddTask({
        title: newTask.title.trim(),
        description: newTask.description.trim(),
        status: id
      })
      setNewTask({ title: '', description: '' })
      setIsAdding(false)
    }
  }

  return (
    <div className={getColumnClass()}>
      <div className="flex items-center justify-between mb-6">
        <h2 className={getColumnTitleClass()}>{title}</h2>
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getTaskCountClass()}`}>
          {tasks.length}
        </span>
      </div>

      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`min-h-[500px] space-y-4 ${snapshot.isDraggingOver ? 'bg-white/20 rounded-xl' : ''}`}
          >
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
                onMove={onMoveTask}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {isAdding ? (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Task title"
            value={newTask.title}
            onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
            className="input w-full"
            autoFocus
          />
          <textarea
            placeholder="Description (optional)"
            value={newTask.description}
            onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
            className="input w-full resize-none"
            rows="3"
          />
          <div className="flex space-x-2">
            <button
              type="submit"
              className="btn btn-primary bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-xl text-sm font-semibold"
            >
              Add Task
            </button>
            <button
              type="button"
              onClick={() => {
                setIsAdding(false)
                setNewTask({ title: '', description: '' })
              }}
              className="btn btn-secondary px-4 py-2 rounded-xl text-sm font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="add-button"
        >
          <Plus className="w-5 h-5" />
          <span>Add Task</span>
        </button>
      )}
    </div>
  )
}

export default TaskColumn 
import React, { useState } from 'react'
import { Draggable } from '@hello-pangea/dnd'
import { Edit, Trash2, CheckCircle, Circle } from 'lucide-react'

const TaskCard = ({ task, index, onEdit, onDelete, onMove }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editData.title.trim()) {
      onEdit(task.id, editData)
      setIsEditing(false)
    }
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (isEditing) {
    return (
      <Draggable draggableId={task.id.toString()} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="task-card p-4 bg-white/95 shadow-md"
          >
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                value={editData.title}
                onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                autoFocus
              />
              <textarea
                value={editData.description}
                onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 resize-none focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                rows="3"
                placeholder="Add description..."
              />
              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-violet-600 text-white text-xs font-semibold rounded-lg hover:bg-violet-700 transition-colors"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false)
                    setEditData({ title: task.title, description: task.description })
                  }}
                  className="px-3 py-1.5 bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </Draggable>
    )
  }

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`task-card p-4 ${snapshot.isDragging ? 'rotate-2 shadow-xl' : ''}`}
        >
          <div className="space-y-3">
            {/* Task Header */}
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-gray-900 text-sm leading-tight flex-1">
                {task.title}
              </h3>
              <div className="flex items-center space-x-1 ml-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  title="Edit task"
                >
                  <Edit className="w-3 h-3" />
                </button>
                <button
                  onClick={handleDelete}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  title="Delete task"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Task Description */}
            {task.description && (
              <p className="text-gray-600 text-sm leading-relaxed">
                {task.description}
              </p>
            )}

            {/* Task Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">
                  {formatDate(task.created_at)}
                </span>
              </div>
              
              {/* Status Indicator */}
              <div className="flex items-center space-x-1">
                {task.status === 'done' ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <Circle className="w-4 h-4 text-gray-300" />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default TaskCard 
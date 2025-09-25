import { useState } from "react";

const TaskList = ({ tasks, onDelete, onEdit }) => {
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await onDelete(id);
    } finally {
      setDeletingId(null);
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-400/10 to-amber-600/10 rounded-2xl mb-6">
          <svg className="w-10 h-10 text-amber-400/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 className="text-amber-100 text-lg font-light mb-2">No tasks yet</h3>
        <p className="text-slate-400 font-light max-w-sm mx-auto">
          Create your first task to get started. Your tasks will appear here in an elegant, organized layout.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task, index) => (
        <div
          key={task._id}
          className="group relative bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 rounded-2xl p-6 transition-all duration-300 backdrop-blur-sm overflow-hidden"
          style={{
            animationDelay: `${index * 100}ms`,
          }}
        >
          {/* Gradient accent bar */}
          <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-amber-400 to-amber-600 rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
          
          {/* Background shimmer effect - BEHIND the content */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 rounded-2xl z-0"></div>

          {/* Content container with higher z-index */}
          <div className="relative z-20">
            <div className="flex items-start justify-between">
              {/* Task Content */}
              <div className="flex-1 min-w-0 pr-4">
                <h3 className="text-amber-100 font-medium text-lg mb-2 leading-tight break-words">
                  {task.title}
                </h3>
                {task.description && (
                  <p className="text-slate-300/80 text-sm leading-relaxed break-words">
                    {task.description}
                  </p>
                )}
                
                {/* Task Meta */}
                <div className="flex items-center mt-3 space-x-4 flex-wrap gap-2">
                  <span className="inline-flex items-center text-xs text-slate-400/60">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Created {new Date(task.createdAt || Date.now()).toLocaleDateString("en-GB")}
                  </span>
                  
                  {/* Status indicator */}
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-1 animate-pulse"></div>
                    Active
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 flex-shrink-0">
                {/* Edit Button */}
                <button
                  onClick={() => onEdit(task)}
                  className="group/edit p-2 text-amber-400 hover:text-amber-300 hover:bg-amber-400/10 rounded-xl transition-all duration-200 border border-transparent hover:border-amber-400/20"
                  title="Edit task"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(task._id)}
                  disabled={deletingId === task._id}
                  className="group/delete p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-400/10 rounded-xl transition-all duration-200 border border-transparent hover:border-rose-400/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Delete task"
                >
                  {deletingId === task._id ? (
                    <svg className="animate-spin w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Progress indicator for delete action */}
            {deletingId === task._id && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-rose-500 to-rose-600 animate-pulse rounded-b-2xl z-30"></div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
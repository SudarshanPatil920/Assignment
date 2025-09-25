// components/AdminTaskList.jsx
import { useState } from "react";

const AdminTaskList = ({ tasks, onDelete }) => {
  const [deletingId, setDeletingId] = useState(null);
  const [filter, setFilter] = useState('all');

  const handleDelete = async (taskId) => {
    setDeletingId(taskId);
    try {
      await onDelete(taskId);
    } finally {
      setDeletingId(null);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'today') {
      const today = new Date().toDateString();
      return new Date(task.createdAt).toDateString() === today;
    }
    return true;
  });

  if (tasks.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-slate-500/10 to-slate-600/10 rounded-2xl mb-6">
          <svg className="w-10 h-10 text-slate-400/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 className="text-slate-100 text-lg font-light mb-2">No tasks found</h3>
        <p className="text-slate-400 font-light">There are no tasks in the system yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filter Controls */}
      <div className="flex items-center space-x-4 bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10">
        <span className="text-slate-300 text-sm font-light">Filter:</span>
        <div className="flex space-x-2">
          {['all', 'today'].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                filter === filterType
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-400/30'
                  : 'text-slate-400 hover:text-slate-300 hover:bg-white/5'
              }`}
            >
              {filterType === 'all' ? 'All Tasks' : 'Today'}
            </button>
          ))}
        </div>
        <span className="text-slate-400 text-sm ml-auto">
          Showing {filteredTasks.length} of {tasks.length} tasks
        </span>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <div
            key={task._id}
            className="group relative bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 rounded-2xl p-6 transition-all duration-300 backdrop-blur-sm overflow-hidden"
          >
            {/* User indicator bar */}
            <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-purple-400 to-purple-600 rounded-l-2xl z-10"></div>
            
            {/* Background shimmer */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/3 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 rounded-2xl z-0"></div>

            <div className="relative z-20">
              <div className="flex items-start justify-between">
                {/* Task Content */}
                <div className="flex-1 min-w-0 pr-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-white font-medium text-lg leading-tight break-words">
                      {task.title}
                    </h3>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-500/10 text-purple-300 border border-purple-500/20">
                      User: {task.user?.name || 'Unknown'}
                    </span>
                  </div>
                  
                  {task.description && (
                    <p className="text-slate-300/80 text-sm leading-relaxed break-words mb-3">
                      {task.description}
                    </p>
                  )}
                  
                  {/* Task Meta */}
                  <div className="flex items-center space-x-4 flex-wrap gap-2">
                    <span className="inline-flex items-center text-xs text-slate-400/60">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Created {new Date(task.createdAt).toLocaleDateString()}
                    </span>
                    
                    <span className="inline-flex items-center text-xs text-slate-400/60">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {task.user?.email || 'No email'}
                    </span>
                  </div>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(task._id)}
                  disabled={deletingId === task._id}
                  className="group/delete p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-400/10 rounded-xl transition-all duration-200 border border-transparent hover:border-rose-400/20 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
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
        ))}
      </div>
    </div>
  );
};

export default AdminTaskList;
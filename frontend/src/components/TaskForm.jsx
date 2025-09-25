import { useState, useEffect } from "react";

const TaskForm = ({ onSubmit, task, setEditingTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Populate form when editingTask changes
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    setIsSubmitting(true);
    try {
      await onSubmit({ title, description });
      setTitle("");
      setDescription("");
      if (task) setEditingTask(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setEditingTask(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-light text-amber-100">
            {task ? 'Edit Task' : 'Create New Task'}
          </h2>
          <p className="text-slate-400 text-sm font-light mt-1">
            {task ? 'Update your task details' : 'Add a new task to your collection'}
          </p>
        </div>
        {task && (
          <button
            type="button"
            onClick={handleCancel}
            className="text-slate-400 hover:text-amber-200 transition-colors duration-200 text-sm font-medium px-3 py-1 rounded-lg hover:bg-white/5"
          >
            Cancel
          </button>
        )}
      </div>

      {/* Title Input */}
      <div className="relative">
        <label className="block text-amber-100/80 text-sm font-light mb-3 uppercase tracking-wider">
          Task Title
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="Enter a meaningful title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-amber-50 placeholder-slate-400 focus:outline-none focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 backdrop-blur-sm"
            required
            disabled={isSubmitting}
          />
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-500/0 via-amber-500/5 to-amber-500/0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>
      </div>

      {/* Description Textarea */}
      <div className="relative">
        <label className="block text-amber-100/80 text-sm font-light mb-3 uppercase tracking-wider">
          Description
        </label>
        <div className="relative">
          <textarea
            placeholder="Add detailed description (optional)..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-amber-50 placeholder-slate-400 focus:outline-none focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 backdrop-blur-sm resize-none"
            rows="4"
            disabled={isSubmitting}
          />
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-500/0 via-amber-500/5 to-amber-500/0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || !title.trim()}
        className="group relative w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl hover:shadow-amber-500/25 overflow-hidden"
      >
        <span className="relative z-10 flex items-center justify-center">
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {task ? 'Updating...' : 'Creating...'}
            </>
          ) : (
            <>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={task ? "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" : "M12 4v16m8-8H4"} />
              </svg>
              {task ? 'Update Task' : 'Create Task'}
            </>
          )}
        </span>
        
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 translate-x-[-100%] group-hover:translate-x-[100%] group-disabled:translate-x-[-100%] transition-transform duration-700"></div>
        
        {/* Pulse animation when loading */}
        {isSubmitting && (
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-amber-600/20 animate-pulse rounded-xl"></div>
        )}
      </button>

      {/* Character count indicator */}
      <div className="flex justify-between text-xs text-slate-500">
        <span>Task title: {title.length}/100</span>
        <span>Description: {description.length}/500</span>
      </div>
    </form>
  );
};

export default TaskForm;
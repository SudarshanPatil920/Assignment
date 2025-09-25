import { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask, logoutUser } from "../api.js";
import TaskForm from "../components/TaskForm.jsx";
import TaskList from "../components/TaskList.jsx";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const fetchTasks = async () => {
        setIsLoading(true);
        const data = await getTasks();
        setTasks(data);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleAddOrUpdateTask = async (task) => {
        if (editingTask) {
            await updateTask(editingTask._id, task);
            setEditingTask(null);
        } else {
            await createTask(task);
        }
        fetchTasks();
    };

    const handleDelete = async (id) => {
        await deleteTask(id);
        fetchTasks();
    };

    const handleEdit = (task) => {
        setEditingTask(task);
    };

    const handleLogout = async () => {
        await logoutUser();
        navigate("/login");
    };

    const handleCancelEdit = () => {
        setEditingTask(null);
    };

    const handleAdminPanel = () => {
        navigate("/admin");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 overflow-x-hidden">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-amber-400/10 to-rose-600/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <header className="flex justify-between items-center mb-8 p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl">
                    <div>
                        <h1 className="text-3xl font-light bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 bg-clip-text text-transparent">
                            Task Elegance
                        </h1>
                        <p className="text-slate-400 text-sm font-light mt-1">Premium Task Management</p>
                    </div>

                    
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleAdminPanel}
                            className="group relative overflow-hidden bg-gradient-to-r from-purple-500/10 to-purple-600/20 px-6 py-3 rounded-xl border border-purple-400/20 hover:border-purple-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
                        >
                            <span className="text-purple-200 group-hover:text-white font-medium transition-colors duration-200">
                                Admin Panel
                            </span>
                        </button>

                        <button
                            onClick={handleLogout}
                            className="group relative overflow-hidden bg-gradient-to-r from-rose-500/10 to-rose-600/20 px-6 py-3 rounded-xl border border-rose-400/20 hover:border-rose-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-rose-500/10"
                        >
                            <span className="text-rose-200 group-hover:text-white font-medium transition-colors duration-200">
                                Logout
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-rose-500/0 via-rose-500/10 to-rose-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                        </button>
                    </div>
                </header>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Task Form Section */}
                    <div className="lg:col-span-1">
                        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-6 hover:shadow-3xl transition-all duration-500">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-light text-amber-100">
                                </h2>
                                {editingTask && (
                                    <button
                                        onClick={handleCancelEdit}
                                        className="text-slate-400 hover:text-amber-200 transition-colors duration-200 text-sm font-medium"
                                    >
                                    </button>
                                )}
                            </div>

                            <TaskForm
                                onSubmit={handleAddOrUpdateTask}
                                task={editingTask}
                                setEditingTask={setEditingTask}
                            />
                        </div>
                    </div>

                    {/* Task List Section */}
                    <div className="lg:col-span-2">
                        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-6 hover:shadow-3xl transition-all duration-500">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-light text-amber-100">
                                    Your Tasks <span className="text-slate-400 text-sm font-normal">({tasks.length})</span>
                                </h2>
                                <div className="text-slate-400 text-sm">
                                    {isLoading ? 'Loading...' : 'All tasks'}
                                </div>
                            </div>

                            {isLoading ? (
                                <div className="flex items-center justify-center py-12">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-400"></div>
                                </div>
                            ) : (
                                <TaskList
                                    tasks={tasks}
                                    onDelete={handleDelete}
                                    onEdit={handleEdit}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
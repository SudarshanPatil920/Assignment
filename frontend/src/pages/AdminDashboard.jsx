// pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminTasks, deleteAdminTask, getAdminStats, logoutUser } from "../api.js";
import AdminStats from "../components/AdminStats.jsx";
import AdminTaskList from "../components/AdminTaskList.jsx";

const AdminDashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [stats, setStats] = useState({ totalUsers: 0, totalTasks: 0, activeToday: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Fetch admin tasks and stats from server
    const fetchAdminData = async () => {
        setIsLoading(true);
        setError("");
        try {
            const [tasksData, statsData] = await Promise.all([getAdminTasks(), getAdminStats()]);
            setTasks(tasksData);
            setStats(statsData);
        } catch (err) {
            console.error("Admin data error:", err);
            setError(
                err.message.includes("Unexpected token")
                    ? "Failed to fetch admin data. Make sure you're logged in as admin."
                    : err.message || "Failed to load admin data"
            );
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAdminData();
    }, []);

    const handleDeleteTask = async (taskId) => {
        try {
            await deleteAdminTask(taskId);
            setTasks((prev) => prev.filter((task) => task._id !== taskId));

            // Refresh stats after deletion
            const statsData = await getAdminStats();
            setStats(statsData);
        } catch (err) {
            setError(err.message || "Failed to delete task");
        }
    };

    const handleLogout = async () => {
        await logoutUser(); // clears cookie server-side
        navigate("/login");
    };

    const handleBackToDashboard = () => {
        navigate("/dashboard");
    };

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 text-center">
                    <div className="text-rose-400 text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-light text-white mb-2">You Are Not Admin</h2>
                    <p className="text-slate-400 mb-6">You should be an admin to access this page</p>
                    <button
                        onClick={handleBackToDashboard}
                        className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 px-6 py-2 rounded-xl border border-blue-400/20 transition-all duration-200"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 overflow-x-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-600/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-400/10 to-cyan-600/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <header className="flex justify-between items-center mb-8 p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl">
                    <div>
                        <h1 className="text-3xl font-light bg-gradient-to-r from-purple-200 via-blue-200 to-purple-200 bg-clip-text text-transparent">
                            Admin Dashboard
                        </h1>
                        <p className="text-slate-400 text-sm font-light mt-1">
                            Manage all user tasks and system analytics
                        </p>
                    </div>

                    <div className="flex items-center space-x-3">
                        <button
                            onClick={handleBackToDashboard}
                            className="group relative overflow-hidden bg-gradient-to-r from-blue-500/10 to-blue-600/20 px-5 py-3 rounded-xl border border-blue-400/20 hover:border-blue-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
                        >
                            <span className="text-blue-200 group-hover:text-white font-medium transition-colors duration-200 flex items-center space-x-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                <span>Dashboard</span>
                            </span>
                        </button>

                        <button
                            onClick={handleLogout}
                            className="group relative overflow-hidden bg-gradient-to-r from-rose-500/10 to-rose-600/20 px-5 py-3 rounded-xl border border-rose-400/20 hover:border-rose-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-rose-500/10"
                        >
                            <span className="text-rose-200 group-hover:text-white font-medium transition-colors duration-200 flex items-center space-x-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                <span>Logout</span>
                            </span>
                        </button>
                    </div>
                </header>

                {/* Stats */}
                <AdminStats stats={stats} />

                {/* Tasks Section */}
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-6 hover:shadow-3xl transition-all duration-500">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-light text-white">
                            All User Tasks <span className="text-slate-400 text-sm font-normal">({tasks.length})</span>
                        </h2>
                        <div className="text-slate-400 text-sm">
                            {isLoading ? "Loading..." : "System-wide task management"}
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
                        </div>
                    ) : (
                        <AdminTaskList tasks={tasks} onDelete={handleDeleteTask} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;

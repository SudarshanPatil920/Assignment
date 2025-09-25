// components/AdminStats.jsx
const AdminStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Total Users Card */}
      <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/20 backdrop-blur-xl rounded-2xl border border-blue-400/20 p-6 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-200/80 text-sm font-light">Total Users</p>
            <p className="text-3xl font-light text-white mt-2">{stats.totalUsers}</p>
          </div>
          <div className="p-3 bg-blue-500/20 rounded-xl">
            <svg className="w-6 h-6 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Total Tasks Card */}
      <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/20 backdrop-blur-xl rounded-2xl border border-emerald-400/20 p-6 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-emerald-200/80 text-sm font-light">Total Tasks</p>
            <p className="text-3xl font-light text-white mt-2">{stats.totalTasks}</p>
          </div>
          <div className="p-3 bg-emerald-500/20 rounded-xl">
            <svg className="w-6 h-6 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
        </div>
      </div>

      {/* Active Tasks Card */}
      <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/20 backdrop-blur-xl rounded-2xl border border-amber-400/20 p-6 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-amber-200/80 text-sm font-light">Active Today</p>
            <p className="text-3xl font-light text-white mt-2">{stats.activeToday}</p>
          </div>
          <div className="p-3 bg-amber-500/20 rounded-xl">
            <svg className="w-6 h-6 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
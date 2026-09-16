import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  ShieldAlert,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  RefreshCw,
  Smartphone,
  Globe,
  Lock,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';

const Admin = () => {
  const { user, setIsLoginModalOpen } = useAuth();
  const [activeTab, setActiveTab] = useState('logs'); // 'logs' | 'staff'
  const [logs, setLogs] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const API_URL = 'http://localhost:5001/api';

  const fetchData = async () => {
    if (!user || (!user.isAdmin && user.role !== 'admin')) return;
    setLoading(true);
    setError('');

    try {
      // Fetch Logs
      const logsRes = await fetch(`${API_URL}/admin/login-logs`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const logsData = await logsRes.json();

      if (logsRes.ok) {
        setLogs(logsData);
      } else {
        setError(logsData.message || 'Failed to load audit logs');
      }

      // Fetch Staff Members
      const staffRes = await fetch(`${API_URL}/admin/staff`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const staffData = await staffRes.json();
      if (staffRes.ok) {
        setStaffList(staffData);
      }
    } catch (err) {
      setError(err.message || 'Network error connecting to backend API');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  // If user is not logged in or not admin
  if (!user || (!user.isAdmin && user.role !== 'admin')) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl space-y-6">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-950/50 text-red-600 rounded-2xl flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Admin Access Required</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-md mx-auto">
              You must be logged in as an Administrator to access the Staff Login Audit Portal and track login history.
            </p>
          </div>

          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-lg shadow-emerald-600/30 transition-all inline-flex items-center space-x-2"
          >
            <ShieldCheck className="w-5 h-5" />
            <span>Sign In as Admin / Staff</span>
          </button>
        </div>
      </div>
    );
  }

  // Filter logs
  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.userName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.emailOrPhone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.ipAddress?.includes(searchQuery);

    const matchesStatus =
      statusFilter === 'ALL' || log.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Calculate Metrics
  const totalLogins = logs.length;
  const successfulLogins = logs.filter((l) => l.status === 'SUCCESS').length;
  const failedLogins = logs.filter((l) => l.status === 'FAILED').length;
  const totalStaff = staffList.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md">
            <ShieldCheck className="w-4 h-4" />
            <span>Live Staff Tracking System</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Staff Login Audit Portal</h1>
          <p className="text-slate-300 text-sm max-w-xl">
            Monitor real-time login activity, track IP addresses & devices, and review staff account verifications.
          </p>
        </div>

        <div className="relative z-10 flex items-center space-x-3">
          <button
            onClick={fetchData}
            disabled={loading}
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl backdrop-blur-md transition-all flex items-center space-x-2 text-sm font-semibold"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh Audit Logs</span>
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 rounded-xl">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase">Registered Staff</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{totalStaff}</h3>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-950/50 text-blue-600 rounded-xl">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase">Total Login Attempts</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{totalLogins}</h3>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 rounded-xl">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase">Successful Logins</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{successfulLogins}</h3>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-rose-100 dark:bg-rose-950/50 text-rose-600 rounded-xl">
            <XCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase">Failed Attempts</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{failedLogins}</h3>
          </div>
        </div>
      </div>

      {/* Tabs & Filters */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('logs')}
              className={`px-5 py-2.5 text-sm font-semibold rounded-xl transition-all ${
                activeTab === 'logs'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              Staff Login Logs ({logs.length})
            </button>
            <button
              onClick={() => setActiveTab('staff')}
              className={`px-5 py-2.5 text-sm font-semibold rounded-xl transition-all ${
                activeTab === 'staff'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              Staff Directory ({staffList.length})
            </button>
          </div>

          {activeTab === 'logs' && (
            <div className="flex flex-col sm:flex-row items-center gap-3">
              {/* Search */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search name, phone, IP..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              {/* Status filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full sm:w-auto px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="ALL">All Statuses</option>
                <option value="SUCCESS">Success Only</option>
                <option value="FAILED">Failed Only</option>
              </select>
            </div>
          )}
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-700 rounded-xl text-sm flex items-center space-x-2">
            <ShieldAlert className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Tab 1: Audit Logs Table */}
        {activeTab === 'logs' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-xs uppercase font-semibold text-slate-500 bg-slate-50 dark:bg-slate-800/50">
                  <th className="py-3 px-4">Staff Member</th>
                  <th className="py-3 px-4">Email / Phone</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Login Time</th>
                  <th className="py-3 px-4">IP Address</th>
                  <th className="py-3 px-4">Device & Browser</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-500">
                      No login logs found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredLogs.map((log) => (
                    <tr key={log._id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                        {log.userName || 'Unknown'}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300 font-mono text-xs">
                        {log.emailOrPhone}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase ${
                          log.role === 'admin'
                            ? 'bg-purple-100 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300'
                            : 'bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300'
                        }`}>
                          {log.role || 'staff'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 text-xs">
                        {new Date(log.createdAt).toLocaleString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                        })}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-xs text-slate-600 dark:text-slate-400">
                        <div className="flex items-center space-x-1.5">
                          <Globe className="w-3.5 h-3.5 text-slate-400" />
                          <span>{log.ipAddress}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-xs text-slate-500 max-w-xs truncate" title={log.userAgent}>
                        <div className="flex items-center space-x-1.5">
                          <Smartphone className="w-3.5 h-3.5 text-slate-400" />
                          <span className="truncate">{log.userAgent}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        {log.status === 'SUCCESS' ? (
                          <span className="inline-flex items-center space-x-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 px-2.5 py-1 rounded-full text-xs font-semibold">
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>SUCCESS</span>
                          </span>
                        ) : (
                          <span
                            title={log.failureReason}
                            className="inline-flex items-center space-x-1 bg-rose-100 text-rose-800 dark:bg-rose-950/50 dark:text-rose-300 px-2.5 py-1 rounded-full text-xs font-semibold cursor-help"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>FAILED</span>
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 2: Staff Directory */}
        {activeTab === 'staff' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {staffList.map((member) => (
              <div
                key={member._id}
                className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-5 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center">
                      {member.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">{member.name}</h4>
                      <p className="text-xs text-slate-500 font-mono">{member.email || member.phone}</p>
                    </div>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    member.role === 'admin'
                      ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300'
                      : 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                  }`}>
                    {member.role?.toUpperCase()}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center text-xs text-slate-500">
                  <div className="flex items-center space-x-1">
                    <UserCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Verified: <strong>{member.isVerified ? 'Yes' : 'Pending'}</strong></span>
                  </div>
                  <span>Joined: {new Date(member.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Admin;

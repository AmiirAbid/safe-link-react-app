import React, { useState, useEffect } from 'react';
import {
    Shield, LayoutDashboard, AlertTriangle, FileText, Activity,
    Scan, User, LogOut, Menu, X, TrendingUp, TrendingDown,
    Clock, Server, Zap, Eye, ChevronRight
} from 'lucide-react';

// Services API (to be implemented later)
const dashboardService = {
    getStatistics: async () => {
        // TODO: Implement actual API call
        console.log('Fetching statistics...');

        // Simulated API call
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    totalAlerts: 1247,
                    activeThreats: 23,
                    blockedIPs: 456,
                    uptime: 99.98,
                    alertsTrend: 12.5,
                    threatsTrend: -8.3,
                    recentAlerts: [
                        { id: 1, type: 'DDoS Attack', ip: '192.168.1.105', severity: 'critical', time: '2 min ago' },
                        { id: 2, type: 'Port Scan', ip: '10.0.0.45', severity: 'high', time: '15 min ago' },
                        { id: 3, type: 'Brute Force', ip: '172.16.0.88', severity: 'medium', time: '1 hour ago' },
                    ],
                    trafficData: [
                        { time: '00:00', value: 450 },
                        { time: '04:00', value: 380 },
                        { time: '08:00', value: 820 },
                        { time: '12:00', value: 1200 },
                        { time: '16:00', value: 950 },
                        { time: '20:00', value: 680 },
                    ],
                    attackDistribution: [
                        { type: 'DDoS', count: 450, percentage: 36 },
                        { type: 'Port Scan', count: 350, percentage: 28 },
                        { type: 'Brute Force', count: 280, percentage: 22 },
                        { type: 'SQL Injection', count: 167, percentage: 14 },
                    ]
                });
            }, 1000);
        });
    }
};

const alertService = {
    getAlerts: async () => {
        // TODO: Implement actual API call
        console.log('Fetching alerts...');
        return Promise.resolve([]);
    }
};

const logService = {
    getLogs: async () => {
        // TODO: Implement actual API call
        console.log('Fetching logs...');
        return Promise.resolve([]);
    }
};

const mitigationService = {
    getMitigations: async () => {
        // TODO: Implement actual API call
        console.log('Fetching mitigations...');
        return Promise.resolve([]);
    }
};

const scanService = {
    performScan: async () => {
        // TODO: Implement actual API call
        console.log('Performing scan...');
        return Promise.resolve({ success: true });
    }
};

const userService = {
    getUserProfile: async () => {
        // TODO: Implement actual API call
        console.log('Fetching user profile...');
        return Promise.resolve({ name: 'Admin User', email: 'admin@safelink.com' });
    },

    updateProfile: async (data) => {
        // TODO: Implement actual API call
        console.log('Updating profile...', data);
        return Promise.resolve({ success: true });
    }
};

// Sidebar Component
const Sidebar = ({ currentPage, setCurrentPage, sidebarOpen, setSidebarOpen }) => {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'alerts', label: 'Alerts', icon: AlertTriangle },
        { id: 'logs', label: 'Logs', icon: FileText },
        { id: 'actions', label: 'Actions', icon: Activity },
        { id: 'scan', label: 'Scan', icon: Scan },
        { id: 'settings', label: 'Settings', icon: User },
    ];

    const handleLogout = () => {
        console.log('Logging out...');
        // TODO: Implement logout logic
    };

    return (
        <>
            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside className={`
        fixed top-0 left-0 h-full w-64 bg-slate-900 border-r border-cyan-500/20 z-50
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="flex items-center justify-between p-6 border-b border-cyan-500/20">
                        <div className="flex items-center space-x-2">
                            <Shield className="w-8 h-8 text-[#6abaca]" />
                            <span className="text-xl font-bold bg-gradient-to-r from-[#6abaca] to-cyan-300 bg-clip-text text-transparent">
                SafeLink
              </span>
                        </div>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden text-gray-400 hover:text-white"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Menu Items */}
                    <nav className="flex-1 p-4 space-y-2">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => {
                                    setCurrentPage(item.id);
                                    setSidebarOpen(false);
                                }}
                                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all
                  ${currentPage === item.id
                                    ? 'bg-[#6abaca]/20 text-[#6abaca] border border-[#6abaca]/30'
                                    : 'text-gray-400 hover:bg-slate-800 hover:text-white'
                                }
                `}
                            >
                                <item.icon className="w-5 h-5" />
                                <span className="font-medium">{item.label}</span>
                            </button>
                        ))}
                    </nav>

                    {/* Logout Button */}
                    <div className="p-4 border-t border-cyan-500/20">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-all"
                        >
                            <LogOut className="w-5 h-5" />
                            <span className="font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
};

// Header Component
const Header = ({ sidebarOpen, setSidebarOpen }) => {
    return (
        <header className="sticky top-0 z-30 bg-slate-950/90 backdrop-blur-lg border-b border-cyan-500/20">
            <div className="flex items-center justify-between px-4 lg:px-8 py-4">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="lg:hidden text-gray-400 hover:text-white"
                >
                    <Menu className="w-6 h-6" />
                </button>

                <div className="flex-1 lg:flex-none"></div>

                <div className="flex items-center space-x-4">
                    <div className="hidden sm:flex items-center space-x-2 px-3 py-2 bg-slate-900/50 rounded-lg border border-cyan-500/20">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-sm text-gray-400">System Online</span>
                    </div>

                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#6abaca] to-cyan-400 rounded-lg flex items-center justify-center">
                            <User className="w-5 h-5 text-slate-950" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

// Stat Card Component
const StatCard = ({ icon: Icon, label, value, trend, trendValue }) => {
    const isPositive = trendValue > 0;
    const TrendIcon = isPositive ? TrendingUp : TrendingDown;

    return (
        <div className="p-6 bg-slate-900/50 backdrop-blur border border-cyan-500/20 rounded-xl hover:border-[#6abaca]/50 transition-all">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <div className="flex items-center space-x-2 text-gray-400 text-sm mb-2">
                        <Icon className="w-4 h-4" />
                        <span>{label}</span>
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">{value}</div>
                    {trend && (
                        <div className={`flex items-center space-x-1 text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                            <TrendIcon className="w-4 h-4" />
                            <span>{Math.abs(trendValue)}%</span>
                            <span className="text-gray-500">vs last week</span>
                        </div>
                    )}
                </div>
                <div className={`p-3 rounded-lg ${
                    label === 'Active Threats' ? 'bg-red-500/10' : 'bg-[#6abaca]/10'
                }`}>
                    <Icon className={`w-6 h-6 ${
                        label === 'Active Threats' ? 'text-red-400' : 'text-[#6abaca]'
                    }`} />
                </div>
            </div>
        </div>
    );
};

// Recent Alert Card Component
const RecentAlertCard = ({ alert }) => {
    const severityColors = {
        critical: 'bg-red-500/10 border-red-500/30 text-red-400',
        high: 'bg-orange-500/10 border-orange-500/30 text-orange-400',
        medium: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
        low: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
    };

    return (
        <div className="flex items-center justify-between p-4 bg-slate-900/30 rounded-lg border border-cyan-500/10 hover:border-cyan-500/30 transition-all">
            <div className="flex items-center space-x-4 flex-1">
                <AlertTriangle className="w-5 h-5 text-[#6abaca]" />
                <div className="flex-1">
                    <div className="font-medium text-white">{alert.type}</div>
                    <div className="text-sm text-gray-400">{alert.ip}</div>
                </div>
            </div>
            <div className="flex items-center space-x-4">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${severityColors[alert.severity]}`}>
          {alert.severity.toUpperCase()}
        </span>
                <span className="text-sm text-gray-500 hidden sm:block">{alert.time}</span>
            </div>
        </div>
    );
};

// Dashboard Page Component
const DashboardPage = () => {
    const [stats, setStats] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadStats = async () => {
            try {
                const data = await dashboardService.getStatistics();
                setStats(data);
            } catch (error) {
                console.error('Error loading statistics:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadStats();
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#6abaca] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    icon={AlertTriangle}
                    label="Total Alerts"
                    value={stats.totalAlerts.toLocaleString()}
                    trend={true}
                    trendValue={stats.alertsTrend}
                />
                <StatCard
                    icon={Shield}
                    label="Active Threats"
                    value={stats.activeThreats}
                    trend={true}
                    trendValue={stats.threatsTrend}
                />
                <StatCard
                    icon={Server}
                    label="Blocked IPs"
                    value={stats.blockedIPs.toLocaleString()}
                    trend={false}
                />
                <StatCard
                    icon={Zap}
                    label="System Uptime"
                    value={`${stats.uptime}%`}
                    trend={false}
                />
            </div>

            {/* Charts and Activity Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Traffic Chart */}
                <div className="lg:col-span-2 p-6 bg-slate-900/50 backdrop-blur border border-cyan-500/20 rounded-xl">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-white">Network Traffic</h3>
                        <select className="px-3 py-2 bg-slate-800 border border-cyan-500/20 rounded-lg text-gray-300 text-sm focus:outline-none focus:border-[#6abaca]">
                            <option>Last 24 Hours</option>
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                        </select>
                    </div>

                    <div className="h-64 flex items-end justify-between space-x-2">
                        {stats.trafficData.map((data, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center space-y-2">
                                <div className="w-full bg-slate-800 rounded-t-lg relative overflow-hidden"
                                     style={{ height: `${(data.value / 1200) * 100}%`, minHeight: '20px' }}>
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#6abaca] to-cyan-400"></div>
                                </div>
                                <span className="text-xs text-gray-500">{data.time}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Attack Distribution */}
                <div className="p-6 bg-slate-900/50 backdrop-blur border border-cyan-500/20 rounded-xl">
                    <h3 className="text-xl font-bold text-white mb-6">Attack Types</h3>
                    <div className="space-y-4">
                        {stats.attackDistribution.map((attack, i) => (
                            <div key={i}>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-gray-400">{attack.type}</span>
                                    <span className="text-sm font-semibold text-white">{attack.count}</span>
                                </div>
                                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-[#6abaca] to-cyan-400"
                                        style={{ width: `${attack.percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Alerts */}
            <div className="p-6 bg-slate-900/50 backdrop-blur border border-cyan-500/20 rounded-xl">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white">Recent Alerts</h3>
                    <button className="flex items-center space-x-2 text-[#6abaca] hover:text-cyan-400 transition-colors">
                        <span className="text-sm">View All</span>
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
                <div className="space-y-3">
                    {stats.recentAlerts.map((alert) => (
                        <RecentAlertCard key={alert.id} alert={alert} />
                    ))}
                </div>
            </div>
        </div>
    );
};

// Placeholder Pages
const AlertsPage = () => (
    <div className="flex items-center justify-center h-96">
        <div className="text-center">
            <AlertTriangle className="w-16 h-16 text-[#6abaca] mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Alerts Page</h2>
            <p className="text-gray-400">Coming soon...</p>
        </div>
    </div>
);

const LogsPage = () => (
    <div className="flex items-center justify-center h-96">
        <div className="text-center">
            <FileText className="w-16 h-16 text-[#6abaca] mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Logs Page</h2>
            <p className="text-gray-400">Coming soon...</p>
        </div>
    </div>
);

const ActionsPage = () => (
    <div className="flex items-center justify-center h-96">
        <div className="text-center">
            <Activity className="w-16 h-16 text-[#6abaca] mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Actions Page</h2>
            <p className="text-gray-400">Coming soon...</p>
        </div>
    </div>
);

const ScanPage = () => (
    <div className="flex items-center justify-center h-96">
        <div className="text-center">
            <Scan className="w-16 h-16 text-[#6abaca] mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Scan Page</h2>
            <p className="text-gray-400">Coming soon...</p>
        </div>
    </div>
);

const SettingsPage = () => (
    <div className="flex items-center justify-center h-96">
        <div className="text-center">
            <User className="w-16 h-16 text-[#6abaca] mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Settings Page</h2>
            <p className="text-gray-400">Coming soon...</p>
        </div>
    </div>
);

// Main Dashboard Component
export default function Dashboard() {
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const renderPage = () => {
        switch (currentPage) {
            case 'dashboard':
                return <DashboardPage />;
            case 'alerts':
                return <AlertsPage />;
            case 'logs':
                return <LogsPage />;
            case 'actions':
                return <ActionsPage />;
            case 'scan':
                return <ScanPage />;
            case 'settings':
                return <SettingsPage />;
            default:
                return <DashboardPage />;
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Sidebar
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            <div className="lg:ml-64">
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                <main className="p-4 lg:p-8">
                    {renderPage()}
                </main>
            </div>
        </div>
    );
}
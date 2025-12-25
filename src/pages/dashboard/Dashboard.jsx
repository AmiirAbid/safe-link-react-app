import React, {useState, useEffect} from 'react';
import {
    Shield, AlertTriangle, TrendingUp, TrendingDown, Server, Zap, ChevronRight
} from 'lucide-react';
import {logService} from "@/services/logService.js";

// Services API (to be implemented later)
const dashboardService = {
    getStatistics: async () => {

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
                        {id: 1, type: 'DDoS Attack', ip: '192.168.1.105', severity: 'critical', time: '2 min ago'},
                        {id: 2, type: 'Port Scan', ip: '10.0.0.45', severity: 'high', time: '15 min ago'},
                        {id: 3, type: 'Brute Force', ip: '172.16.0.88', severity: 'medium', time: '1 hour ago'},
                    ],
                    trafficData: [
                        {time: '00:00', value: 450},
                        {time: '04:00', value: 380},
                        {time: '08:00', value: 820},
                        {time: '12:00', value: 1200},
                        {time: '16:00', value: 950},
                        {time: '20:00', value: 680},
                    ],
                    attackDistribution: [
                        {type: 'DDoS', count: 450, percentage: 36},
                        {type: 'Port Scan', count: 350, percentage: 28},
                        {type: 'Brute Force', count: 280, percentage: 22},
                        {type: 'SQL Injection', count: 167, percentage: 14},
                    ]
                });
            }, 1000);
        });
    }
};

// Stat Card Component
const StatCard = ({icon: Icon, label, value, trend, trendValue}) => {
    const isPositive = trendValue > 0;
    const TrendIcon = isPositive ? TrendingUp : TrendingDown;

    return (
        <div
            className="p-6 bg-slate-900/50 backdrop-blur border border-cyan-500/20 rounded-xl hover:border-[#6abaca]/50 transition-all">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <div className="flex items-center space-x-2 text-gray-400 text-sm mb-2">
                        <Icon className="w-4 h-4"/>
                        <span>{label}</span>
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">{value}</div>
                    {trend && (
                        <div
                            className={`flex items-center space-x-1 text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                            <TrendIcon className="w-4 h-4"/>
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
                    }`}/>
                </div>
            </div>
        </div>
    );
};

// Recent Alert Card Component
const RecentAlertCard = ({alert}) => {
    const severityColors = {
        critical: 'bg-red-500/10 border-red-500/30 text-red-400',
        high: 'bg-orange-500/10 border-orange-500/30 text-orange-400',
        medium: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
        low: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
    };

    return (
        <div
            className="flex items-center justify-between p-4 bg-slate-900/30 rounded-lg border border-cyan-500/10 hover:border-cyan-500/30 transition-all">
            <div className="flex items-center space-x-4 flex-1">
                <AlertTriangle className="w-5 h-5 text-[#6abaca]"/>
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
export default function DashboardPage() {
    const [stats, setStats] = useState(null);
    const [logs, setLogs] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLogsLoading, setIsLogsLoading] = useState(false);

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
        loadLogs();
    }, []);

    const loadLogs = async () => {
        setIsLogsLoading(true);

        try {
            const res = await logService.getLogs({days: 7});
            const logs = res.data; // raw logs array from backend

            // Create last 7 days array initialized at 0
            const days = Array.from({length: 7}).map((_, i) => {
                const date = new Date();
                date.setDate(date.getDate() - (6 - i)); // oldest first
                return {
                    dateKey: date.toISOString().split("T")[0], // YYYY-MM-DD
                    label: date.toLocaleDateString("en-US", {weekday: "short"}), // Mon, Tue...
                    value: 0
                };
            });

            // Count logs per day
            logs.forEach((log) => {
                const logDate = new Date(log.timestamp).toISOString().split("T")[0];
                const day = days.find(d => d.dateKey === logDate);
                if (day) day.value++;
            });
            setLogs(days); // save the transformed structure

        } catch (error) {
            console.error("Error loading logs:", error);
        } finally {
            setIsLogsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <div
                        className="w-16 h-16 border-4 border-[#6abaca] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
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
                        <select
                            className="px-3 py-2 bg-slate-800 border border-cyan-500/20 rounded-lg text-gray-300 text-sm focus:outline-none focus:border-[#6abaca]">
                            <option>Last 7 Days</option>
                        </select>
                    </div>

                    <div className="h-64 flex flex-col justify-end">
                        <div className="flex items-end justify-between space-x-2 h-full">
                            {logs && logs.map((day, i) => {
                                const maxValue = Math.max(...logs.map(l => l.value));
                                const heightPercentage = maxValue > 0 ? (day.value / maxValue) * 100 : 0;

                                return (
                                    <div
                                        key={i}
                                        className="flex-1 flex flex-col items-center space-y-2 h-full group"
                                    >
                                        {/* Tooltip */}
                                        <div
                                            className="absolute mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 -translate-y-full group-hover:-translate-y-2 pointer-events-none">
                                            <div className="font-semibold">{day.label}</div>
                                            <div className="text-cyan-300">{day.value} units</div>
                                            <div
                                                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
                                        </div>

                                        {/* Bar Container with animation */}
                                        <div className="w-full flex-1 flex flex-col justify-end relative">
                                            <div
                                                className="w-full bg-gradient-to-t from-cyan-900/20 to-transparent rounded-t-lg relative overflow-hidden"
                                                style={{height: "100%"}}
                                            >
                                                {/* Animated Bar */}
                                                <div
                                                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-cyan-500 via-cyan-400 to-cyan-300 rounded-t-lg transform origin-bottom transition-all duration-500 ease-out"
                                                    style={{
                                                        height: `${heightPercentage}%`,
                                                        animationDelay: `${i * 100}ms`,
                                                    }}
                                                >
                                                    {/* Bar shine effect */}
                                                    <div
                                                        className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-lg"></div>

                                                    {/* Bar data point indicator */}
                                                    {day.value > 0 && (
                                                        <div
                                                            className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-cyan-400 rounded-full ring-2 ring-cyan-900/30"></div>
                                                    )}
                                                </div>

                                                {/* Grid lines */}
                                                <div
                                                    className="absolute top-0 left-0 right-0 h-px bg-cyan-500/20"></div>
                                                <div
                                                    className="absolute top-1/2 left-0 right-0 h-px bg-cyan-500/10"></div>
                                            </div>

                                            {/* Base line */}
                                            <div
                                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
                                        </div>

                                        {/* Label with hover effect */}
                                        <span
                                            className="text-xs text-gray-400 transition-colors duration-200 group-hover:text-cyan-400 font-medium">
                        {day.label}
                    </span>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Legend */}
                        <div className="flex justify-end items-center space-x-4 mt-6">
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded"></div>
                                <span className="text-xs text-gray-400">Daily Activity</span>
                            </div>
                            <div className="text-xs text-gray-500">
                                {new Date().toLocaleDateString('en-US', {month: 'long', year: 'numeric'})}
                            </div>
                        </div>
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
                                        style={{width: `${attack.percentage}%`}}
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
                    <button
                        className="flex items-center space-x-2 text-[#6abaca] hover:text-cyan-400 transition-colors">
                        <span className="text-sm">View All</span>
                        <ChevronRight className="w-4 h-4"/>
                    </button>
                </div>
                <div className="space-y-3">
                    {stats.recentAlerts.map((alert) => (
                        <RecentAlertCard key={alert.id} alert={alert}/>
                    ))}
                </div>
            </div>
        </div>


    );
};

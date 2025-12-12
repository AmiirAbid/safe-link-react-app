import React, { useState, useEffect } from 'react';
import {
    FileText, Search, Filter, Download, RefreshCw,
    ChevronDown, ChevronUp, TrendingUp, Activity,
    Server, Network, Clock, Database, Eye, Calendar
} from 'lucide-react';

// Log Service API (to be implemented later)
const logService = {
    getLogs: async (filters) => {
        // TODO: Implement actual API call
        console.log('Fetching logs with filters:', filters);

        // Simulated API call with mock data
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    logs: [
                        {
                            _id: '1',
                            timestamp: new Date(Date.now() - 1 * 60 * 1000),
                            src_ip: '192.168.1.105',
                            dst_ip: '10.0.0.50',
                            protocol: 'TCP',
                            dst_port: 443,
                            packets: 1523,
                            bytes: 2048576,
                            flags: { syn: 1, ack: 145, fin: 1 },
                            flow_duration: 3500
                        },
                        {
                            _id: '2',
                            timestamp: new Date(Date.now() - 3 * 60 * 1000),
                            src_ip: '172.16.0.88',
                            dst_ip: '10.0.0.51',
                            protocol: 'UDP',
                            dst_port: 53,
                            packets: 42,
                            bytes: 8960,
                            flags: { syn: 0, ack: 0, fin: 0 },
                            flow_duration: 120
                        },
                        {
                            _id: '3',
                            timestamp: new Date(Date.now() - 5 * 60 * 1000),
                            src_ip: '10.0.0.45',
                            dst_ip: '8.8.8.8',
                            protocol: 'ICMP',
                            dst_port: null,
                            packets: 4,
                            bytes: 336,
                            flags: { syn: 0, ack: 0, fin: 0 },
                            flow_duration: 4000
                        },
                        {
                            _id: '4',
                            timestamp: new Date(Date.now() - 8 * 60 * 1000),
                            src_ip: '203.45.67.89',
                            dst_ip: '10.0.0.52',
                            protocol: 'TCP',
                            dst_port: 80,
                            packets: 2847,
                            bytes: 4194304,
                            flags: { syn: 1, ack: 892, fin: 1 },
                            flow_duration: 12500
                        },
                        {
                            _id: '5',
                            timestamp: new Date(Date.now() - 12 * 60 * 1000),
                            src_ip: '198.51.100.42',
                            dst_ip: '10.0.0.53',
                            protocol: 'TCP',
                            dst_port: 22,
                            packets: 156,
                            bytes: 45056,
                            flags: { syn: 1, ack: 78, fin: 1 },
                            flow_duration: 8200
                        },
                        {
                            _id: '6',
                            timestamp: new Date(Date.now() - 15 * 60 * 1000),
                            src_ip: '192.0.2.123',
                            dst_ip: '10.0.0.54',
                            protocol: 'UDP',
                            dst_port: 123,
                            packets: 8,
                            bytes: 576,
                            flags: { syn: 0, ack: 0, fin: 0 },
                            flow_duration: 50
                        },
                    ],
                    summary: {
                        totalLogs: 45682,
                        totalPackets: 2847523,
                        totalBytes: 5368709120,
                        avgFlowDuration: 5420,
                        protocolDistribution: {
                            TCP: 62,
                            UDP: 28,
                            ICMP: 10
                        }
                    }
                });
            }, 800);
        });
    },

    exportLogs: async (filters) => {
        // TODO: Implement actual API call
        console.log('Exporting logs with filters:', filters);
        return Promise.resolve({ success: true });
    }
};

// Utility functions
const formatTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);

    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
};

const formatBytes = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
};

const formatDuration = (ms) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
};

// Summary Card Component
const SummaryCard = ({ icon: Icon, label, value, subtitle }) => {
    return (
        <div className="p-4 bg-slate-900/50 backdrop-blur border border-cyan-500/20 rounded-xl hover:border-cyan-500/40 transition-all">
            <div className="flex items-center justify-between mb-2">
                <Icon className="w-5 h-5 text-[#6abaca]" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{value}</div>
            <div className="text-sm text-gray-400">{label}</div>
            {subtitle && (
                <div className="text-xs text-gray-500 mt-1">{subtitle}</div>
            )}
        </div>
    );
};

// Protocol Badge Component
const ProtocolBadge = ({ protocol }) => {
    const colors = {
        TCP: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
        UDP: 'bg-green-500/10 border-green-500/30 text-green-400',
        ICMP: 'bg-purple-500/10 border-purple-500/30 text-purple-400',
    };

    return (
        <span className={`px-2 py-1 rounded text-xs font-semibold border ${colors[protocol]}`}>
      {protocol}
    </span>
    );
};

// Log Row Component
const LogRow = ({ log, expanded, onToggleExpand }) => {
    return (
        <div className="bg-slate-900/30 border border-cyan-500/20 rounded-lg overflow-hidden hover:border-cyan-500/40 transition-all">
            <div className="p-4">
                <div className="flex items-start justify-between gap-4">
                    {/* Left Section - Log Info */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-3">
                            <ProtocolBadge protocol={log.protocol} />
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                                {formatTimeAgo(log.timestamp)}
              </span>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm">
                            {/* Connection Info */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-400 w-24">Source:</span>
                                    <span className="text-white font-mono">{log.src_ip}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-400 w-24">Destination:</span>
                                    <span className="text-white font-mono">{log.dst_ip}</span>
                                </div>
                                {log.dst_port && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-gray-400 w-24">Port:</span>
                                        <span className="text-white font-mono">{log.dst_port}</span>
                                    </div>
                                )}
                            </div>

                            {/* Traffic Stats */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-400 w-24">Packets:</span>
                                    <span className="text-[#6abaca] font-semibold">{log.packets.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-400 w-24">Data:</span>
                                    <span className="text-[#6abaca] font-semibold">{formatBytes(log.bytes)}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-400 w-24">Duration:</span>
                                    <span className="text-[#6abaca] font-semibold">{formatDuration(log.flow_duration)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Section - Expand Button */}
                    <button
                        onClick={() => onToggleExpand(log._id)}
                        className="px-3 py-2 bg-slate-700/50 border border-slate-600 text-gray-400 rounded-lg hover:bg-slate-700 transition-all"
                    >
                        {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                </div>

                {/* Expanded Details */}
                {expanded && (
                    <div className="mt-4 pt-4 border-t border-cyan-500/20">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                                <h4 className="text-gray-400 font-semibold mb-2">TCP Flags</h4>
                                <div className="space-y-1">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-400">SYN:</span>
                                        <span className="text-white font-mono">{log.flags.syn}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-400">ACK:</span>
                                        <span className="text-white font-mono">{log.flags.ack}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-400">FIN:</span>
                                        <span className="text-white font-mono">{log.flags.fin}</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-gray-400 font-semibold mb-2">Additional Info</h4>
                                <div className="space-y-1">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-400">Log ID:</span>
                                        <span className="text-white font-mono text-xs">{log._id}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-400">Timestamp:</span>
                                        <span className="text-white text-xs">{log.timestamp.toLocaleString()}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-400">Avg Packet Size:</span>
                                        <span className="text-white">{formatBytes(log.bytes / log.packets)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// Main Logs Page Component
export default function LogsPage() {
    const [logs, setLogs] = useState([]);
    const [summary, setSummary] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [protocolFilter, setProtocolFilter] = useState('all');
    const [expandedLog, setExpandedLog] = useState(null);
    const [showFilters, setShowFilters] = useState(false);
    const [dateRange, setDateRange] = useState('24h');

    useEffect(() => {
        loadLogs();
    }, []);

    const loadLogs = async () => {
        setIsLoading(true);
        try {
            const data = await logService.getLogs({
                search: searchTerm,
                protocol: protocolFilter,
                dateRange: dateRange
            });
            setLogs(data.logs);
            setSummary(data.summary);
        } catch (error) {
            console.error('Error loading logs:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleExport = async () => {
        try {
            await logService.exportLogs({
                search: searchTerm,
                protocol: protocolFilter,
                dateRange: dateRange
            });
            console.log('Export successful');
        } catch (error) {
            console.error('Error exporting logs:', error);
        }
    };

    const filteredLogs = logs.filter(log => {
        const matchesSearch = log.src_ip.includes(searchTerm) ||
            (log.dst_ip && log.dst_ip.includes(searchTerm)) ||
            (log.dst_port && log.dst_port.toString().includes(searchTerm));
        const matchesProtocol = protocolFilter === 'all' || log.protocol === protocolFilter;
        return matchesSearch && matchesProtocol;
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#6abaca] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading logs...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Network Logs</h1>
                    <p className="text-gray-400">Monitor all network traffic and connections</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={loadLogs}
                        className="px-4 py-2 bg-slate-800 border border-cyan-500/20 text-gray-300 rounded-lg hover:bg-slate-700 transition-all flex items-center gap-2"
                    >
                        <RefreshCw className="w-4 h-4" />
                        <span className="hidden sm:inline">Refresh</span>
                    </button>
                    <button
                        onClick={handleExport}
                        className="px-4 py-2 bg-[#6abaca] text-slate-950 rounded-lg font-semibold hover:bg-cyan-400 transition-all flex items-center gap-2"
                    >
                        <Download className="w-4 h-4" />
                        <span className="hidden sm:inline">Export</span>
                    </button>
                </div>
            </div>

            {/* Summary Cards */}
            {summary && (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <SummaryCard
                        icon={FileText}
                        label="Total Logs"
                        value={summary.totalLogs.toLocaleString()}
                    />
                    <SummaryCard
                        icon={Activity}
                        label="Total Packets"
                        value={summary.totalPackets.toLocaleString()}
                    />
                    <SummaryCard
                        icon={Database}
                        label="Total Data"
                        value={formatBytes(summary.totalBytes)}
                    />
                    <SummaryCard
                        icon={Clock}
                        label="Avg Duration"
                        value={formatDuration(summary.avgFlowDuration)}
                    />
                </div>
            )}

            {/* Protocol Distribution Chart */}
            {summary && (
                <div className="p-6 bg-slate-900/50 backdrop-blur border border-cyan-500/20 rounded-xl">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Network className="w-5 h-5 text-[#6abaca]" />
                        Protocol Distribution
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {Object.entries(summary.protocolDistribution).map(([protocol, percentage]) => (
                            <div key={protocol} className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <ProtocolBadge protocol={protocol} />
                                    <span className="text-2xl font-bold text-white">{percentage}%</span>
                                </div>
                                <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-[#6abaca] to-cyan-400 transition-all duration-500"
                                        style={{ width: `${percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Search and Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by IP address or port..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#6abaca] focus:ring-2 focus:ring-[#6abaca]/20"
                    />
                </div>
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="px-6 py-3 bg-slate-800 border border-cyan-500/20 text-gray-300 rounded-lg hover:bg-slate-700 transition-all flex items-center gap-2 justify-center"
                >
                    <Filter className="w-5 h-5" />
                    Filters
                </button>
            </div>

            {/* Filter Panel */}
            {showFilters && (
                <div className="p-6 bg-slate-900/50 border border-cyan-500/20 rounded-xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Protocol</label>
                            <select
                                value={protocolFilter}
                                onChange={(e) => setProtocolFilter(e.target.value)}
                                className="w-full px-4 py-2 bg-slate-800 border border-cyan-500/20 rounded-lg text-white focus:outline-none focus:border-[#6abaca]"
                            >
                                <option value="all">All Protocols</option>
                                <option value="TCP">TCP</option>
                                <option value="UDP">UDP</option>
                                <option value="ICMP">ICMP</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Time Range</label>
                            <select
                                value={dateRange}
                                onChange={(e) => setDateRange(e.target.value)}
                                className="w-full px-4 py-2 bg-slate-800 border border-cyan-500/20 rounded-lg text-white focus:outline-none focus:border-[#6abaca]"
                            >
                                <option value="1h">Last Hour</option>
                                <option value="24h">Last 24 Hours</option>
                                <option value="7d">Last 7 Days</option>
                                <option value="30d">Last 30 Days</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}

            {/* Logs List */}
            <div className="space-y-4">
                {filteredLogs.length === 0 ? (
                    <div className="text-center py-12">
                        <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-400">No logs found matching your criteria</p>
                    </div>
                ) : (
                    filteredLogs.map((log) => (
                        <LogRow
                            key={log._id}
                            log={log}
                            expanded={expandedLog === log._id}
                            onToggleExpand={(id) => setExpandedLog(expandedLog === id ? null : id)}
                        />
                    ))
                )}
            </div>

            {/* Pagination Info */}
            <div className="text-center text-sm text-gray-400">
                Showing {filteredLogs.length} of {summary?.totalLogs.toLocaleString()} logs
            </div>
        </div>
    );
}
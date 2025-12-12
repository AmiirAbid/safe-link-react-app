import React, { useState, useEffect } from 'react';
import {
    AlertTriangle, Search, Filter, Download, RefreshCw,
    Check, X, Shield, Clock, ChevronDown,
    ChevronUp, ExternalLink, Lock, Zap
} from 'lucide-react';

import {alertService} from "@/services/alertService.js";
import {mitigationService} from "@/services/mitigationService.js";

// Utility function to format time ago
const formatTimeAgo = (input) => {
    const date = input instanceof Date ? input : new Date(input);
    const seconds = Math.floor((new Date() - date) / 1000);

    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
};

// Summary Card Component
const SummaryCard = ({ icon: Icon, label, value, color, isActive, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`p-4 rounded-xl border transition-all ${
                isActive
                    ? `bg-${color}-500/20 border-${color}-500/50`
                    : 'bg-slate-900/50 border-cyan-500/20 hover:border-cyan-500/40'
            }`}
        >
            <div className="flex items-center justify-between mb-2">
                <Icon className={`w-5 h-5 ${isActive ? `text-${color}-400` : 'text-gray-400'}`} />
                <span className={`text-2xl font-bold ${isActive ? 'text-white' : 'text-gray-300'}`}>
          {value}
        </span>
            </div>
            <div className={`text-sm ${isActive ? 'text-white' : 'text-gray-400'}`}>
                {label}
            </div>
        </button>
    );
};

// Alert Row Component
const AlertRow = ({ alert, onStatusChange, expanded, onToggleExpand }) => {
    const [isUpdating, setIsUpdating] = useState(false);

    const severityConfig = {
        critical: { color: 'red', bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400' },
        high: { color: 'orange', bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-400' },
        medium: { color: 'yellow', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-400' },
        low: { color: 'blue', bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400' },
    };

    const statusConfig = {
        open: { icon: AlertTriangle, text: 'Open', color: 'text-red-400' },
        mitigated: { icon: Check, text: 'Mitigated', color: 'text-green-400' },
        ignored: { icon: X, text: 'Ignored', color: 'text-gray-400' },
    };

    const config = severityConfig[alert.severity];
    const StatusIcon = statusConfig[alert.status].icon;

    const handleAction = async (action, status) => {
        setIsUpdating(true);
        try {
            await onStatusChange(alert._id, status, action);
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="bg-slate-900/30 border border-cyan-500/20 rounded-lg overflow-hidden hover:border-cyan-500/40 transition-all">
            <div className="p-4">
                <div className="flex items-start justify-between gap-4">
                    {/* Left Section - Alert Info */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${config.bg} ${config.border} ${config.text}`}>
                {alert.severity.toUpperCase()}
              </span>
                            <span className={`flex items-center gap-1 text-sm ${statusConfig[alert.status].color}`}>
                <StatusIcon className="w-4 h-4" />
                                {statusConfig[alert.status].text}
              </span>
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                                {formatTimeAgo(alert.timestamp)}
              </span>
                        </div>

                        <h3 className="text-lg font-semibold text-white mb-2">{alert.attack_type}</h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                            <div className="flex items-center gap-2">
                                <span className="text-gray-400">Source IP:</span>
                                <span className="text-white font-mono">{alert.src_ip}</span>
                            </div>
                            {alert.dst_ip && (
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-400">Dest IP:</span>
                                    <span className="text-white font-mono">{alert.dst_ip}</span>
                                </div>
                            )}
                            {alert.dst_port && (
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-400">Port:</span>
                                    <span className="text-white font-mono">{alert.dst_port}</span>
                                </div>
                            )}
                            <div className="flex items-center gap-2">
                                <span className="text-gray-400">Confidence:</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-20 h-2 bg-slate-700 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-[#6abaca] to-cyan-400"
                                            style={{ width: `${alert.confidence * 100}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-white text-xs">{(alert.confidence * 100).toFixed(0)}%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Section - Actions */}
                    <div className="flex flex-col sm:flex-row items-end gap-2">
                        {alert.status === 'open' && (
                            <>
                                <button
                                    onClick={() => handleAction('block', 'mitigated')}
                                    disabled={isUpdating}
                                    className="px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg text-sm font-medium hover:bg-red-500/30 transition-all disabled:opacity-50 flex items-center gap-2"
                                >
                                    <Lock className="w-4 h-4" />
                                    Block
                                </button>
                                <button
                                    onClick={() => handleAction('isolate', 'mitigated')}
                                    disabled={isUpdating}
                                    className="px-4 py-2 bg-orange-500/20 border border-orange-500/30 text-orange-400 rounded-lg text-sm font-medium hover:bg-orange-500/30 transition-all disabled:opacity-50 flex items-center gap-2"
                                >
                                    <Shield className="w-4 h-4" />
                                    Isolate
                                </button>
                                <button
                                    onClick={() => handleAction(null, 'ignored')}
                                    disabled={isUpdating}
                                    className="px-4 py-2 bg-slate-700/50 border border-slate-600 text-gray-400 rounded-lg text-sm font-medium hover:bg-slate-700 transition-all disabled:opacity-50"
                                >
                                    Ignore
                                </button>
                            </>
                        )}
                        <button
                            onClick={() => onToggleExpand(alert._id)}
                            className="px-3 py-2 bg-slate-700/50 border border-slate-600 text-gray-400 rounded-lg hover:bg-slate-700 transition-all"
                        >
                            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                {/* Expanded Details */}
                {expanded && (
                    <div className="mt-4 pt-4 border-t border-cyan-500/20">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-gray-400">Alert ID:</span>
                                <span className="text-white ml-2 font-mono">{alert._id}</span>
                            </div>
                            <div>
                                <span className="text-gray-400">Timestamp:</span>
                                <span className="text-white ml-2">{alert.timestamp.toLocaleString()}</span>
                            </div>
                            {alert.mitigation_action && (
                                <div>
                                    <span className="text-gray-400">Mitigation Action:</span>
                                    <span className="text-[#6abaca] ml-2 font-semibold">{alert.mitigation_action.toUpperCase()}</span>
                                </div>
                            )}
                            <div className="md:col-span-2">
                                <button className="flex items-center gap-2 text-[#6abaca] hover:text-cyan-400 transition-colors text-sm">
                                    <ExternalLink className="w-4 h-4" />
                                    View Full Details
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// Main Alerts Page Component
export default function AlertsPage() {
    const [alerts, setAlerts] = useState([]);
    const [summary, setSummary] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [severityFilter, setSeverityFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [expandedAlert, setExpandedAlert] = useState(null);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        loadAlerts();
    }, []);

    const loadAlerts = async () => {
        setIsLoading(true);
        try {
            const data = await alertService.getAlerts({
                // search: searchTerm,
                // severity: severityFilter,
                // status: statusFilter
            });
            setAlerts(data.alerts);
            setSummary(data.summary);
        } catch (error) {
            console.error('Error loading alerts:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleStatusChange = async (alertId, status, mitigationAction) => {
        try {
            await mitigationService.mitigateAlert(alertId, mitigationAction);
            // Reload alerts after update
            loadAlerts();
        } catch (error) {
            console.error('Error updating alert:', error);
        }
    };

    const handleExport = async () => {
        try {
            await alertService.exportAlerts({
                search: searchTerm,
                severity: severityFilter,
                status: statusFilter
            });
            console.log('Export successful');
        } catch (error) {
            console.error('Error exporting alerts:', error);
        }
    };

    const filteredAlerts = alerts.filter(alert => {
        const matchesSearch = alert.attack_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
            alert.src_ip.includes(searchTerm);
        const matchesSeverity = severityFilter === 'all' || alert.severity === severityFilter;
        const matchesStatus = statusFilter === 'all' || alert.status === statusFilter;
        return matchesSearch && matchesSeverity && matchesStatus;
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#6abaca] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading alerts...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Security Alerts</h1>
                    <p className="text-gray-400">Monitor and manage security threats in real-time</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={loadAlerts}
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
                        icon={AlertTriangle}
                        label="Open Alerts"
                        value={summary.open}
                        color="red"
                        isActive={statusFilter === 'open'}
                        onClick={() => setStatusFilter(statusFilter === 'open' ? 'all' : 'open')}
                    />
                    <SummaryCard
                        icon={Check}
                        label="Mitigated"
                        value={summary.mitigated}
                        color="green"
                        isActive={statusFilter === 'mitigated'}
                        onClick={() => setStatusFilter(statusFilter === 'mitigated' ? 'all' : 'mitigated')}
                    />
                    <SummaryCard
                        icon={Shield}
                        label="Total Alerts"
                        value={summary.total}
                        color="cyan"
                        isActive={false}
                        onClick={() => setStatusFilter('all')}
                    />
                    <SummaryCard
                        icon={Zap}
                        label="Critical"
                        value={summary.critical}
                        color="red"
                        isActive={severityFilter === 'critical'}
                        onClick={() => setSeverityFilter(severityFilter === 'critical' ? 'all' : 'critical')}
                    />
                </div>
            )}

            {/* Search and Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by IP address or attack type..."
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
                            <label className="block text-sm font-medium text-gray-400 mb-2">Severity</label>
                            <select
                                value={severityFilter}
                                onChange={(e) => setSeverityFilter(e.target.value)}
                                className="w-full px-4 py-2 bg-slate-800 border border-cyan-500/20 rounded-lg text-white focus:outline-none focus:border-[#6abaca]"
                            >
                                <option value="all">All Severities</option>
                                <option value="critical">Critical</option>
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Status</label>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full px-4 py-2 bg-slate-800 border border-cyan-500/20 rounded-lg text-white focus:outline-none focus:border-[#6abaca]"
                            >
                                <option value="all">All Statuses</option>
                                <option value="open">Open</option>
                                <option value="mitigated">Mitigated</option>
                                <option value="ignored">Ignored</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}

            {/* Alerts List */}
            <div className="space-y-4">
                {filteredAlerts.length === 0 ? (
                    <div className="text-center py-12">
                        <AlertTriangle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-400">No alerts found matching your criteria</p>
                    </div>
                ) : (
                    filteredAlerts.map((alert) => (
                        <AlertRow
                            key={alert._id}
                            alert={alert}
                            onStatusChange={handleStatusChange}
                            expanded={expandedAlert === alert._id}
                            onToggleExpand={(id) => setExpandedAlert(expandedAlert === id ? null : id)}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
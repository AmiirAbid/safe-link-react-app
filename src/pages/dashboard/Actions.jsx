import React, { useState, useEffect } from 'react';
import {
    Shield, Check, X, Search, RefreshCw, Download,
    Clock, ChevronDown, ChevronUp, ExternalLink, Zap, Lock
} from 'lucide-react';

import {mitigationService} from "@/services/mitigationService.js";

// Utility: Time Ago
const formatTimeAgo = (input) => {
    const date = new Date(input);
    const seconds = Math.floor((new Date() - date) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
};


// Summary Card
const SummaryCard = ({ icon: Icon, label, value, color, isActive, onClick }) => (
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


// Action Row Component
const ActionRow = ({ action, expanded, onToggleExpand }) => {
    const statusConfig = {
        success: { color: "text-green-400", icon: Check },
        failed: { color: "text-red-400", icon: X }
    };

    const ActionIcon = action.action === "block" ? Lock : Shield;
    const StatusIcon = statusConfig[action.status].icon;

    return (
        <div className="bg-slate-900/30 border border-cyan-500/20 rounded-lg overflow-hidden hover:border-cyan-500/40 transition-all">
            <div className="p-4">
                <div className="flex items-start justify-between gap-4">

                    {/* Left Side */}
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                                {action.action.toUpperCase()}
                            </span>

                            <span className={`flex items-center gap-1 text-sm ${statusConfig[action.status].color}`}>
                                <StatusIcon className="w-4 h-4" />
                                {action.status.toUpperCase()}
                            </span>

                            <span className="text-xs text-gray-500 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {formatTimeAgo(action.timestamp)}
                            </span>
                        </div>

                        <h3 className="text-lg font-semibold text-white mb-2">
                            {action.action === "block" ? "Block Action" : "Isolate Action"}
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                            <div className="flex items-center gap-2">
                                <span className="text-gray-400">Target IP:</span>
                                <span className="text-white font-mono">{action.target_ip}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-gray-400">Performed By:</span>
                                <span className="text-white">{action.performed_by?.name}</span>
                            </div>
                        </div>
                    </div>

                    {/* Expand Button */}
                    <div>
                        <button
                            onClick={() => onToggleExpand(action._id)}
                            className="px-3 py-2 bg-slate-700/50 border border-slate-600 text-gray-400 rounded-lg hover:bg-slate-700 transition-all"
                        >
                            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                {/* Expanded Section */}
                {expanded && (
                    <div className="mt-4 pt-4 border-t border-cyan-500/20">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-gray-400">Action ID:</span>
                                <span className="text-white ml-2 font-mono">{action._id}</span>
                            </div>

                            <div>
                                <span className="text-gray-400">Timestamp:</span>
                                <span className="text-white ml-2">{action.timestamp.toLocaleString()}</span>
                            </div>

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


// Main Actions Page
export default function ActionsPage() {
    const [actions, setActions] = useState([]);
    const [summary, setSummary] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [expandedAction, setExpandedAction] = useState(null);

    useEffect(() => {
        loadActions();
    }, []);

    const loadActions = async () => {
        setIsLoading(true);
        try {
            const data = await mitigationService.getMitigations({
                search: searchTerm,
                type: typeFilter,
                status: statusFilter
            });

            setActions(data.actions);
            setSummary(data.summary);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredActions = actions.filter(a => {
        const matchesSearch =
            a.target_ip.includes(searchTerm) ||
            a.performed_by?.name.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesType = typeFilter === 'all' || a.action === typeFilter;
        const matchesStatus = statusFilter === 'all' || a.status === statusFilter;

        return matchesSearch && matchesType && matchesStatus;
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#6abaca] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading actions...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Mitigation Actions</h1>
                    <p className="text-gray-400">Review and analyze all performed mitigation actions</p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={loadActions}
                        className="px-4 py-2 bg-slate-800 border border-cyan-500/20 text-gray-300 rounded-lg hover:bg-slate-700 transition-all flex items-center gap-2"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Refresh
                    </button>

                    <button
                        onClick={() => actionsService.exportActions()}
                        className="px-4 py-2 bg-[#6abaca] text-slate-950 rounded-lg font-semibold hover:bg-cyan-400 transition-all flex items-center gap-2"
                    >
                        <Download className="w-4 h-4" />
                        Export
                    </button>
                </div>
            </div>

            {/* Summary Cards */}
            {summary && (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

                    <SummaryCard
                        icon={Check}
                        label="Successful"
                        value={summary.success}
                        color="green"
                        isActive={statusFilter === 'success'}
                        onClick={() => setStatusFilter(statusFilter === 'success' ? 'all' : 'success')}
                    />

                    <SummaryCard
                        icon={X}
                        label="Failed"
                        value={summary.failed}
                        color="red"
                        isActive={statusFilter === 'failed'}
                        onClick={() => setStatusFilter(statusFilter === 'failed' ? 'all' : 'failed')}
                    />

                    <SummaryCard
                        icon={Zap}
                        label="Block Actions"
                        value={summary.block}
                        color="cyan"
                        isActive={typeFilter === 'block'}
                        onClick={() => setTypeFilter(typeFilter === 'block' ? 'all' : 'block')}
                    />

                    <SummaryCard
                        icon={Shield}
                        label="Isolate Actions"
                        value={summary.isolate}
                        color="orange"
                        isActive={typeFilter === 'isolate'}
                        onClick={() => setTypeFilter(typeFilter === 'isolate' ? 'all' : 'isolate')}
                    />

                </div>
            )}

            {/* Search + Filters */}
            <div className="flex flex-col sm:flex-row gap-4">

                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-800 border border-cyan-500/20 text-gray-200 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-cyan-500/30 outline-none"
                        placeholder="Search by IP or user..."
                    />
                </div>

                <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="bg-slate-800 border border-cyan-500/20 text-gray-200 rounded-lg px-3 py-2"
                >
                    <option value="all">All Types</option>
                    <option value="block">Block</option>
                    <option value="isolate">Isolate</option>
                </select>

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-slate-800 border border-cyan-500/20 text-gray-200 rounded-lg px-3 py-2"
                >
                    <option value="all">All Status</option>
                    <option value="success">Success</option>
                    <option value="failed">Failed</option>
                </select>

            </div>

            {/* Action Rows */}
            <div className="space-y-4">
                {filteredActions.length === 0 ? (
                    <p className="text-gray-400 text-center py-10">No actions found.</p>
                ) : (
                    filteredActions.map(a => (
                        <ActionRow
                            key={a._id}
                            action={a}
                            expanded={expandedAction === a._id}
                            onToggleExpand={(id) =>
                                setExpandedAction(expandedAction === id ? null : id)
                            }
                        />
                    ))
                )}
            </div>

        </div>
    );
}

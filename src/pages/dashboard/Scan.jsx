import React, { useState, useEffect } from 'react';
import {
    Scan, Play, Pause, Square, RefreshCw, Clock,
    Shield, AlertTriangle, CheckCircle, TrendingUp,
    Activity, Network, Server, Eye, Download, Calendar,
    Zap, Target, FileText, Settings, ChevronRight, Radio
} from 'lucide-react';

// Scan Service API (to be implemented later)
const scanService = {
    startScan: async (config) => {
        // TODO: Implement actual API call
        console.log('Starting scan with config:', config);

        // Simulated API call
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    scanId: 'scan_' + Date.now(),
                    message: 'Scan started successfully'
                });
            }, 500);
        });
    },

    getScanStatus: async (scanId) => {
        // TODO: Implement actual API call
        console.log('Getting scan status:', scanId);

        // Simulated API call
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    scanId: scanId,
                    status: 'running',
                    progress: 45,
                    startTime: new Date(Date.now() - 5 * 60 * 1000),
                    estimatedTimeRemaining: 300000,
                    findings: {
                        critical: 2,
                        high: 5,
                        medium: 12,
                        low: 8
                    },
                    currentTarget: '192.168.1.105',
                    scannedHosts: 67,
                    totalHosts: 150
                });
            }, 300);
        });
    },

    stopScan: async (scanId) => {
        // TODO: Implement actual API call
        console.log('Stopping scan:', scanId);
        return Promise.resolve({ success: true });
    },

    getScanHistory: async () => {
        // TODO: Implement actual API call
        console.log('Fetching scan history...');

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    {
                        _id: '1',
                        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
                        duration: 420000,
                        status: 'completed',
                        totalFindings: 27,
                        critical: 2,
                        high: 5,
                        medium: 12,
                        low: 8,
                        scannedHosts: 156
                    },
                    {
                        _id: '2',
                        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
                        duration: 380000,
                        status: 'completed',
                        totalFindings: 15,
                        critical: 0,
                        high: 3,
                        medium: 8,
                        low: 4,
                        scannedHosts: 142
                    },
                    {
                        _id: '3',
                        timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
                        duration: 450000,
                        status: 'completed',
                        totalFindings: 31,
                        critical: 3,
                        high: 7,
                        medium: 15,
                        low: 6,
                        scannedHosts: 168
                    },
                ]);
            }, 600);
        });
    },

    exportScanResults: async (scanId) => {
        // TODO: Implement actual API call
        console.log('Exporting scan results:', scanId);
        return Promise.resolve({ success: true });
    }
};

// Utility functions
const formatDuration = (ms) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
};

const formatTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);

    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
};

// Animated Scan Button Component
const AnimatedScanButton = ({ isScanning, progress, onStart, onStop }) => {
    const size = 280;
    const strokeWidth = 8;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <div className="relative flex items-center justify-center">
            {/* Outer glow rings */}
            {isScanning && (
                <>
                    <div className="absolute w-80 h-80 rounded-full bg-[#6abaca]/5 animate-ping" style={{ animationDuration: '3s' }}></div>
                    <div className="absolute w-96 h-96 rounded-full bg-[#6abaca]/5 animate-ping" style={{ animationDuration: '4s' }}></div>
                </>
            )}

            {/* Progress ring */}
            {isScanning && (
                <svg width={size + 40} height={size + 40} className="absolute">
                    <circle
                        cx={(size + 40) / 2}
                        cy={(size + 40) / 2}
                        r={radius + 20}
                        fill="none"
                        stroke="url(#scanGradient)"
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        className="transition-all duration-500 transform -rotate-90 origin-center"
                        style={{ filter: 'drop-shadow(0 0 10px rgba(106, 186, 202, 0.5))' }}
                    />
                    <defs>
                        <linearGradient id="scanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#6abaca" />
                            <stop offset="100%" stopColor="#7acbdb" />
                        </linearGradient>
                    </defs>
                </svg>
            )}

            {/* Main button */}
            <button
                onClick={isScanning ? onStop : onStart}
                className={`relative z-10 rounded-full transition-all duration-500 ${
                    isScanning
                        ? 'w-64 h-64 bg-gradient-to-br from-slate-800 to-slate-900 border-4 border-red-500/50 hover:border-red-500 shadow-2xl shadow-red-500/20'
                        : 'w-72 h-72 bg-gradient-to-br from-[#6abaca] to-cyan-500 hover:scale-105 shadow-2xl shadow-cyan-500/30'
                }`}
            >
                <div className="flex flex-col items-center justify-center h-full">
                    {isScanning ? (
                        <>
                            <Square className="w-16 h-16 text-red-400 mb-4" />
                            <span className="text-3xl font-bold text-white mb-2">{progress}%</span>
                            <span className="text-sm text-gray-400">Click to Stop</span>
                        </>
                    ) : (
                        <>
                            <div className="relative">
                                <Scan className="w-20 h-20 text-slate-950 mb-4" />
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-slate-950 rounded-full animate-pulse"></div>
                            </div>
                            <span className="text-2xl font-bold text-slate-950">Start Scan</span>
                        </>
                    )}
                </div>
            </button>

            {/* Rotating border when scanning */}
            {isScanning && (
                <div className="absolute w-80 h-80 rounded-full border-2 border-dashed border-[#6abaca]/30 animate-spin" style={{ animationDuration: '20s' }}></div>
            )}
        </div>
    );
};

// Quick Stats Component
const QuickStat = ({ icon: Icon, label, value, color = 'text-[#6abaca]' }) => {
    return (
        <div className="flex items-center gap-3 p-4 bg-slate-900/30 border border-cyan-500/10 rounded-xl">
            <div className={`p-3 rounded-lg bg-slate-800/50`}>
                <Icon className={`w-6 h-6 ${color}`} />
            </div>
            <div>
                <div className={`text-2xl font-bold ${color}`}>{value}</div>
                <div className="text-xs text-gray-500">{label}</div>
            </div>
        </div>
    );
};

// Findings Card Component
const FindingsCard = ({ findings }) => {
    const severityConfig = {
        critical: { color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30' },
        high: { color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/30' },
        medium: { color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' },
        low: { color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' },
    };

    return (
        <div className="grid grid-cols-2 gap-4">
            {Object.entries(findings).map(([severity, count]) => {
                const config = severityConfig[severity];
                return (
                    <div key={severity} className={`p-4 rounded-xl border ${config.bg} ${config.border}`}>
                        <div className={`text-3xl font-bold ${config.color} mb-1`}>{count}</div>
                        <div className="text-sm text-gray-400 capitalize">{severity}</div>
                    </div>
                );
            })}
        </div>
    );
};

// Scan History Item Component
const ScanHistoryItem = ({ scan, onExport }) => {
    const [expanded, setExpanded] = useState(false);

    const statusConfig = {
        completed: { icon: CheckCircle, text: 'Completed', color: 'text-green-400' },
        failed: { icon: CheckCircle, text: 'Failed', color: 'text-red-400' },
        running: { icon: Activity, text: 'Running', color: 'text-[#6abaca]' },
    };

    const StatusIcon = statusConfig[scan.status].icon;

    return (
        <div className="bg-slate-900/30 border border-cyan-500/20 rounded-xl overflow-hidden hover:border-cyan-500/40 transition-all">
            <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
              <span className={`flex items-center gap-2 text-sm font-medium ${statusConfig[scan.status].color}`}>
                <StatusIcon className="w-4 h-4" />
                  {statusConfig[scan.status].text}
              </span>
                            <span className="text-xs text-gray-500">{formatTimeAgo(scan.timestamp)}</span>
                            <span className="px-2 py-1 bg-slate-800 rounded text-xs text-gray-400">
                {formatDuration(scan.duration)}
              </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">
                            <div className="p-3 bg-slate-800/50 rounded-lg">
                                <div className="text-xs text-gray-400 mb-1">Total</div>
                                <div className="text-xl font-bold text-white">{scan.totalFindings}</div>
                            </div>
                            <div className="p-3 bg-red-500/10 rounded-lg">
                                <div className="text-xs text-gray-400 mb-1">Critical</div>
                                <div className="text-xl font-bold text-red-400">{scan.critical}</div>
                            </div>
                            <div className="p-3 bg-orange-500/10 rounded-lg">
                                <div className="text-xs text-gray-400 mb-1">High</div>
                                <div className="text-xl font-bold text-orange-400">{scan.high}</div>
                            </div>
                            <div className="p-3 bg-yellow-500/10 rounded-lg">
                                <div className="text-xs text-gray-400 mb-1">Medium</div>
                                <div className="text-xl font-bold text-yellow-400">{scan.medium}</div>
                            </div>
                            <div className="p-3 bg-blue-500/10 rounded-lg">
                                <div className="text-xs text-gray-400 mb-1">Low</div>
                                <div className="text-xl font-bold text-blue-400">{scan.low}</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <Server className="w-4 h-4" />
                  {scan.scannedHosts} hosts
              </span>
                            <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                                {scan.timestamp.toLocaleDateString()}
              </span>
                        </div>
                    </div>

                    <button
                        onClick={() => onExport(scan._id)}
                        className="px-4 py-2 bg-[#6abaca]/20 border border-[#6abaca]/30 text-[#6abaca] rounded-lg hover:bg-[#6abaca]/30 transition-all flex items-center gap-2 font-medium"
                    >
                        <Download className="w-4 h-4" />
                        Export
                    </button>
                </div>
            </div>
        </div>
    );
};

// Main Scan Page Component
export default function ScanPage() {
    const [isScanning, setIsScanning] = useState(false);
    const [scanStatus, setScanStatus] = useState(null);
    const [scanHistory, setScanHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showSettings, setShowSettings] = useState(false);
    const [config, setConfig] = useState({
        scanType: 'full',
        targetRange: '10.0.0.0/24',
        intensity: 'normal',
        includeVulnScan: true,
        includePortScan: true,
    });

    useEffect(() => {
        loadScanHistory();
    }, []);

    const loadScanHistory = async () => {
        setIsLoading(true);
        try {
            const history = await scanService.getScanHistory();
            setScanHistory(history);
        } catch (error) {
            console.error('Error loading scan history:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleStartScan = async () => {
        try {
            const response = await scanService.startScan(config);
            if (response.success) {
                setIsScanning(true);
                pollScanStatus(response.scanId);
            }
        } catch (error) {
            console.error('Error starting scan:', error);
        }
    };

    const pollScanStatus = async (scanId) => {
        const interval = setInterval(async () => {
            try {
                const status = await scanService.getScanStatus(scanId);
                setScanStatus(status);

                if (status.status === 'completed' || status.status === 'failed') {
                    clearInterval(interval);
                    setIsScanning(false);
                    loadScanHistory();
                }
            } catch (error) {
                console.error('Error polling scan status:', error);
                clearInterval(interval);
                setIsScanning(false);
            }
        }, 3000);
    };

    const handleStopScan = async () => {
        if (scanStatus) {
            try {
                await scanService.stopScan(scanStatus.scanId);
                setIsScanning(false);
                setScanStatus(null);
                loadScanHistory();
            } catch (error) {
                console.error('Error stopping scan:', error);
            }
        }
    };

    const handleExportScan = async (scanId) => {
        try {
            await scanService.exportScanResults(scanId);
            console.log('Export successful');
        } catch (error) {
            console.error('Error exporting scan:', error);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#6abaca] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading scan data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center">
                <h1 className="text-4xl font-bold text-white mb-3">Network Security Scanner</h1>
                <p className="text-gray-400 text-lg">Detect vulnerabilities and threats in real-time</p>
            </div>

            {/* Main Scan Area */}
            <div className="relative">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#6abaca]/5 to-transparent rounded-3xl"></div>

                <div className="relative py-16">
                    {/* Animated Scan Button */}
                    <div className="flex justify-center mb-12">
                        <AnimatedScanButton
                            isScanning={isScanning}
                            progress={scanStatus?.progress || 0}
                            onStart={handleStartScan}
                            onStop={handleStopScan}
                        />
                    </div>

                    {/* Scan Status Info */}
                    {isScanning && scanStatus ? (
                        <div className="max-w-5xl mx-auto space-y-6">
                            {/* Current Status */}
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#6abaca]/20 border border-[#6abaca]/30 rounded-full mb-3">
                                    <Radio className="w-4 h-4 text-[#6abaca] animate-pulse" />
                                    <span className="text-[#6abaca] font-medium">Scanning in progress</span>
                                </div>
                                <div className="text-gray-400 text-sm">
                                    Current target: <span className="text-white font-mono">{scanStatus.currentTarget}</span>
                                </div>
                                <div className="text-gray-500 text-xs mt-1">
                                    {scanStatus.scannedHosts} of {scanStatus.totalHosts} hosts scanned
                                </div>
                            </div>

                            {/* Quick Stats Grid */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                <QuickStat icon={Clock} label="Time Remaining" value={formatDuration(scanStatus.estimatedTimeRemaining)} />
                                <QuickStat icon={Server} label="Hosts Found" value={scanStatus.scannedHosts} />
                                <QuickStat icon={Shield} label="Threats" value={scanStatus.findings.critical + scanStatus.findings.high} color="text-red-400" />
                                <QuickStat icon={Activity} label="Active" value="Live" color="text-green-400" />
                            </div>

                            {/* Findings */}
                            <div className="p-6 bg-slate-900/50 backdrop-blur border border-cyan-500/20 rounded-2xl">
                                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                    <AlertTriangle className="w-5 h-5 text-[#6abaca]" />
                                    Current Findings
                                </h3>
                                <FindingsCard findings={scanStatus.findings} />
                            </div>
                        </div>
                    ) : (
                        <div className="max-w-2xl mx-auto">
                            {/* Quick Settings */}
                            <div className="p-6 bg-slate-900/50 backdrop-blur border border-cyan-500/20 rounded-2xl">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                        <Settings className="w-5 h-5 text-[#6abaca]" />
                                        Quick Settings
                                    </h3>
                                    <button
                                        onClick={() => setShowSettings(!showSettings)}
                                        className="text-[#6abaca] hover:text-cyan-400 text-sm flex items-center gap-1"
                                    >
                                        {showSettings ? 'Hide' : 'Show'} Advanced
                                        <ChevronRight className={`w-4 h-4 transition-transform ${showSettings ? 'rotate-90' : ''}`} />
                                    </button>
                                </div>

                                <div className="grid grid-cols-3 gap-3 mb-4">
                                    {['quick', 'normal', 'full'].map((type) => (
                                        <button
                                            key={type}
                                            onClick={() => setConfig({ ...config, scanType: type })}
                                            className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                                                config.scanType === type
                                                    ? 'bg-[#6abaca] text-slate-950'
                                                    : 'bg-slate-800 text-gray-400 hover:bg-slate-700'
                                            }`}
                                        >
                                            {type.charAt(0).toUpperCase() + type.slice(1)}
                                        </button>
                                    ))}
                                </div>

                                {showSettings && (
                                    <div className="space-y-4 pt-4 border-t border-cyan-500/20">
                                        <input
                                            type="text"
                                            value={config.targetRange}
                                            onChange={(e) => setConfig({ ...config, targetRange: e.target.value })}
                                            placeholder="Target IP Range (e.g., 10.0.0.0/24)"
                                            className="w-full px-4 py-3 bg-slate-800 border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#6abaca]"
                                        />

                                        <select
                                            value={config.intensity}
                                            onChange={(e) => setConfig({ ...config, intensity: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-800 border border-cyan-500/20 rounded-lg text-white focus:outline-none focus:border-[#6abaca]"
                                        >
                                            <option value="low">Low Intensity (Stealth)</option>
                                            <option value="normal">Normal Intensity</option>
                                            <option value="high">High Intensity (Aggressive)</option>
                                        </select>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Scan History */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <FileText className="w-6 h-6 text-[#6abaca]" />
                        Recent Scans
                    </h2>
                    <button
                        onClick={loadScanHistory}
                        className="px-4 py-2 bg-slate-800 border border-cyan-500/20 text-gray-300 rounded-lg hover:bg-slate-700 transition-all flex items-center gap-2"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Refresh
                    </button>
                </div>

                {scanHistory.length === 0 ? (
                    <div className="text-center py-16 bg-slate-900/30 border border-cyan-500/20 rounded-2xl">
                        <Scan className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-400 text-lg">No scan history available</p>
                        <p className="text-gray-500 text-sm mt-2">Start your first scan to see results here</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {scanHistory.map((scan) => (
                            <ScanHistoryItem
                                key={scan._id}
                                scan={scan}
                                onExport={handleExportScan}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
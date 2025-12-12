import React, { useState, useEffect } from 'react';
import {
    Scan, Play, Pause, Square, RefreshCw, Clock,
    Shield, AlertTriangle, CheckCircle, TrendingUp,
    Activity, Network, Server, Eye, Download, Calendar,
    Zap, Target, FileText, Settings, ChevronRight, Radio,
    BarChart3, Cpu, HardDrive, Database, Wifi, ShieldCheck,
    AlertCircle, Check, X, Percent, Gauge, Layers, Cpu as CpuIcon
} from 'lucide-react';
import { api } from "@/services/api.js";

// Scan Service API
export const scanService = {
    startScan: async () => {
        try {
            const { data } = await api.get("/scan");
            return data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },
    
    getScanHistory: async () => {
        try {
            const { data } = await api.get("/scan/history");
            return data;
        } catch (error) {
            console.error('Error fetching scan history:', error);
            return [];
        }
    },
    
    exportScanResults: async (scanId) => {
        try {
            const { data } = await api.get(`/scan/export/${scanId}`);
            return data;
        } catch (error) {
            throw error.response?.data || error;
        }
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
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
};

const formatNumber = (num) => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toFixed(1);
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
                    <div className="absolute w-80 h-80 rounded-full bg-[#6abaca]/10 animate-ping" style={{ animationDuration: '3s' }}></div>
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
                        style={{ filter: 'drop-shadow(0 0 15px rgba(106, 186, 202, 0.3))' }}
                    />
                    <defs>
                        <linearGradient id="scanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#6abaca" />
                            <stop offset="50%" stopColor="#7acbdb" />
                            <stop offset="100%" stopColor="#8de4f5" />
                        </linearGradient>
                    </defs>
                </svg>
            )}

            {/* Main button */}
            <button
                onClick={isScanning ? onStop : onStart}
                disabled={isScanning}
                className={`relative z-10 rounded-full transition-all duration-500 ${
                    isScanning
                        ? 'w-64 h-64 bg-gradient-to-br from-slate-800 to-slate-900 border-4 border-[#6abaca]/50 hover:border-[#6abaca]/70 shadow-2xl shadow-[#6abaca]/20'
                        : 'w-72 h-72 bg-gradient-to-br from-[#6abaca] via-cyan-500 to-[#6abaca] hover:scale-105 shadow-2xl shadow-cyan-500/40 hover:shadow-cyan-500/60'
                }`}
            >
                <div className="flex flex-col items-center justify-center h-full">
                    {isScanning ? (
                        <>
                            <div className="relative mb-4">
                                <CpuIcon className="w-16 h-16 text-white" />
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                            </div>
                            <span className="text-3xl font-bold text-white mb-2">{Math.trunc(progress)}%</span>
                            <span className="text-sm text-gray-300">Analyzing...</span>
                        </>
                    ) : (
                        <>
                            <div className="relative mb-6">
                                <Scan className="w-20 h-20 text-slate-950" />
                                
                            </div>
                            <span className="text-2xl font-bold text-slate-950">Start Security Scan</span>
                            <span className="text-sm text-slate-800/80 mt-1">AI-Powered Threat Detection</span>
                        </>
                    )}
                </div>
            </button>

            {/* Rotating border when scanning */}
            {isScanning && (
                <div className="absolute w-80 h-80 rounded-full border-2 border-dashed border-[#6abaca]/40 animate-spin" style={{ animationDuration: '15s' }}></div>
            )}
        </div>
    );
};

// Prediction Result Card
const PredictionResult = ({ prediction }) => {
    const isBenign = prediction.prediction === "BENIGN";
    
    return (
        <div className={`p-6 rounded-2xl border backdrop-blur-sm ${
            isBenign 
                ? 'bg-gradient-to-br from-green-500/10 to-emerald-500/5 border-green-500/30' 
                : 'bg-gradient-to-br from-red-500/10 to-rose-500/5 border-red-500/30'
        }`}>
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl ${isBenign ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                        {isBenign ? (
                            <ShieldCheck className="w-8 h-8 text-green-400" />
                        ) : (
                            <AlertCircle className="w-8 h-8 text-red-400" />
                        )}
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">Threat Assessment</h3>
                        <p className="text-sm text-gray-400">AI-Powered Analysis</p>
                    </div>
                </div>
                <div className={`px-4 py-2 rounded-lg text-sm font-bold ${
                    isBenign 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}>
                    {prediction.prediction}
                </div>
            </div>
            
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <span className="text-gray-400">Confidence Score</span>
                    <div className="flex items-center gap-2">
                        <div className="w-32 bg-slate-800 rounded-full h-2 overflow-hidden">
                            <div 
                                className={`h-full ${isBenign ? 'bg-green-500' : 'bg-red-500'}`}
                                style={{ width: `${prediction.confidence * 100}%` }}
                            ></div>
                        </div>
                        <span className={`font-bold ${isBenign ? 'text-green-400' : 'text-red-400'}`}>
                            {(prediction.confidence * 100).toFixed(1)}%
                        </span>
                    </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-slate-900/50 rounded-lg">
                        <div className="text-xs text-gray-400 mb-1">Status</div>
                        <div className={`font-bold flex items-center gap-2 ${isBenign ? 'text-green-400' : 'text-red-400'}`}>
                            {isBenign ? (
                                <>
                                    <Check className="w-4 h-4" />
                                    Secure
                                </>
                            ) : (
                                <>
                                    <X className="w-4 h-4" />
                                    Threat Detected
                                </>
                            )}
                        </div>
                    </div>
                    <div className="p-3 bg-slate-900/50 rounded-lg">
                        <div className="text-xs text-gray-400 mb-1">Risk Level</div>
                        <div className={`font-bold ${isBenign ? 'text-green-400' : 'text-red-400'}`}>
                            {isBenign ? 'Low' : 'High'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Feature Category Card
const FeatureCategory = ({ title, icon: Icon, features, color = "text-[#6abaca]" }) => {
    return (
        <div className="p-5 bg-slate-900/50 border border-cyan-500/20 rounded-xl hover:border-cyan-500/40 transition-all hover:shadow-lg hover:shadow-cyan-500/10">
            <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg bg-cyan-500/10 ${color}`}>
                    <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white">{title}</h3>
            </div>
            <div className="space-y-3">
                {Object.entries(features).slice(0, 5).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                        <span className="text-sm text-gray-400 truncate">{key.replace(/([A-Z])/g, ' $1')}</span>
                        <span className="text-sm font-medium text-white font-mono">{formatNumber(value)}</span>
                    </div>
                ))}
                {Object.keys(features).length > 5 && (
                    <div className="text-center pt-2">
                        <span className="text-xs text-cyan-400">+{Object.keys(features).length - 5} more features</span>
                    </div>
                )}
            </div>
        </div>
    );
};

// Quick Stats Component
const QuickStat = ({ icon: Icon, label, value, color = 'text-[#6abaca]', bgColor = 'bg-cyan-500/10' }) => {
    return (
        <div className="p-4 bg-slate-900/30 border border-cyan-500/10 rounded-xl hover:border-cyan-500/30 transition-all group">
            <div className="flex items-center gap-3">
                <div className={`p-3 rounded-lg ${bgColor} group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 ${color}`} />
                </div>
                <div>
                    <div className={`text-2xl font-bold ${color}`}>{value}</div>
                    <div className="text-xs text-gray-500">{label}</div>
                </div>
            </div>
        </div>
    );
};

// Scan History Item Component
const ScanHistoryItem = ({ scan, onExport }) => {
    const isBenign = scan.prediction?.prediction === "BENIGN";
    
    return (
        <div className="bg-slate-900/30 border border-cyan-500/20 rounded-xl overflow-hidden hover:border-cyan-500/40 transition-all hover:shadow-lg hover:shadow-cyan-500/10">
            <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                                isBenign 
                                    ? 'bg-green-500/20 text-green-400' 
                                    : 'bg-red-500/20 text-red-400'
                            }`}>
                                {scan.prediction?.prediction || 'Unknown'}
                            </div>
                            <span className="text-xs text-gray-500">{formatTimeAgo(scan.timestamp)}</span>
                            <span className="px-2 py-1 bg-slate-800 rounded text-xs text-gray-400">
                                {formatDuration(scan.duration || 0)}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                            <div className="p-3 bg-slate-800/50 rounded-lg">
                                <div className="text-xs text-gray-400 mb-1">Confidence</div>
                                <div className="text-xl font-bold text-white">
                                    {scan.prediction?.confidence ? `${(scan.prediction.confidence * 100).toFixed(1)}%` : 'N/A'}
                                </div>
                            </div>
                            <div className="p-3 bg-slate-800/50 rounded-lg">
                                <div className="text-xs text-gray-400 mb-1">Features Analyzed</div>
                                <div className="text-xl font-bold text-[#6abaca]">
                                    {scan.generated_features ? Object.keys(scan.generated_features).length : 0}
                                </div>
                            </div>
                            <div className="p-3 bg-slate-800/50 rounded-lg">
                                <div className="text-xs text-gray-400 mb-1">Status</div>
                                <div className={`text-xl font-bold ${scan.success ? 'text-green-400' : 'text-red-400'}`}>
                                    {scan.success ? 'Success' : 'Failed'}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-400">
                            <span className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {new Date(scan.timestamp).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                {new Date(scan.timestamp).toLocaleTimeString()}
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
    const [scanResult, setScanResult] = useState(null);
    const [scanHistory, setScanHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

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

    const simulateProgress = () => {
        return new Promise((resolve) => {
            let currentProgress = 0;
            const interval = setInterval(() => {
                currentProgress += Math.random() * 15;
                if (currentProgress >= 100) {
                    currentProgress = 100;
                    clearInterval(interval);
                    resolve();
                }
                setProgress(Math.min(currentProgress, 100));
            }, 200);
        });
    };

    const handleStartScan = async () => {
        setIsScanning(true);
        setProgress(0);
        setScanResult(null);
        
        try {
            // Simulate progress
            await simulateProgress();
            
            // Call actual API
            const result = await scanService.startScan();
            setScanResult(result);
            
            // Refresh history
            await loadScanHistory();
        } catch (error) {
            console.error('Error starting scan:', error);
        } finally {
            setIsScanning(false);
            setProgress(0);
        }
    };

    const handleStopScan = () => {
        setIsScanning(false);
        setProgress(0);
    };

    const handleExportScan = async (scanId) => {
        try {
            await scanService.exportScanResults(scanId);
            console.log('Export successful');
        } catch (error) {
            console.error('Error exporting scan:', error);
        }
    };

    // Categorize features
    const categorizeFeatures = (features) => {
        if (!features) return {};
        
        const categories = {
            packetStats: {},
            flowStats: {},
            sizeStats: {},
            connectionStats: {}
        };

        Object.entries(features).forEach(([key, value]) => {
            if (key.includes('Packet') || key.includes('Pkt')) {
                categories.packetStats[key] = value;
            } else if (key.includes('Flow') || key.includes('IAT')) {
                categories.flowStats[key] = value;
            }  else if (key.includes('Size') || key.includes('Length') || key.includes('Bytes')) {
                categories.sizeStats[key] = value;
            } else {
                categories.connectionStats[key] = value;
            }
        });

        return categories;
    };

    const featureCategories = scanResult ? categorizeFeatures(scanResult.generated_features) : {};

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#6abaca] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading security data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                {/* Header */}
                <div className="text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-4">
                        <Shield className="w-4 h-4 text-[#6abaca]" />
                        <span className="text-[#6abaca] text-sm font-semibold">AI-Powered Network Security</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Intelligent <span className="text-[#6abaca]">Threat Detection</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Advanced ML-powered analysis of network traffic patterns to detect anomalies and threats
                    </p>
                </div>

                {/* Main Scan Area */}
                <div className="relative">
                    {/* Background decoration */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#6abaca]/5 via-transparent to-transparent rounded-3xl -z-10"></div>

                    <div className="py-12">
                        {/* Animated Scan Button */}
                        <div className="flex justify-center mb-12">
                            <AnimatedScanButton
                                isScanning={isScanning}
                                progress={progress}
                                onStart={handleStartScan}
                                onStop={handleStopScan}
                            />
                        </div>

                        {/* Scan Results */}
                        {scanResult && (
                            <div className="space-y-8 animate-fadeIn">
                                {/* Prediction Result */}
                                <div className="max-w-3xl mx-auto">
                                    <PredictionResult prediction={scanResult.prediction} />
                                </div>

                                {/* Quick Stats */}
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                    <QuickStat 
                                        icon={BarChart3} 
                                        label="Features Analyzed" 
                                        value={Object.keys(scanResult.generated_features || {}).length} 
                                    />
                                    <QuickStat 
                                        icon={Percent} 
                                        label="Confidence" 
                                        value={`${(scanResult.prediction.confidence * 100).toFixed(1)}%`}
                                        color={scanResult.prediction.prediction === "BENIGN" ? "text-green-400" : "text-red-400"}
                                        bgColor={scanResult.prediction.prediction === "BENIGN" ? "bg-green-500/10" : "bg-red-500/10"}
                                    />
                                    <QuickStat 
                                        icon={Gauge} 
                                        label="Risk Level" 
                                        value={scanResult.prediction.prediction === "BENIGN" ? "Low" : "High"}
                                        color={scanResult.prediction.prediction === "BENIGN" ? "text-green-400" : "text-red-400"}
                                        bgColor={scanResult.prediction.prediction === "BENIGN" ? "bg-green-500/10" : "bg-red-500/10"}
                                    />
                                    <QuickStat 
                                        icon={CheckCircle} 
                                        label="Status" 
                                        value="Complete"
                                        color="text-green-400"
                                        bgColor="bg-green-500/10"
                                    />
                                </div>

                                {/* Feature Analysis */}
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                            <Layers className="w-6 h-6 text-[#6abaca]" />
                                            Feature Analysis
                                        </h2>
                                        <span className="text-sm text-gray-400">
                                            {Object.keys(scanResult.generated_features || {}).length} parameters analyzed
                                        </span>
                                    </div>

                                    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-4">
                                        {Object.entries(featureCategories).map(([category, features]) => (
                                            <FeatureCategory
                                                key={category}
                                                title={category.charAt(0).toUpperCase() + category.slice(1).replace('Stats', ' Statistics')}
                                                icon={category.includes('packet') ? HardDrive : 
                                                      category.includes('flow') ? Network :
                                                      category.includes('size') ? Database : Cpu}
                                                features={features}
                                            />
                                        ))}
                                    </div>

                                    {/* Detailed Features Table */}
                                    <div className="bg-slate-900/50 border border-cyan-500/20 rounded-xl overflow-hidden">
                                        <div className="p-5 border-b border-cyan-500/20">
                                            <h3 className="font-bold text-white flex items-center gap-2">
                                                <Database className="w-5 h-5 text-[#6abaca]" />
                                                Detailed Feature Values
                                            </h3>
                                        </div>
                                        <div className="max-h-96 overflow-y-auto">
                                            <table className="w-full">
                                                <thead className="bg-slate-800/50">
                                                    <tr>
                                                        <th className="text-left p-4 text-sm text-gray-400 font-medium">Feature Name</th>
                                                        <th className="text-left p-4 text-sm text-gray-400 font-medium">Value</th>
                                                        <th className="text-left p-4 text-sm text-gray-400 font-medium">Unit</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Object.entries(scanResult.generated_features || {}).slice(0, 20).map(([key, value], index) => (
                                                        <tr key={key} className={index % 2 === 0 ? 'bg-slate-900/30' : ''}>
                                                            <td className="p-4 text-sm text-gray-300 font-mono">{key}</td>
                                                            <td className="p-4">
                                                                <span className="text-sm font-medium text-white">{formatNumber(value)}</span>
                                                            </td>
                                                            <td className="p-4 text-sm text-gray-500">units</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Scan in Progress */}
                        {isScanning && !scanResult && (
                            <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn">
                                <div className="text-center">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#6abaca]/20 border border-[#6abaca]/30 rounded-full mb-3">
                                        <Activity className="w-4 h-4 text-[#6abaca] animate-pulse" />
                                        <span className="text-[#6abaca] font-medium">Analyzing Network Traffic</span>
                                    </div>
                                    <p className="text-gray-400">
                                        AI model is analyzing {Math.floor(progress * 2.5)} network features...
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                    <QuickStat icon={Activity} label="Processing" value={`${Math.trunc(progress)}%`} />
                                    <QuickStat icon={Cpu} label="AI Analysis" value="Active" color="text-green-400" bgColor="bg-green-500/10" />
                                    <QuickStat icon={Database} label="Data Points" value={Math.floor(progress * 3)} />
                                    <QuickStat icon={Clock} label="ETA" value="< 10s" />
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
                            Scan History
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
        </div>
    );
}


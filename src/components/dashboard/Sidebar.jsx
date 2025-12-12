import React from "react";
import {
    Shield, LayoutDashboard, AlertTriangle, FileText, Activity,
    Scan, User, LogOut, X
} from 'lucide-react';

export const Sidebar = ({ currentPage, setCurrentPage, sidebarOpen, setSidebarOpen }) => {
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

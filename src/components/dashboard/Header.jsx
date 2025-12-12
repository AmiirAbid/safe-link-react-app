import { User, Menu } from 'lucide-react';
import React from "react";

export const Header = ({ sidebarOpen, setSidebarOpen }) => {
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

import React, {useState} from "react";
import {Sidebar} from "@/components/dashboard/Sidebar.jsx";
import {Header} from "@/components/dashboard/Header.jsx";
import DashboardPage from "@/pages/dashboard/Dashboard.jsx";
import AlertsPage from "@/pages/dashboard/Alerts.jsx";
import LogsPage from "@/pages/dashboard/Logs.jsx";
import ActionsPage from "@/pages/dashboard/Actions.jsx";
import ScanPage from "@/pages/dashboard/Scan.jsx";

export default function DashboardLayout() {
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
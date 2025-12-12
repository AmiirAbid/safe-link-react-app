import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import DashboardLayout from "@/layouts/DashboardLayout.jsx";
import AnimatedBackground from "@/components/AnimatedBackground.jsx";
import React from "react";

function App() {
    return (
        <Router>
            <Routes>
                {/* Public Pages */}
                <Route path="/" element={
                    <MainLayout></MainLayout>
                }>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/auth" element={<Auth/>}/>

                    {/* 404 Page */}
                    <Route path="*" element={
                        <div className="relative min-h-screen bg-slate-950 text-white flex justify-center items-center">
                            <AnimatedBackground />
                            <main className="relative z-10">
                                <h1 className="text-4xl md:text-5xl font-bold text-primary">Page not found</h1>
                            </main>
                        </div>
                    }/>
                </Route>

                {/* Example: Protected or other pages */}
                <Route path="/dashboard" element={<DashboardLayout/>}/>
            </Routes>
        </Router>
    );
}

export default App;

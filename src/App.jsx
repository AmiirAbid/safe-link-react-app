import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
// import Dashboard from "./pages/Dashboard";

function App() {
    return (
        <Router>
            <Routes>
                {/* Public Pages */}
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />} />

                {/* Example: Protected or other pages */}
                {/*<Route path="/dashboard" element={<Dashboard />} />*/}

                {/* 404 Page */}
                <Route path="*" element={<h1>Page not found</h1>} />
            </Routes>
        </Router>
    );
}

export default App;

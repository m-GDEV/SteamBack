import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

export default function App() {
    return (
        <div className="bg-slate-900 min-h-screen font-silkscreen" id="app">
            <Navbar />
            <div className="flex justify-center mt-24">
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </div>
        </div>
    );
}

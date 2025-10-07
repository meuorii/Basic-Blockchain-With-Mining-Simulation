import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider, useAuth } from "./context/AuthContext";

// 🔒 Protected Route Wrapper
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-neutral-950 text-gray-200 font-sans">
          {/* ✅ Navbar */}
          <Navbar />

          {/* ✅ Main Container */}
          <main className="max-w-6xl mx-auto px-4 py-8">
            <Routes>
              {/* Protected Mining Page */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                }
              />

              {/* Public Pages */}
              <Route path="/about" element={<AboutPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Redirect unknown routes */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* ✅ Footer */}
          <footer className="text-center text-gray-500 py-6 text-sm border-t border-white/10">
            © {new Date().getFullYear()} Basic Blockchain System with Mining Simulation
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { YogaProvider } from './context/YogaContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Classes from './pages/Classes';
import PoseLibrary from './pages/PoseLibrary';
import WorkoutSession from './pages/WorkoutSession';
import Trainers from './pages/Trainers';
import Blog from './pages/Blog';
import BlogPostDetail from './pages/BlogPostDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact';
import Membership from './pages/Membership';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function AppContent() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-stone-900 bg-white">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/poses" element={<PoseLibrary />} />
          <Route path="/trainers" element={<Trainers />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPostDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/workout/:id" 
            element={
              <ProtectedRoute>
                <WorkoutSession />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <YogaProvider>
        <Router>
          <AppContent />
        </Router>
      </YogaProvider>
    </AuthProvider>
  );
}

import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { YogaProvider } from './context/YogaContext';
import { AnimatePresence, motion } from 'framer-motion';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AIAssistant from './components/AIAssistant';

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home'));
const Classes = lazy(() => import('./pages/Classes'));
const PoseLibrary = lazy(() => import('./pages/PoseLibrary'));
const WorkoutSession = lazy(() => import('./pages/WorkoutSession'));
const Trainers = lazy(() => import('./pages/Trainers'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPostDetail = lazy(() => import('./pages/BlogPostDetail'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Contact = lazy(() => import('./pages/Contact'));
const Membership = lazy(() => import('./pages/Membership'));

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) return null;
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

function AppContent() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col font-sans text-stone-900 bg-white selection:bg-primary-100 selection:text-primary-900 relative overflow-hidden">
      {/* Immersive Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="atmosphere absolute inset-0" />
      </div>
      
      <div className="relative z-10 flex flex-col flex-grow">
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center bg-stone-50">
            <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
          </div>
        }>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
              <Route path="/classes" element={<PageWrapper><Classes /></PageWrapper>} />
              <Route path="/poses" element={<PageWrapper><PoseLibrary /></PageWrapper>} />
              <Route path="/trainers" element={<PageWrapper><Trainers /></PageWrapper>} />
              <Route path="/blog" element={<PageWrapper><Blog /></PageWrapper>} />
              <Route path="/blog/:id" element={<PageWrapper><BlogPostDetail /></PageWrapper>} />
              <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
              <Route path="/membership" element={<PageWrapper><Membership /></PageWrapper>} />
              <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
              <Route path="/signup" element={<PageWrapper><Signup /></PageWrapper>} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <PageWrapper><Dashboard /></PageWrapper>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/workout/:id" 
                element={
                  <ProtectedRoute>
                    <PageWrapper><WorkoutSession /></PageWrapper>
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>
      <Footer />
      <AIAssistant />
      </div>
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

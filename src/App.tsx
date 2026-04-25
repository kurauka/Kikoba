import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';

// Pages
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Chamas from './pages/Chamas';
import Contributions from './pages/Contributions';
import Merrigo from './pages/Merrigo';
import Advisor from './pages/Advisor';
import Loans from './pages/Loans';
import Savings from './pages/Savings';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Layout>{children}</Layout>;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/chamas" 
            element={
              <PrivateRoute>
                <Chamas />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/contributions" 
            element={
              <PrivateRoute>
                <Contributions />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/merrigo" 
            element={
              <PrivateRoute>
                <Merrigo />
              </PrivateRoute>
            } 
          />
           <Route 
            path="/advisor" 
            element={
              <PrivateRoute>
                <Advisor />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/loans" 
            element={
              <PrivateRoute>
                <Loans />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/savings" 
            element={
              <PrivateRoute>
                <Savings />
              </PrivateRoute>
            } 
          />
          {/* Fallback for routes not yet implemented */}
          <Route 
            path="*" 
            element={
              <PrivateRoute>
                <div className="p-8 text-center bg-white rounded-3xl border border-dashed border-slate-200">
                  <h2 className="text-xl font-bold text-slate-800">Page Under Construction</h2>
                  <p className="text-slate-500 mt-2">We are currently building this feature. Please check back soon!</p>
                </div>
              </PrivateRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

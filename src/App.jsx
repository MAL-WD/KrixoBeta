import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import ContactPage from './ContactPage';
import HireUsPage from './HireUsPage';
import AdminPanel from './AdminPanel';
import WorkerProfile from './WorkerProfile';
import ErrorPage from './components/ErrorPage';
import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <ErrorBoundary>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/HireUs" element={<HireUsPage />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          } />
          <Route path="/worker/:id" element={<WorkerProfile />} />
          <Route path="/login" element={<WorkerProfile />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<ErrorPage />} />
      </Routes>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
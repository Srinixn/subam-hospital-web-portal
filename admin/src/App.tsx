import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Contacts from './pages/Contacts';
import Feedbacks from './pages/Feedbacks';
import Jobs from './pages/Jobs';
import ChatTickets from './pages/ChatTickets';
import FAQManager from './pages/FAQManager';
import AuditLog from './pages/AuditLog';

function App() {
  return (
    <AuthProvider>
      <Router basename="/admin">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/feedbacks" element={<Feedbacks />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/chat-tickets" element={<ChatTickets />} />
            <Route path="/faq-manager" element={<FAQManager />} />
            <Route path="/audit-logs" element={<AuditLog />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Global Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Homepage Sections
import Hero from './components/Hero';
import ExploreServices from './components/ExploreServices';
import ReviewSection from './components/ReviewSection';

// Authentication Pages
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';

// Category Pages
import PremiumSection from './components/PremiumSection';
import DevelopmentPage from './components/DevelopmentPage';
import DesignPage from './components/DesignPage';
import MarketingAndSales from './components/MarketingAndSales';
import AIServices from './components/AIServices';
import EngineeringPage from './components/EngineeringPage';
import ProfilePage from './components/ProfilePage';
import ClientProjectForm from './components/ClientProjectForm';

// Internationalization
import './i18n';
import CategoryProjectList from './components/CategoryProjectList';
import ChatPage from './components/ChatPage';
import ApplicationForm from './components/ApplicationForm';
import ClientChatList from './components/ClientChatList';
import FreelancerChatList from './components/FreelancerChatList';
import ClientProjectList from './components/ClientProjectList';

// Reads localStorage fresh every time this route is actually visited,
// instead of once when the App component first mounted.
function ChatListRoute() {
  const userRole = localStorage.getItem('userRole');

  if (userRole === 'CLIENT') return <ClientChatList />;
  if (userRole === 'FREELANCER') return <FreelancerChatList />;
  return <Navigate to="/login" replace />;
}

// Same fix for the profile route — email is read at render time now.
function ProfileRoute() {
  const email = localStorage.getItem('userEmail');
  return <ProfilePage email={email} />;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page Route */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Hero />
              <ExploreServices />
              <ReviewSection />
              <Footer />
            </>
          }
        />

        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Service Routes */}
        <Route path="/premium" element={<PremiumSection />} />
        <Route path="/explore" element={<ExploreServices />} />
        <Route path="/development" element={<DevelopmentPage />} />
        <Route path="/design" element={<DesignPage />} />
        <Route path="/market" element={<MarketingAndSales />} />
        <Route path="/aiservices" element={<AIServices />} />
        <Route path="/engineer" element={<EngineeringPage />} />
        <Route path="/clientpro" element={<ClientProjectForm />} />
        <Route path="/category" element={<CategoryProjectList />} />
        <Route path="/profile" element={<ProfileRoute />} />
        <Route path="/apply/:projectId" element={<ApplicationForm />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/chatlist" element={<ChatListRoute />} />
        <Route path="/myprojects" element={<ClientProjectList />} />
      </Routes>
    </Router>
  );
}

export default App;
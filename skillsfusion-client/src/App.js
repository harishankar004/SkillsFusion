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
// chatInteface
//  ChatBox from './components/ChatBox';

// Internationalization
import './i18n';
import CategoryProjectList from './components/CategoryProjectList';
import ChatPage from './components/ChatPage';
import ApplicationForm from './components/ApplicationForm';
import ClientChatList from './components/ClientChatList';
import FreelancerChatList from './components/FreelancerChatList';
import ClientProjectList from './components/ClientProjectList';

function App() {
  return (
    <Router>
      {/* <Navbar /> */}

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
        <Route path="/profile" element={<ProfilePage email={localStorage.getItem("userEmail")}/>} />
        <Route path="/apply/:projectId" element={<ApplicationForm />} />
        <Route path="/chat" element={<ChatPage />} />
 <Route
          path="/chatlist"
          element={
            localStorage.getItem('userRole') === 'CLIENT' ? (
              <ClientChatList />
            ) : localStorage.getItem('userRole') === 'FREELANCER' ? (
              <FreelancerChatList />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/myprojects" element={<ClientProjectList />} />
        {/* <Route path="/chat" element={<ChatBox senderId="1" receiverId="2" />} /> */}



      </Routes>
    </Router>
  );
}

export default App;



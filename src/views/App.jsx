import { useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import TopNav from "../components/TopNav";
import Welcom from "./Home/Welcom";
import WelcomConnect from "./Home/WelcomConnect";
import SearchSection from "./Home/SearchSection";
import HowItWorks from "./Home/HowItWorks";
import LastSignalement from "./Home/LastSignalement";
import Footer from "../components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Connection/Login";
import FormSignal from "./FormSignal";
import Signalements from "./Signalements/Signalements";
import SignalementDetails from "./Signalements/SignalementDetails";
import { useAuth } from "../context/AuthContext";
import StartupPage from "../components/StartupPage";
import ProtectedRoute from "../components/ProtectedRoute";

import ChatWidget from "../components/ChatWidget";

// Admin imports
import AdminLogin from "./Admin/AdminLogin";
import AdminLayout from "./Admin/AdminLayout";
import Dashboard from "./Admin/Dashboard";
import AdminSignalements from "./Admin/AdminSignalements";
import AdminUsers from "./Admin/AdminUsers";
import AdminAnalytics from "./Admin/AdminAnalytics";
import AdminSettings from "./Admin/AdminSettings";
import AdminMessages from "./Admin/AdminMessages";

function App() {
  const { user } = useAuth();
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <StartupPage onComplete={() => setShowSplash(false)} />;
  }

  return (
    <BrowserRouter>
      <CssBaseline />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <TopNav />
              <Box sx={{ pt: { xs: "70px", md: "90px" } }}>
                {user ? <WelcomConnect /> : <Welcom />}
                <SearchSection />
                <HowItWorks />
                <LastSignalement />
                <Footer />
              </Box>
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signaler" element={<FormSignal />} />
        <Route path="/signalements" element={<Signalements />} />
        <Route path="/signalements/:id" element={<SignalementDetails />} />

        {/* Admin Routes - SÉCURITÉ ACTIVÉE */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute isAdmin={true} />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="signalements" element={<AdminSignalements />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="messages" element={<AdminMessages />} />
          </Route>
        </Route>
      </Routes>
      {user && !user.admin && <ChatWidget />}
    </BrowserRouter>
  );
}

export default App;

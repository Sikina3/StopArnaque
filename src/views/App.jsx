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

function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <CssBaseline />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <TopNav />
              <Box>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;

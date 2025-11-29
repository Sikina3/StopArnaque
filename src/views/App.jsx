import { Box, CssBaseline } from "@mui/material";
import TopNav from "../components/TopNav";
import Welcom from "./Home/Welcom";
import SearchSection from "./Home/SearchSection";
import HowItWorks from "./Home/HowItWorks";
import LastSignalement from "./Home/LastSignalement";
import Footer from "../components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Connection/Login";
import FormSignal from "./FormSignal";

function App() {
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
                <Welcom />
                <SearchSection />
                <HowItWorks />
                <LastSignalement />
                <Footer />
              </Box>
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signaler" element={<FormSignal /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

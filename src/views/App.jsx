import { Box, CssBaseline } from "@mui/material"
import TopNav from "../components/TopNav"
import Welcom from "./Home/Welcom";
import SearchSection from "./Home/SearchSection";
import HowItWorks from "./Home/HowItWorks";
import LastSignalement from "./Home/LastSignalement";
import Footer from "../components/Footer";

function App(){
    return( 
        <Box>
            <CssBaseline />
            <TopNav />

            <Box>
                <Welcom />
                <SearchSection />
                <HowItWorks />
                <LastSignalement />
                <Footer />
            </Box>
        </Box>
    );
}

export default App;
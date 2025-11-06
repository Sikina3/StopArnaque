import { Box, CssBaseline } from "@mui/material"
import TopNav from "../components/TopNav"
import Welcom from "./Home/Welcom";
import SearchSection from "./Home/SearchSection";
import HowItWorks from "./Home/HowItWorks";
import LastSignalement from "./Home/LastSignalement";

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
                <Box sx={{ height: "100vh", backgroundColor: "#b3b3b3", width: "100%" }}></Box>
            </Box>
        </Box>
    );
}

export default App;
import { Box, CssBaseline } from "@mui/material"
import TopNav from "../components/TopNav"
import Welcom from "./Home/Welcom";
import SearchSection from "./Home/SearchSection";
import HowItWorks from "./Home/HowItWorks";

function App(){
    return(
        <Box>
            <CssBaseline />
            <TopNav />

            <Box>
                <Welcom />
                <SearchSection />
                <HowItWorks />
                <Box sx={{ height: "100vh", backgroundColor: "#cccccc", width: "100%" }}></Box>
                <Box sx={{ height: "100vh", backgroundColor: "#b3b3b3", width: "100%" }}></Box>
            </Box>
        </Box>
    );
}

export default App;
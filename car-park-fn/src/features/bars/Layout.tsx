import { Box, CssBaseline } from "@mui/material";
import Sidebar from "./Sidebar";
import Collapse from "./Collapse";
import Navbar from "./Navbar";

export interface AuxProps {
  children: React.ReactNode;
}

const Layout = ({ children }: AuxProps) => {
  return (
    <>
      <Collapse />
      <Box sx={{ display: "flex" }} className="contentBackground">
        <CssBaseline />
        <Navbar />
        <Sidebar />
        {/* content */}
        <Box className="contentContainer">
          {children}
        </Box>
      </Box>
    </>
  );
};

export default Layout;

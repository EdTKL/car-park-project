import { Box, CssBaseline, Grid } from "@mui/material"
import Sidebar from "./Sidebar"
import Collapse from "./Collapse"
import Navbar from "./Navbar"

export interface AuxProps  { 
    children: React.ReactNode
 }


const Layout = ({ children }: AuxProps) => {
  return (
    <>
     <Collapse />
      <Box sx={{ display: 'flex' }}  className="contentBackground">
        <CssBaseline />
        <Navbar />
        <Sidebar />
      {/* content */}
        <Box sx={{ margin: 0}} className="contentContainer">
            <Grid container sx={{ margin: 0 }} className='home-container container-fluid d-flex flex-column justify-content-center align-items-center'>
                { children }
            </Grid>
        </Box>
      </Box>
    </>
  )
}

export default Layout

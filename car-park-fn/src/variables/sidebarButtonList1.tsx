import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LocalParkingOutlinedIcon from '@mui/icons-material/LocalParkingOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import { SidebarButton } from '../features/models';


const sidebarButtonList1: Array<SidebarButton> = [
  {"key": "homepage", linkTo: "/home", icon: <HomeOutlinedIcon />, primary: "主頁" },
  {"key": "parkedVehicle", linkTo: "/parking", icon: <LocalParkingOutlinedIcon />, primary: "停泊車輛" },
  {"key": "editRecord", linkTo: "/edit", icon: <EditNoteOutlinedIcon />, primary: "編輯紀錄" },
  {"key": "statistics", linkTo: "/stat", icon: <BarChartOutlinedIcon />, primary: "統計數據" }
]
export default sidebarButtonList1

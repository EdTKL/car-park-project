import HandymanOutlinedIcon from '@mui/icons-material/HandymanOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { SidebarButton } from '../features/models';


const sidebarButtonList2: Array<SidebarButton> = [
  {"key": "setting", linkTo: "/setting", icon: <HandymanOutlinedIcon />, primary: "設定" },
  {"key": "logout", linkTo: "/logout", icon: <LogoutOutlinedIcon />, primary: "登出" }
]
export default sidebarButtonList2

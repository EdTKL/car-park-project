import * as React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { setWidth } from "./navSideSlice";
import "./Collapse.scss";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const Collapse = () => {
    const dispatch = useDispatch();
    const open = useSelector((state: RootState)=> { return state.drawerState.open});
    return (
        <>
        {open ? <button className="fabExpanded" onClick={() => dispatch(setWidth())}><KeyboardArrowLeftIcon /></button> : 
                <button className="fabClosed" onClick={() => dispatch(setWidth())}><KeyboardArrowRightIcon /></button>
        }
        </>
    )
}

export default Collapse
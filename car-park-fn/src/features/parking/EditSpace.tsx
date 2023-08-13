import React, { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { RootState } from "../../app/store";
import { IconButton, Input, Stack, SvgIconProps, TextField, Typography } from "@mui/material";
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import AirportShuttleOutlinedIcon from '@mui/icons-material/AirportShuttleOutlined';
import MopedOutlinedIcon from '@mui/icons-material/MopedOutlined';

// import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { ParkingState, edit_Space, parkingSlice } from "./spaceSlice";
import "./EditSpace.scss"
import { FitnessCenter } from "@mui/icons-material";

export function EditSpace() {
    const dispatch = useAppDispatch();

    const editSpaceList = useAppSelector((state: RootState) => state.spaceState.space);

    const smSpace = editSpaceList[0].smCarSpace
    const mdSpace = editSpaceList[0].mdCarSpace
    const mtSpace = editSpaceList[0].motoSpace
    const ttSpace = editSpaceList[0].totalSpace

    // const [smSpaceNum, setSmSpaceNum] = useState(smSpace);
    // const [mdSpaceNum, setMdSpaceNum] = useState(mdSpace);
    // const [mtSpaceNum, setMtSpaceNum] = useState(mtSpace);
    // const [ttSpaceNum, setTtSpaceNum] = useState(ttSpace);

    function createRow(carType: string, qty: number, reducer: `smCarSpace` | `mdCarSpace` | `motoSpace`, id: number, icon: React.ReactElement<SvgIconProps>) {
        return { carType, qty, reducer, id, icon };
    }

    const rows = [
        createRow('小型車', smSpace, "smCarSpace", 0, <DirectionsCarFilledOutlinedIcon />),
        createRow('中型車', mdSpace, "mdCarSpace", 1, <AirportShuttleOutlinedIcon />),
        createRow('電單車', mtSpace, "motoSpace", 2, <MopedOutlinedIcon />),
    ];

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        // <div className="edit-space-container">
            <form onSubmit={submitHandler} className="edit-space-form">

                <TableContainer className="edit-table-container" component={Paper} elevation={3} sx={{ overflow: 'hidden', height: "100%" }}  style={{height: "100%"}}>
                    <Table sx={{ maxWidth: 500 }} aria-label="spanning table">
                        <TableHead>
                            <div className="edit-space-title">
                                <Typography variant="h5" sx={{ color: 'success.main', fontWeight: 700, marginTop: "5px", marginLeft: "5px" }}>
                                    <>編輯車位</>
                                </Typography>
                            </div>
                            <TableRow className="edit-space-header" >

                                <TableCell className="edit-space-header-content">
                                    <Typography variant="h6" sx={{ color: '#FFFFFF', fontWeight: 700 }}>
                                        車型
                                    </Typography>
                                </TableCell>
                                <TableCell className="edit-space-header-content" align="right">
                                    <Typography variant="h6" sx={{ color: '#FFFFFF', fontWeight: 700 }}>
                                        車位
                                    </Typography>
                                </TableCell>

                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {rows.map((row) => (
                                <TableRow className="edit-space-content" key={row.carType}>
                                    <TableCell>
                                        <div className="carIcon">
                                            {row.icon}
                                            <Typography variant="subtitle1" sx={{ color: 'info.main', fontWeight: 700, marginBottom: "10px" }}>
                                                {row.carType}
                                            </Typography>
                                        </div>
                                    </TableCell>
                                    <TableCell align="right">
                                        <TextField
                                            id="outlined-number"
                                            label={row.carType}
                                            type="number"
                                            defaultValue={row.qty}
                                            // value={row.qty}

                                            onChange={(e) => dispatch(edit_Space({ id: row.id, key: row.reducer, value: parseInt(e.target.value) }))}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                        <TableCell className="total-display" >
                            <TextField
                                id="outlined-number"
                                label="總車位（尚餘）"
                                type="number"
                                disabled defaultValue={ttSpace}
                                variant="filled"
                            />
                        </TableCell>
                    </Table>

                </TableContainer>
                <div className="submit-button">
                    <Stack direction="row" spacing={2} id="login-button-container">
                        <IconButton aria-label="login" id="login-button" type="submit" value="submit" >
                            <EditNoteIcon />
                        </IconButton>
                    </Stack>
                </div>
            </form>

        // </div>
    )

}

export default EditSpace;
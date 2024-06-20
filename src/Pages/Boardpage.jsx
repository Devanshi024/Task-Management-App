import React, { useContext } from 'react';
import "../Css/Boardpage.css";
import { Grid } from '@mui/material';
import { userData } from '../Context/dashboard-context';
import "../Css/NewTaskPopup.css";
import DonePage from './DonePage';
import ProgressPage from './ProgressPage';
import NotStartedPage from './NotStartedPage';

function Boardpage() {
    const { state } = useContext(userData);

    return (
        <>
            <Grid container justifyContent="center" style={{ height: "100%" }}>
                <Grid item xs={12} style={{ width: "100vw" }}>
                    <Grid container style={{ gap: "5px" }}>
                        <DonePage />
                        <ProgressPage />
                        <NotStartedPage />
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default Boardpage;
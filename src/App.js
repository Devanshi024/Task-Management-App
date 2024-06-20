import React, { useState } from 'react';
import "./App.css";
import { UserDataProvider } from "./Context/dashboard-context";
import SideBar from './Pages/SideBar';
import MainPage from './Pages/MainPage';
import { Grid } from '@mui/material';

function App() {
    const [active, setActive] = useState('Table');

    return (
        <>
            <Grid container display="flex" flexDirection="row">
                <UserDataProvider>
                    <Grid item xs={2}>
                        <SideBar setActive={setActive} active={active}/>
                    </Grid>
                    <Grid item xs={10}>
                        <MainPage active={active} setActive={setActive} />
                    </Grid>
                </UserDataProvider>
            </Grid>
        </>
    );
}

export default App;

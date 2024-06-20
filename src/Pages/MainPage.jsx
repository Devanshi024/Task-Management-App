import React, { useContext, useState, useEffect } from 'react';
import "../Css/MainPage.css";
import SubHeader from './SubHeader';
import Header from "./Header";
import { Divider, Grid } from '@mui/material';
import TablePage from './TablePage';
import { userData } from "../Context/dashboard-context";
import AddPage from './AddPage';
import Boardpage from './Boardpage';

function MainPage({ active, setActive }) {
    const { state, colNameToHide, setColNameToHide } = useContext(userData);
    const [flagDeleteOpen, setFlagDeleteOpen] = useState(false);
    const [anchorElDelete, setAnchorElDelete] = useState(null);
    const [localColNameToHide, setLocalColNameToHide] = useState({ ...colNameToHide });

    const handleDeletePopup = (event) => {
        setAnchorElDelete(event.currentTarget);
        setFlagDeleteOpen(true);
    };

    const handleClose = () => {
        setAnchorElDelete(null);
        setFlagDeleteOpen(false);
    };

    const handleSaveColumns = () => {
        setColNameToHide(localColNameToHide);
    };

    const renderPage = () => {
        switch (active) {
            case 'Table':
                return (
                    <TablePage 
                        flagDeleteOpen={flagDeleteOpen}
                        setFlagDeleteOpen={setFlagDeleteOpen}
                        anchorElDelete={anchorElDelete}
                        handleClose={handleClose}
                        handleSaveColumns={handleSaveColumns}
                        setLocalColNameToHide={setLocalColNameToHide}
                        localColNameToHide={localColNameToHide}
                    />
                );
            case 'Board':
                return <Boardpage />;
            case 'Add':
                return <AddPage />;
            default:
                return <TablePage />;
        }
    };

    useEffect(() => {
        console.log("localColNameToHide from mainState", localColNameToHide);
    }, [localColNameToHide]);

    return (
        <>
            <Grid container className='mainpage-container'>
                <Grid item xs={11.5} className='main-page-center-item'>
                    <Grid container style={{ margin: '0 auto', alignItems: "center", justifyContent: 'center' }}>
                        <Grid item xs={12}>
                            <Header />
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                            <SubHeader 
                                setActive={setActive} 
                                active={active} 
                                handleSaveColumns={handleSaveColumns} 
                                setLocalColNameToHide={setLocalColNameToHide} 
                                localColNameToHide={localColNameToHide} 
                            />
                        </Grid>
                        <Grid item xs={12}>
                            {renderPage()}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default MainPage;

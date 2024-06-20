import React from 'react';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Typography, Box } from '@mui/material';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import TableRowsOutlinedIcon from '@mui/icons-material/TableRowsOutlined';
import dp_picture from "../assests/dp_picture.jpg";

const SideBar = ({ setActive, active }) => {
    return (
        <Box
            height="100vh"
            sx={{
                "& .pro-sidebar-inner": {
                    background: "#232842 !important",
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important",
                },
                "& .pro-inner-item:hover": {
                    color: "#868dfb !important",
                },
                "& .pro-menu-item.active": {
                    color: "#6870fa !important",
                },
                "& .pro-sub-menu .pro-inner-item": {
                    background: "#232842 !important",
                },
            }}
        >
            <ProSidebar>
                <Box mb="25px" mt="25px">
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <img
                            alt="profile-user"
                            width="100px"
                            height="100px"
                            src={dp_picture}
                            style={{ cursor: "pointer", borderRadius: "50%" }}
                        />
                    </Box>
                    <Box textAlign="center">
                        <Typography
                            variant="h2"
                            fontWeight="bold"
                            sx={{ m: "10px 0 0 0", fontSize: '1.5rem' }}
                        >
                            Octavia Anderson
                        </Typography>
                        <Typography
                            variant="h5"
                            sx={{ fontSize: '1rem' }}
                        >
                            VI Fancy Admin
                        </Typography>
                    </Box>
                </Box>
                <Menu iconShape="square">
                    <Typography
                        variant="h6"
                        color="#a3a3a3"
                        sx={{ m: "15px 0 5px 20px" }}
                    >
                        Tasks
                    </Typography>
                    <MenuItem 
                        icon={<TableRowsOutlinedIcon />} 
                        active={active === 'Table'} 
                        onClick={() => setActive('Table')}
                    >
                        <Typography variant="body1" sx={{ fontSize: '1rem' }}>
                            Tables
                        </Typography>
                    </MenuItem>
                    <MenuItem 
                        icon={<TableChartOutlinedIcon />} 
                        active={active === 'Board'} 
                        onClick={() => setActive('Board')}
                    >
                        <Typography variant="body1" sx={{ fontSize: '1rem' }}>
                            Board
                        </Typography>
                    </MenuItem>
                </Menu>
            </ProSidebar>
        </Box>
    );
}

export default SideBar;

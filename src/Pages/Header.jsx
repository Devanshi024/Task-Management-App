import React from 'react'
import "../Css/Header.css"
import { Grid, Badge, Typography } from '@mui/material'
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import dp_picture from "../assests/dp_picture.jpg"
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

function Header() {
    return (
        <>
            <Grid container className='header-container' xs={12}>
                <Grid item>
                    <h2>Tasks</h2>
                </Grid>
                <Grid item>
                    <Grid container className='header-notification-profile-container'>
                        <Grid item>
                            <Badge badgeContent={11} color="primary" className='header-badge'>
                                <NotificationsNoneRoundedIcon color="action" className='header-notification-style' />
                            </Badge>
                        </Grid>
                        <Grid item className='header-profile-name'>
                            <div className='profile-pic-div'>
                                <img src={dp_picture} className='image-style' />
                            </div>
                            <Typography variant="subtitle2">Octavia Anderson</Typography>
                            <KeyboardArrowDownRoundedIcon />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default Header
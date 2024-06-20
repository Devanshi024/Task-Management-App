import React, { useContext } from 'react';
import "../Css/Boardpage.css";
import { Grid } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import { userData } from '../Context/dashboard-context';
import "../Css/NewTaskPopup.css";
import Typography from '@mui/material/Typography';

function DonePage() {
    const { state } = useContext(userData);
    return (
        <>
            <Grid item xs={3.95} className='header-status-name-style-item-done' style={{ height: "100%" }}>
                <Grid container className='main-done-container'>
                    <Grid item>
                        <Grid container>
                            <Grid item className='item-count-status-style'>
                                <Grid container className='item-count-container-style' >
                                    <Grid item className="span-icon-item">
                                        <DoneIcon style={{ color: "green" }} />
                                        <span style={{ color: "green", fontFamily: "Lucida Grande", fontSize: "18px" }}> Done</span>
                                    </Grid>
                                    <Grid item className='number-count-item-done'>
                                        {state.dataTask.filter(task => task.status === 1).length}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        {state.dataTask.filter(task => task.status === 1).map((task) => (
                            <Grid container key={task.id} className="main-container-task" style={{ display: "flex", flexDirection: "column", padding: "10px" }}>
                                <Grid item className="item-count-status-style">
                                    <Grid container alignItems="center" style={{ justifyContent: "space-between" }}>
                                        <Grid item style={{ display: "flex", alignItems: "center", width: "70%" }}>
                                            <Typography variant="subtitle1" fontWeight="bold">
                                                {task.task_name}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            {task.priority === 1 ? (
                                                <div className="priority-div-style-high">High</div>
                                            ) : task.priority === 2 ? (
                                                <div className="priority-div-style-medium ">Medium</div>
                                            ) : (
                                                <div className="priority-div-style-low">Low</div>
                                            )}
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item style={{ display: "flex", flexDirection: "row", marginTop: "8px" }}>
                                    {state.dataEmployees.map((emp, id) => {
                                        if (task.assigned_employees.includes(emp.id)) {
                                            return (
                                                <div className='name-img-people-dropdown' key={id}>
                                                    <div className='nameletter-style'>
                                                        <img src={emp.image} className='img-style-assigned' alt={`${emp.name}'s profile`} />
                                                    </div>
                                                </div>
                                            );
                                        }
                                    })}
                                </Grid>
                                <Grid item>
                                    <Typography variant="body2" color="textSecondary" style={{ marginTop: 8 }}>
                                        {task.start_date} - {task.end_date}
                                    </Typography>
                                </Grid>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>

        </>
    )
}

export default DonePage
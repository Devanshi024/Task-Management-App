import React, { useContext } from 'react';
import "../Css/Boardpage.css";
import { Grid } from '@mui/material';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import { userData } from '../Context/dashboard-context';
import "../Css/NewTaskPopup.css";
import Typography from '@mui/material/Typography';



function ProgressPage() {
    const { state } = useContext(userData);
    return (
        <>
            <Grid item xs={3.95} className='header-status-name-style-item-progress' style={{ height: "100%" }}>
                <Grid container className='main-done-container'>
                    <Grid item>
                        <Grid container>
                            <Grid item className='item-count-status-style'>
                                <Grid container className='item-count-container-style'>
                                    <Grid item className="span-icon-item">
                                        <RotateRightIcon style={{ color: "#3e53a9" }} />
                                        <span style={{ color: "#3e53a9", fontFamily: "Lucida Grande", fontSize: "15px" }}>In Progress</span>
                                    </Grid>
                                    <Grid item className='number-count-item-progress'>
                                        {state.dataTask.filter(task => task.status === 3).length}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        {state.dataTask.filter(task => task.status === 3).map((task) => (
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
                                            ) : task.priority === 3 ? (
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
                                                <div className='name-img-people-dropdown'>
                                                    <div className='nameletter-style' key={emp}>
                                                        <img src={emp.image} className='img-style-assigned'></img>
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

export default ProgressPage
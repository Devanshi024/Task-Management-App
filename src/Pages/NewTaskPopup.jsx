import React, { useContext, useState, useEffect } from 'react';
import { Box, Grid, OutlinedInput, Typography } from '@mui/material';
import "../Css/NewTaskPopup.css";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { Button } from '@mui/material';
import { userData } from "../Context/dashboard-context";
import DoneIcon from '@mui/icons-material/Done';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import UpdateDisabledIcon from '@mui/icons-material/UpdateDisabled';
import Chip from '@mui/material/Chip';
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment';
import { TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function NewTaskPopup({ flagSetOpen }) {
    const { state, setData, addTask } = useContext(userData);
    const [addTaskObj, setAddtask] = useState({
        "id": Math.floor(Math.random() * 1000),
        "task_name": null,
        "task_comment": null,
        "assigned_employees": [],
        "status": null,
        "priority": null,
        "start_date": null,
        "end_date": null,
        "flag_show": true,
        "flag_checked": false
    });

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const handleUpdate = (field, value) => {
        setAddtask(prevData => ({
            ...prevData,
            [field]: value
        }));
    }

    const handleDateChange = (name, date) => {
        setAddtask({
            ...addTaskObj,
            [name]: date,
        });
    };

    const handleEmployeeSelect = (event) => {
        const { value } = event.target;
        console.log("value", value);
        const ids = value.map(val => val.id);
        console.log("ids", ids);
        setAddtask(prevData => ({
            ...prevData,
            assigned_employees: ids,
        }));
    };

    const handleDelete = (chipToDelete) => {
        const filterdata = addTaskObj.assigned_employees.filter(id => id !== chipToDelete)
        setAddtask((prev) => ({
            ...prev,
            assigned_employees: filterdata
        }));
    };

    useEffect(() => {
        // debugger;
        console.log("addTask", addTask);
        console.log("state", state.dataTask);
        console.log("state assigned", addTaskObj.start_date);
        console.log("state assigned", addTaskObj.end_date);

    }, [addTask, state.dataTask]);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid container xs={11} style={{ margin: "0 auto" }}>
                <Grid item xs={11.5} className="header-main-item">
                    <Grid container className='newtask-header-container'>
                        <Grid item>
                            <h2 className='all-header-popup-span'>New Task</h2>
                        </Grid>
                        <Grid item>
                            <CloseOutlinedIcon style={{ color: "#494f60", cursor: "pointer" }} onClick={() => {
                                flagSetOpen(false)
                            }} />
                        </Grid>
                    </Grid>
                    <Grid item xs={11.5}>
                        <Grid container className='addtask-input-container'>
                            <Grid item>
                                <span className='all-header-popup-span'>Task Name</span>
                            </Grid>
                            <Grid item>
                                <input placeholder='ex: Team Meeting' value={addTaskObj.task_name} onChange={(e) => { handleUpdate("task_name", e.target.value) }}></input>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={11.5}>
                        <Grid container className='addtask-input-container'>
                            <Grid item>
                                <span className='all-header-popup-span'>People</span>
                            </Grid>
                            <Grid item className='people-dropdown-item'>
                                <Grid container className='people-container-style' alignItems={'center'}>
                                    <Grid item><PersonOutlineOutlinedIcon style={{ color: "#858585" }} /></Grid>
                                    <Grid item>
                                        <Select
                                            multiple
                                            className='select-style-dropdown'
                                            labelId="demo-multiple-chip-label"
                                            id="demo-multiple-chip"
                                            input={<OutlinedInput label="Name" />}
                                            sx={{
                                                width: '24vw',
                                                border: 0,
                                                outline: 'none',
                                                color: "#858585",
                                                '& .MuiSelect-select': {
                                                    padding: '8px 14px',
                                                },
                                                ".MuiOutlinedInput-notchedOutline": { border: 0 },
                                                "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                                                    border: 0,
                                                },
                                                "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                    border: 0,
                                                },
                                            }}
                                            value={state.dataEmployees.filter(emp => addTaskObj.assigned_employees.includes(emp.id))}
                                            onChange={handleEmployeeSelect}
                                            renderValue={(selected) => (
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                    {selected.map((value) => (
                                                        <Chip
                                                            className="chip-style-person"
                                                            variant="outlined"
                                                            key={value.id}
                                                            label={value.first_name + ' ' + value.last_name}
                                                            avatar={<img className='style-avatar-person' src={value.image} alt={value.first_name + ' ' + value.last_name} />}
                                                            onDelete={() => handleDelete(value.id)}
                                                            deleteIcon={<CloseIcon className='close-person-icon' onMouseDown={(event) => event.stopPropagation()} />}
                                                        />
                                                    ))}
                                                </Box>
                                            )}
                                            MenuProps={MenuProps}
                                        >
                                            {state.dataEmployees.map((emp) => (
                                                <MenuItem key={emp.id} value={emp}>
                                                    <div className='name-img-people-dropdown'>
                                                        <div className='nameletter-style'>
                                                            <img src={emp.image} className='img-style-assigned'></img>
                                                        </div>
                                                        <Typography variant='subtitle1'>{emp.first_name + " " + emp.last_name}</Typography>
                                                    </div>
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={11.5}>
                        <Grid container>
                            <Grid item xs={6}>
                                <Grid container>
                                    <Grid item>
                                        <span className='all-header-popup-span'>Status</span>
                                    </Grid>
                                    <Grid item style={{ padding: '20px 0px' }}>
                                        <Select
                                            className='select-style-dropdown'
                                            sx={{
                                                width: '13vw',
                                                height: 35,
                                                border: '1px solid #e7e7e7 ',
                                                outline: 'none',
                                                color: "#858585",
                                                '& .MuiSelect-select': {
                                                    padding: '8px 14px',
                                                },
                                                ".MuiOutlinedInput-notchedOutline": { border: 0 },
                                                "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                                                {
                                                    border: '1px solid #e7e7e7 ',
                                                },
                                                "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                                                {
                                                    border: '1px solid #e7e7e7 ',
                                                },
                                            }}
                                            value={addTaskObj.status}
                                            onChange={(e) => { handleUpdate("status", e.target.value) }}
                                            defaultValue={1}
                                        >
                                            {state.dataStatus.map((status, id) => {
                                                return (
                                                    <MenuItem key={id} value={status.id}>
                                                        {status.status === "done" ?
                                                            (
                                                                <div className='status-style-popup'>
                                                                    <DoneIcon style={{ color: "green" }} />
                                                                    <span style={{ color: "green", fontFamily: "Lucida Grande", fontSize: "15px" }}>Done</span>
                                                                </div>
                                                            ) :
                                                            status.status === "not started" ? (
                                                                <div className='status-style-popup'>
                                                                    <UpdateDisabledIcon style={{ color: "grey" }} />
                                                                    <span style={{ color: "grey", fontFamily: "Lucida Grande", fontSize: "15px" }}>Not Started</span>
                                                                </div>
                                                            ) : (
                                                                <div className='status-style-popup'>
                                                                    <RotateRightIcon style={{ color: "#3e53a9" }} />
                                                                    <span style={{ color: "#3e53a9", fontFamily: "Lucida Grande", fontSize: "15px" }}>In Progress</span>
                                                                </div>
                                                            )
                                                        }
                                                    </MenuItem>
                                                );
                                            })}
                                        </Select>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid container>
                                    <Grid item>
                                        <span className='all-header-popup-span'>Priority</span>
                                    </Grid>
                                    <Grid item style={{ padding: '20px 0px' }}>
                                        <Select
                                            className='select-style-dropdown'
                                            sx={{
                                                width: '13vw',
                                                height: 35,
                                                border: '1px solid #e7e7e7 ',
                                                outline: 'none',
                                                color: "#858585",
                                                '& .MuiSelect-select': {
                                                    padding: '8px 14px',
                                                },
                                                ".MuiOutlinedInput-notchedOutline": { border: 0 },
                                                "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                                                {
                                                    border: '1px solid #e7e7e7 ',
                                                },
                                                "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                                                {
                                                    border: '1px solid #e7e7e7 ',
                                                },
                                            }}
                                            defaultValue={1}
                                            value={addTaskObj.priority}
                                            onChange={(e) => { handleUpdate("priority", e.target.value) }}
                                        >
                                            {state.dataPriority.map((prio, id) => {
                                                return (
                                                    <MenuItem key={id} value={prio.id}>
                                                        {prio.priority === "high" ?
                                                            (
                                                                <div className='prio-div-style-high'>
                                                                    High
                                                                </div>
                                                            ) :
                                                            prio.priority === "medium" ? (
                                                                <div className='prio-div-style-medium'>
                                                                    Medium
                                                                </div>
                                                            ) : (
                                                                <div className='prio-div-style-low'>
                                                                    Low
                                                                </div>
                                                            )
                                                        }
                                                    </MenuItem>
                                                );
                                            })}
                                        </Select>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={11.5}>
                        <Grid container style={{ gap: "10px", width: "100%" }}>
                            <Grid item xs={5.5} style={{ width: "100%" }}>
                                <Grid container>
                                    <Grid item>
                                        <span className='all-header-popup-span'>Start</span>
                                    </Grid>
                                    <Grid item style={{ padding: '20px 0px' }}>
                                        <DatePicker
                                            label="Start Date"
                                            value={addTaskObj.start_date}
                                            onChange={(date) => {
                                                handleDateChange("start_date", date);
                                            }}
                                            startDate={addTaskObj.start_date}
                                            dateFormat={"yyyy-MMM-dd"}
                                            slotProps={{
                                                textField: {
                                                    sx: {
                                                        '& .MuiOutlinedInput-root': {
                                                            '& fieldset': {
                                                                border: '1px solid #e7e7e7 ',
                                                            },
                                                            '&:hover fieldset': {
                                                                border: '1px solid #e7e7e7 ',
                                                            },
                                                            '&.Mui-focused fieldset': {
                                                                border: '1px solid #e7e7e7 ',
                                                            },
                                                        },
                                                    },
                                                },
                                            }}
                                            renderInput={(params) => <TextField {...params} />
                                            }
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={5.5} style={{ width: "100%" }}>
                                <Grid container style={{ width: "100%" }}>
                                    <Grid item>
                                        <span className='all-header-popup-span'>End</span>
                                    </Grid>
                                    <Grid item style={{ padding: '20px 0px' }}>
                                        <DatePicker
                                            label="End Date"
                                            value={addTaskObj.end_date}
                                            onChange={(date) => {
                                                handleDateChange("end_date", date);
                                            }}
                                            // format="yyyy-MM-dd"
                                            slotProps={{

                                                textField: {
                                                    sx: {
                                                        '& .MuiOutlinedInput-root': {
                                                            '& fieldset': {
                                                                border: '1px solid #e7e7e7 ',
                                                            },
                                                            '&:hover fieldset': {
                                                                border: '1px solid #e7e7e7 ',
                                                            },
                                                            '&.Mui-focused fieldset': {
                                                                border: '1px solid #e7e7e7 ',
                                                            },
                                                        },
                                                    },
                                                },
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={11.5} style={{ width: "100%" }}>
                        <Grid container className='cancel-add-button-container'>
                            <Grid item>
                                <Button className="button-style-popup" style={{ color: "black" }} onClick={() => {
                                    flagSetOpen(false)
                                }}>Cancel</Button>
                            </Grid>
                            <Grid item>
                                <Button className="button-style-popup" variant="contained" onClick={() => {
                                    addTask({ ...addTaskObj, start_date: dayjs(addTaskObj.start_date).format('YYYY-MM-DD'), end_date: dayjs(addTaskObj.end_date).format('YYYY-MM-DD') });
                                    flagSetOpen(false)
                                }}>Add task</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </LocalizationProvider>
    );
}

export default NewTaskPopup;

import React, { useContext, useState, useEffect } from 'react';
import { Divider, Grid } from '@mui/material';
import "../Css/TablePage.css";
import Select from '@mui/material/Select';
import { Checkbox } from '@mui/material';
import { userData } from "../Context/dashboard-context";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DoneIcon from '@mui/icons-material/Done';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import UpdateDisabledIcon from '@mui/icons-material/UpdateDisabled';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import SwapVertOutlinedIcon from '@mui/icons-material/SwapVertOutlined';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Typography } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import ListItemIcon from '@mui/material/ListItemIcon';
import SouthIcon from '@mui/icons-material/South';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import VisibilityIcon from '@mui/icons-material/Visibility';
import moment from 'moment';


function TablePage() {
    const { state, setData, colNameToHide, setColNameToHide } = useContext(userData);
    const [dataDuplicate, setDataDuplicate] = useState([])

    const [flaghideColumn, flagSetHideColumn] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null)
    const [anchorColumnEl, setAnchorElColumn] = useState(false)//hide sort anchorEL
    const [openMenus, setOpenMenus] = useState({})// opening the menu for Rename
    const [editTask, setEditTask] = useState({
        id: null,
        task_name: ''
    });
    const [editedTaskName, setEditedTaskName] = useState("");
    const [flagHideSingleColumn, flagSetHideSingleColumn] = useState(false);
    const [columnNameEdit, setColumnNameEdit] = useState('')
    const [nextColumn, setNextColumn] = useState({
        id: '',
        colName: ''
    });
    const [selectedElement, setSelectedElement] = useState('')
    const [localColNameToHide, setLocalColNameToHide] = useState(colNameToHide)

    // Rename Handle popup Open
    const handleOpenMenu = (id, event) => {
        setAnchorEl(event.currentTarget)
        setOpenMenus(prevState => ({
            ...prevState,
            [id]: true
        }));
    };

    // Rename Handle popup Close
    const handleCloseMenu = (id) => {
        setAnchorEl(null)
        setOpenMenus(prevState => ({
            ...prevState,
            [id]: false
        }));
    };

    const handleCloseColumn = () => {
        flagSetHideColumn(false);
    };

    const handleCheckBoxChange = (id, event) => {
        console.log("statusChange dataduplicate id", id)
        flagSetHideColumn(true)
        let storeData = state.dataTask.map((dt) => {
            if (dt.id === id) {
                return {
                    ...dt,
                    flag_checked: !dt.flag_checked,
                }
            } else {
                return {
                    ...dt
                }
            }
        });
        setData(storeData)
        const storeFilteredData = storeData.filter((dt) => dt.flag_checked)
        // const storeFilteredDatafalse = storeData.filter((dt) => !dt.flag_checked)
        // if (storeFilteredDatafalse) {
        //     console.log("storeFilteredDatafalse", storeFilteredDatafalse)
        // }
        setDataDuplicate(storeFilteredData);
    }

    const handlePopupStatus = (value) => {
        setSelectedElement(value);
        const statusChange = state.dataTask.map((task) => {
            if (task.flag_checked) {
                return { ...task, status: value };
            }
            return task;
        });
        setDataDuplicate(statusChange);
        console.log("statusChange", statusChange)

    }
    const handleSave = () => {
        setData(dataDuplicate)
    }

    // When Rename User can be ABLE TO EDIT TASK 
    const handleRename = (dt) => {
        setEditTask({
            id: dt.id,
        });
        setEditedTaskName(dt.task_name);
        const result = getKeyValue()
        const keyResult = result.key
        const getNextColumn = Object.keys(colNameToHide).find(key => key === keyResult)
        setNextColumn({
            id: dt.id,
            colName: getNextColumn
        });
    }

    // Get the Next Column with true :Rename
    const getKeyValue = () => {
        for (const [key, value] of Object.entries(colNameToHide)) {
            if (value === true && key !== "task_name") {
                return { key, value }
            }
        }
    }

    // Getting the new value on Rename
    const handleEditTaskNameChange = (event) => {
        setEditedTaskName(event.target.value);
    };

    // Handle Updated Edited Task on Save button : Rename
    const handleEditTask = () => {
        const updatedTasks = state.dataTask.map((task) => {
            if (task.id === editTask.id) {
                return {
                    ...task,
                    task_name: editedTaskName
                };
            }
            return task;
        });
        setData(updatedTasks);
        setEditTask({ id: null });
        setEditedTaskName("");
        setNextColumn({
            id: null,
            colName: null
        });
    };

    // Handle Delete : STATUS & DELETE BOTTOM POPUP
    const handleDelete = () => {
        let statusChange = state.dataTask.filter((staDt) => !staDt.flag_checked);
        setData(statusChange);
    }

    // handleClick of Sort & Hide Single Column : HIDE & SORT
    const handleClickColumn = (columnName) => (event) => {
        setAnchorElColumn(event.currentTarget);
        setColumnNameEdit(columnName)
        flagSetHideSingleColumn(true);
    };

    // HandleClose of Sort & Hide Single Column  : HIDE & SORT
    const handleCloseSortHide = () => {
        setAnchorElColumn(null);
        setColumnNameEdit('')
        flagSetHideSingleColumn(false);
    };

    // Handle Hide Column  : HIDE & SORT
    const handleHideColumn = () => {
        debugger;
        console.log("inisde handelhide")
        setColNameToHide(prev => ({
            ...prev,
            [columnNameEdit]: !prev[columnNameEdit]
        }));
        // handleSaveColumns();
        // setColNameToHide(localColNameToHide)
        handleCloseSortHide();
    }

    // Ascending and Descending Sorting Popup : HIDE & SORT
    const handleSort = (columnName) => {
        console.log("inside handleSort")
        // const sortedDate = state?.dataTask?.sort((a, b) => {
        //     debugger;
        //     let dataA = new Date(a.start_date);
        //     let dataB = new Date(b.start_date);
        //     return "asc" === columnName ? dataA - dataB : dataB - dataA;
        // });

        const sortedTAsk = [...state.dataTask].sort((a, b) => {
            console.log("a.task_name, b.task_name", a.task_name, b.task_name)
            if (a[columnNameEdit] === null || a[columnNameEdit] === "Invalid Date" || a[columnNameEdit] === b[columnNameEdit]) {
                return 1;
            }
            if (b[columnNameEdit] === null || b[columnNameEdit] === "Invalid Date") {
                return -1;
            }
            // if (a[columnNameEdit] === b[columnNameEdit]) {
            //     return 0;
            // }
            return columnName === "asc" ? a[columnNameEdit] < b[columnNameEdit] ? -1 : 1 : a[columnNameEdit] < b[columnNameEdit] ? 1 : -1
            // if (columnName === "asc") {
            //     if (a[columnNameEdit] > b[columnNameEdit]) {
            //         console.log("val 1 in retunr", 1)
            //     }
            //     else {
            //         if (a[columnNameEdit] === null || a[columnNameEdit] === "Invalid Date") {
            //             return 1;
            //         }
            //         if (b[columnNameEdit] === null || b[columnNameEdit] === "Invalid Date") {
            //             return -1;
            //         }
            //         if (a[columnNameEdit] === b[columnNameEdit]) {
            //             return 0;
            //         }
            //         return a[columnNameEdit] < b[columnNameEdit] ? -1 : 1
            //     }
            // } else {
            //     if (a[columnNameEdit] === null || a[columnNameEdit] === "Invalid Date") {
            //         return 1;
            //     }
            //     if (b[columnNameEdit] === null || b[columnNameEdit] === "Invalid Date") {
            //         return -1;
            //     }
            //     if (a[columnNameEdit] === b[columnNameEdit]) {
            //         return 0;
            //     }
            //     return a[columnNameEdit] < b[columnNameEdit] ? 1 : -1
            // }
        })
        // setDataDuplicate(sortedTAsk)
        console.log("sortedTAsk", sortedTAsk)
        setData(sortedTAsk);
        handleCloseSortHide();
    };

    // const arr = [5, 1, 3, "", 6, 18, null, 20, 2, 5, 3, 4, 9];
    // const sortedArr = arr.sort((a, b) => {
    //     // return a < b ? -1 : 1
    //     if (a < b) {
    //         console.log("sortedArr return 1", -1)
    //         return 1;
    //     }
    //     if (a >= b) {
    //         console.log("sortedArr return -1", 1)
    //         return -1;
    //     }
    //     // if (a === b) {
    //     //     console.log("sortedArr return 0,", 0)
    //     //     return 1;
    //     // }
    // })
    // console.log("sortedArr", sortedArr)
    useEffect(() => {
        console.log("colNameToHide", colNameToHide)
        console.log("editTask", editTask)
        console.log("editTask new value of id task after edit value", state.dataTask)
        console.log("statusChange storeFilteredData setDataDuplicateeee", state.dataTask.filter(dt => dt.flag_checked.length))
        console.log("dataDuplicate", dataDuplicate)
        console.log("selectedElement", selectedElement)
        console.log("localColNameToHide from tablePage", localColNameToHide);
        console.log("localColNameToHide colNameToHide from tablePage", colNameToHide);
    }, [dataDuplicate, state, editTask, colNameToHide, selectedElement, localColNameToHide])


    return (
        <>
            <Grid container>
                <Grid item>
                    <div>
                        <table className='tablepage-table-style '>
                            <thead>
                                <tr>
                                    <th className='th-style td-header-style table-td-border-radius-top-left ' style={{ textAlign: "left" }}><Checkbox /></th>
                                    {colNameToHide.task_name &&
                                        <th className='th-style td-header-style' onClick={handleClickColumn('task_name')}>Task Name </th>}
                                    {colNameToHide.assigned &&
                                        <th className='th-style td-header-style' onClick={handleClickColumn('assigned')}>
                                            {nextColumn.colName === 'assigned' ? <> Assigned</> : <>Assigned</>}
                                        </th>}
                                    {colNameToHide.status &&
                                        <th className='th-style td-header-style' onClick={handleClickColumn('status')}>
                                            {nextColumn.colName === 'status' ? <>Status</> : <>Status</>}
                                        </th>
                                    }
                                    {colNameToHide.priority &&
                                        <th className='th-style td-header-style' onClick={handleClickColumn('priority')}>
                                            {nextColumn.colName === 'priority' ? <>Priority</> : <>Priority</>}
                                        </th>
                                    }
                                    {colNameToHide.start_date &&
                                        <th className='th-style td-header-style' onClick={handleClickColumn('start_date')}>
                                            {nextColumn.colName === 'start_date' ?
                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                    Start Date<SwapVertOutlinedIcon style={{ color: "#a2a9c5" }} />
                                                </div>
                                                :
                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                    Start Date<SwapVertOutlinedIcon style={{ color: "#a2a9c5" }} />
                                                </div>
                                            }
                                        </th>}
                                    {colNameToHide.end_date &&
                                        <th className='th-style td-header-style' onClick={handleClickColumn('start_date')}>
                                            {nextColumn.colName === 'end_date' ?
                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                    End_Date<SwapVertOutlinedIcon style={{ color: "#a2a9c5" }} />
                                                </div>
                                                :
                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                    End_Date<SwapVertOutlinedIcon style={{ color: "#a2a9c5" }} />
                                                </div>
                                            }
                                        </th>}

                                    <th className='th-style td-header-style table-td-border-radius-top-right'></th>
                                    <Menu
                                        elevation={2}
                                        anchorEl={anchorColumnEl}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={flagHideSingleColumn}
                                        onClose={handleCloseSortHide}
                                    >
                                        <MenuItem onClick={() => { handleSort("asc") }}>
                                            <ListItemIcon>
                                                <ArrowUpwardIcon style={{ color: "#303b53" }} />
                                            </ListItemIcon>
                                            <Typography variant="inherit">Ascending Sort</Typography>
                                        </MenuItem>
                                        <MenuItem onClick={() => { handleSort("des") }}>
                                            <ListItemIcon>
                                                <SouthIcon style={{ color: "#303b53" }} />
                                            </ListItemIcon>
                                            <Typography variant="inherit">Descending Sort</Typography>
                                        </MenuItem>
                                        <Divider />
                                        <MenuItem onClick={handleHideColumn}>
                                            <ListItemIcon>
                                                <VisibilityIcon style={{ color: "#303b53" }} />
                                            </ListItemIcon>
                                            <div>
                                                <Typography variant="inherit">Hide Column</Typography>
                                            </div>
                                        </MenuItem>
                                    </Menu>
                                </tr>
                            </thead>
                            {state.dataTask?.length > 0 ?
                                state.dataTask?.length > 0 && (
                                    <tbody>
                                        {state.dataTask.map((dt, dataID) => {
                                            if (dt.flag_show) {
                                                return (
                                                    <tr key={dataID}>
                                                        <td className='td-style'><Checkbox checked={dt.flag_checked} onChange={(event) => handleCheckBoxChange(dt.id, event)} /></td>
                                                        {colNameToHide.task_name && (
                                                            <td className='td-style'>
                                                                {editTask.id === dt.id ? (
                                                                    <div className='td-edit-style'>
                                                                        <input
                                                                            type="text"
                                                                            value={editedTaskName}
                                                                            onChange={handleEditTaskNameChange} // Handle input changes
                                                                        />
                                                                    </div>
                                                                ) : (
                                                                    <>
                                                                        {dt.task_comment ? (
                                                                            <>
                                                                                {dt.task_name}
                                                                                <Tooltip title={dt.task_comment}>
                                                                                    <IconButton>
                                                                                        <TextsmsOutlinedIcon style={{ color: "#969dbd" }} />
                                                                                    </IconButton>
                                                                                </Tooltip>
                                                                            </>
                                                                        ) : (
                                                                            dt.task_name
                                                                        )}
                                                                    </>
                                                                )}
                                                            </td>
                                                        )}
                                                        {colNameToHide.assigned &&
                                                            (nextColumn.colName === 'assigned' && nextColumn.id === dt.id ?
                                                                <td className='td-style'>
                                                                    <button className='button-save-delete-popup' onClick={() => { handleEditTask() }}>Save</button>
                                                                </td> :
                                                                <td className='td-style'>
                                                                    <Grid container style={{ display: "flex", flexDirection: "row", overflow: "auto", gap: "px" }}>
                                                                        {dt.assigned_employees && dt.assigned_employees.length > 0 && dt.assigned_employees.map((assEmp, taskID) => {
                                                                            let employeeStore = []
                                                                            let employeeData = state.dataEmployees.find((de) => { return de.id === assEmp })
                                                                            employeeStore.push(employeeData.image)
                                                                            if (taskID < 2) {
                                                                                return (
                                                                                    <>
                                                                                        {employeeStore.map((es) => (
                                                                                            <div className='nameletter-style' key={es}>
                                                                                                <img src={es} className='img-style-assigned user'></img>
                                                                                            </div>
                                                                                        ))}

                                                                                    </>
                                                                                )
                                                                            } else if (taskID === 2) {
                                                                                return (
                                                                                    <>
                                                                                        {employeeStore.map((es) => (
                                                                                            <div className='nameletter-style' key={es}>
                                                                                                +
                                                                                            </div>
                                                                                        ))}

                                                                                    </>
                                                                                )
                                                                            }
                                                                        })}
                                                                    </Grid>
                                                                </td>
                                                            )
                                                        }
                                                        {
                                                            colNameToHide.status && <td className='td-style'>
                                                                {nextColumn.colName === 'status' && nextColumn.id === dt.id ?
                                                                    <button className='button-save-delete-popup' onClick={() => { handleEditTask() }}>Save</button> : (state.dataStatus && state.dataStatus.length > 0 && state.dataStatus.map((emp) => {
                                                                        if (emp.id === dt.status) {
                                                                            if (emp.status === "done") {
                                                                                return (
                                                                                    <div className='status-style-div'>
                                                                                        <DoneIcon style={{ color: "green" }} />
                                                                                        <span style={{ color: "green" }}>Done</span>
                                                                                    </div>
                                                                                )
                                                                            } else if (emp.status === "not started") {
                                                                                return (
                                                                                    <div className='status-style-div'>
                                                                                        <UpdateDisabledIcon style={{ color: "grey" }} />
                                                                                        <span style={{ color: "grey" }}>Not Started</span>
                                                                                    </div>
                                                                                )
                                                                            } else {
                                                                                return (
                                                                                    <div className='status-style-div'>
                                                                                        <RotateRightIcon style={{ color: "#3e53a9" }} />
                                                                                        <span style={{ color: "#3e53a9" }}>In Progress</span>
                                                                                    </div>
                                                                                )
                                                                            }
                                                                        }
                                                                    }))}
                                                            </td>
                                                        }
                                                        {
                                                            colNameToHide.priority && <td className='td-style'>
                                                                {nextColumn.colName === "priority" && nextColumn.id === dt.id ?
                                                                    <button className='button-save-delete-popup' onClick={() => { handleEditTask() }}>Save</button> : (state.dataPriority && state.dataPriority.length > 0 && state.dataPriority.map((emp) => {
                                                                        if (emp.id === dt.priority) {
                                                                            if (emp.priority === "high") {
                                                                                return (
                                                                                    <div className='priority-div-style-high'>
                                                                                        High
                                                                                    </div>
                                                                                )
                                                                            } else if (emp.priority === "medium") {
                                                                                return (
                                                                                    <div className='priority-div-style-medium'>
                                                                                        Medium
                                                                                    </div>
                                                                                )
                                                                            } else {
                                                                                return (
                                                                                    <div className='priority-div-style-low '>
                                                                                        Low
                                                                                    </div>
                                                                                )
                                                                            }
                                                                        }
                                                                    }))}
                                                            </td>
                                                        }
                                                        {
                                                            colNameToHide.start_date && <td className='td-style'>
                                                                {nextColumn.colName === 'start_date' && nextColumn.id === dt.id ? <button className='button-save-delete-popup' onClick={() => { handleEditTask() }}>Save</button> : dt.start_date}
                                                            </td>
                                                        }
                                                        {
                                                            colNameToHide.end_date && <td className='td-style'>
                                                                {nextColumn.colName === 'end_date' && nextColumn.id === dt.id ? <button className='button-save-delete-popup' onClick={() => { handleEditTask() }}>Save</button> : dt.end_date}
                                                            </td>
                                                        }
                                                        <td className='td-style' style={{ textAlign: "end" }}>
                                                            <div>
                                                                <MoreVertIcon
                                                                    style={{ color: "grey", cursor: "pointer" }}
                                                                    onClick={(event) => handleOpenMenu(dt.id, event)}
                                                                />
                                                                <Menu
                                                                    elevation={2}
                                                                    anchorEl={anchorEl}
                                                                    anchorOrigin={{
                                                                        vertical: 'top',
                                                                        horizontal: 'left',
                                                                    }}
                                                                    transformOrigin={{
                                                                        vertical: 'top',
                                                                        horizontal: 'right',
                                                                    }}
                                                                    open={openMenus[dt.id] || false}
                                                                    onClose={() => handleCloseMenu(dt.id)}
                                                                >
                                                                    <MenuItem onClick={() => handleRename(dt)}>
                                                                        <ListItemIcon>
                                                                            <EditNoteRoundedIcon style={{ color: "#303b53" }} />
                                                                        </ListItemIcon>
                                                                        <div>
                                                                            <Typography variant="inherit">Rename</Typography>
                                                                        </div>
                                                                    </MenuItem>
                                                                </Menu>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        })}
                                        {state.dataTask.every(dt => !dt.flag_show) && (
                                            <tr>
                                                <td colSpan={7} className='td-style' style={{ textAlign: "center" }}>No Data Found</td>
                                            </tr>
                                        )}
                                    </tbody>
                                )
                                : (
                                    <tbody>
                                        <tr>
                                            <td colSpan={'7'} className='td-style' style={{ textAlign: "center" }}>No Data Found</td>
                                        </tr>
                                    </tbody>
                                )}
                        </table>
                    </div>
                </Grid>
                <Grid item xs={4} style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bottom: 0
                }}>
                    <Menu
                        anchorReference="none"
                        open={flaghideColumn}
                        onClose={handleCloseColumn}
                        PaperProps={{
                            style: {
                                position: 'fixed',
                                bottom: 0,
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: 'auto',
                                borderRadius: '8px',
                                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                            },
                        }}
                    >
                        <MenuItem style={{ width: "100%", }}>
                            <Grid container className='container-delete-popup'>
                                <Grid item className='selected-item'>
                                    <Typography variant='body2'>
                                        {dataDuplicate.filter((dt) => dt.flag_checked).length}
                                    </Typography>
                                    <Typography variant='body2'> Selected</Typography>
                                </Grid>
                                <Grid item className='dropdown-item'>
                                    <Select
                                        className='select-style-dropdown'
                                        sx={{
                                            width: '17vw',
                                            height: 35,
                                            border: '0',
                                            outline: 'none',
                                            color: "#858585",
                                            '& .MuiSelect-select': {
                                                padding: '8px 14px',
                                            },
                                            ".MuiOutlinedInput-notchedOutline": { border: 0 },
                                            "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                                            {
                                                border: '0',
                                            },
                                            "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                                            {
                                                border: '0',
                                            },
                                        }}
                                        value={selectedElement || 'select'}
                                        onChange={(e) => { handlePopupStatus(e.target.value) }}
                                        renderValue={(selected) => {
                                            const selectedStatus = state.dataStatus.find(status => status.id === selected);

                                            if (!selectedStatus) {
                                                return <span>Select</span>;
                                            }

                                            switch (selectedStatus.status) {
                                                case 'done':
                                                    return (
                                                        <div className='status-style-div'>
                                                            <DoneIcon style={{ color: "green" }} />
                                                            <span style={{ color: "green" }}>Done</span>
                                                        </div>
                                                    );
                                                case 'not started':
                                                    return (
                                                        <div className='status-style-div'>
                                                            <UpdateDisabledIcon style={{ color: "grey" }} />
                                                            <span style={{ color: "grey" }}>Not Started</span>
                                                        </div>
                                                    );
                                                case 'in progress':
                                                    return (
                                                        <div className='status-style-div'>
                                                            <RotateRightIcon style={{ color: "#3e53a9" }} />
                                                            <span style={{ color: "#3e53a9" }}>In Progress</span>
                                                        </div>
                                                    );
                                                default:
                                                    return null;
                                            }
                                        }}
                                    >
                                        <MenuItem value={'select'}>Select</MenuItem>
                                        {state.dataStatus.map((status, id) => {
                                            return (
                                                <MenuItem key={id} value={status.id}>
                                                    {/* {getStatusComponent(status)} */}
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
                                <Grid item className="delete-save-item">
                                    <DeleteOutlineIcon style={{ color: "#3e4246" }} onClick={() => { handleDelete() }} />
                                    <button className='button-save-delete-popup' onClick={() => { handleSave() }}>Save</button>
                                </Grid>
                            </Grid>
                        </MenuItem>
                    </Menu>
                </Grid>

            </Grid >
        </>
    );
}

export default TablePage;
// return a[columnNameEdit] > b[columnNameEdit] ? 1 : a[columnNameEdit] < b[columnNameEdit] ? -1 : a === b ? 0 : a === null || a === "Invalid Date" ? 1 : b === null || b === "Invalid Date" ? -1 : 1
// return a[columnNameEdit] < b[columnNameEdit] ? 1 : a[columnNameEdit] > b[columnNameEdit] ? -1 : a === b ? 0 : a === null || a === "Invalid Date" ? 1 : b === null || b === "Invalid Date" ? -1 : 1
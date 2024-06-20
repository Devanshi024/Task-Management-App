import React, { useState, useContext, useEffect } from 'react'
import { Grid, Button, Typography, Dialog, Divider } from '@mui/material'
import "../Css/SubHeader.css"
import { userData } from "../Context/dashboard-context"
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import TableRowsOutlinedIcon from '@mui/icons-material/TableRowsOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import NewTaskPopup from './NewTaskPopup';
import Menu from '@mui/material/Menu';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import AppsIcon from '@mui/icons-material/Apps';
import moment from 'moment';

function SubHeader({ setActive, active }) {
    const { state, setData, colNameToHide, setColNameToHide } = useContext(userData)
    const [flaghideColumn, flagSetHideColumn] = useState(false) //Open and close popup hideColumn
    const [flagOpen, flagSetOpen] = useState(false)//Open and close popup newTaskPpopup
    const [anchorEl, setAnchorEl] = useState(null);//anchorEl fro hideColumn
    const [anchorElColumnNewPopup, setanchorElColumnNewPopup] = useState(null);//anchorElColumnNewPopup for newTaskpopup
    const [lastDays, setLastDays] = useState('');
    const [localColNameToHide, setLocalColNameToHide] = useState(colNameToHide)
    console.log('colNameToHidecolNameToHidecolNameToHidecolNameToHide', colNameToHide, "localColNameToHide", localColNameToHide)

    // useEffect(() => {
    //     setLocalColNameToHide(colNameToHide)
    // }, [colNameToHide])

    // Handle Click for Hide Column List
    const handleClickColumn = (event) => {
        setanchorElColumnNewPopup(event.currentTarget);
        flagSetHideColumn(!flaghideColumn);
    };

    // Handle Close for Hide Column List
    const handleCloseColumn = () => {
        setanchorElColumnNewPopup(null);
        flagSetHideColumn(false);
    };

    // Handle Click to get the value For opening New Create table popup
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Handle Close to get the value For opening New Create table popup
    const handleClose = () => {
        setAnchorEl(null);
    };

    // Search List 
    const handleChange = (e) => {
        // console.log("setData", setData)
        let searchItem = e.target.value.toLowerCase();
        if (typeof searchItem !== 'string') {
            searchItem = '';
        }
        let dataList = state.dataTask.map((task) => {
            console.log(task, task.task_name)
            let taskName = typeof task.task_name === 'string' ? task.task_name : '';
            console.log(taskName, searchItem)
            if (taskName.toLowerCase().includes(searchItem)) {
                return {
                    ...task,
                    flag_show: true
                }
            } else {
                return {
                    ...task,
                    flag_show: false
                }
            }
        })
        setData(dataList)
    }

    // Opening newTask Popup
    const handlePopup = () => {
        flagSetOpen(true)
    }

    // Column name checked unchecked (OnChange)
    const handleColumn = (columnName) => {
        console.log("colNameToHide", colNameToHide)
        setLocalColNameToHide(prev => ({
            ...prev,
            [columnName]: !prev[columnName]
        }));
    }

    // save button click event after column checked and unchecked
    const handleSaveColumnsSub = () => {
        // handleSaveColumns();
        setColNameToHide(localColNameToHide);
        console.log("colNameToHide localColNameToHide after", colNameToHide)
        flagSetHideColumn(false);
    }

    const handleChangeDateFilter = (selectedValue) => {
        debugger;
        console.log("selectedValue", selectedValue)
        setLastDays(selectedValue);
        const today = new Date();

        if (selectedValue === 'select') {
            const allData = state.dataTask.map((task) => ({
                ...task,
                flag_show: true
            }))
            setData(allData)
        } else {
            let searchData = new Date(today);
            switch (selectedValue) {
                case "Last 30 days":
                    searchData = searchData.setDate(searchData.getDate() - 30);
                    break;

                case "Last 7 Days":
                    searchData = searchData.setDate(searchData.getDate() - 7);
                    break;

                case "Last 1 Days":
                    searchData = searchData.setDate(searchData.getDate() - 1);
                    break;

                default:
                    searchData = null;
                    break;
            }

            const filterData = state?.dataTask?.map((task) => {
                const dateTask = new Date(task.start_date)
                if (dateTask >= searchData && dateTask <= today) {
                    return {
                        ...task,
                        flag_show: true
                    }
                } else {
                    return {
                        ...task,
                        flag_show: false
                    }
                }
            })
            setData(filterData)
            searchData = null;
        }
    }

    useEffect(() => {
        console.log("active", active);
        console.log("localColNameToHide from subheader", localColNameToHide);
    }, [active, localColNameToHide])


    return (
        <Grid container xs={12} className='subHeader-main-container'>
            {flagOpen && (
                <Dialog
                    open={flagOpen}
                    onClose={() => flagSetOpen(false)}
                >
                    <NewTaskPopup
                        flagOpen={flagOpen}
                        flagSetOpen={flagSetOpen}
                    />
                </Dialog>
            )}
            <Grid item>
                <Grid container className='subh-board-conatiner'>
                    <Grid item className='sub-header-item-classes'>
                        <Grid container className={active === 'Board' ? 'subheader-active' : 'subheader-not-active'}>
                            <span><TableChartOutlinedIcon style={{ color: "#303b53" }} onClick={() => { setActive('Board') }} /></span>
                            <Typography onClick={() => { setActive('Board') }}>Board</Typography>
                        </Grid>
                    </Grid>
                    <Grid item className='sub-header-item-classes'>
                        <Grid container className={active === 'Table' ? 'subheader-active' : 'subheader-not-active'}>
                            <span><TableRowsOutlinedIcon style={{ color: "#303b53" }} onClick={() => { setActive('Table') }} /></span>
                            <Typography onClick={() => { setActive('Table') }}> Table</Typography>
                        </Grid>
                    </Grid>
                    {/* <Grid item className='sub-header-item-classes'>
                        <Grid container className={active === 'Add' ? 'subheader-active' : 'subheader-not-active'}>
                            <span onClick={() => {
                                setActive('Add')
                            }}><AddOutlinedIcon style={{ color: "#303b53" }} /></span>
                        </Grid>
                    </Grid> */}
                </Grid>
            </Grid>
            <Grid item>
                <Grid container className='subh-dropdown-container'>
                    <Grid item className='subheader-dropdown-item border-icon-style'>
                        <TableChartOutlinedIcon style={{ color: "#303b53", cursor: "pointer" }} onClick={handleClickColumn} />
                        <Menu
                            anchorEl={anchorElColumnNewPopup}
                            open={flaghideColumn}
                            onClose={handleCloseColumn}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                        >
                            {Object.keys(colNameToHide).map((columnName, index) => (
                                <MenuItem MwnuItem key={index} >
                                    <Grid container className='menu-hide-column'>
                                        <Grid item className='first-item-menu-hide-column'>
                                            <Checkbox
                                                className='checkbox-hide-column'
                                                checked={localColNameToHide[columnName]}
                                                onChange={() => handleColumn(columnName)}
                                            />
                                            <Typography className='typograph-style-hide-column'>{columnName}</Typography>
                                        </Grid>
                                        <Grid item style={{ display: "flex" }}>  <AppsIcon className='appicon-hide-column' /></Grid>
                                    </Grid>
                                </MenuItem>
                            ))}
                            <Divider />
                            <Grid container style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <button className='button-save-hide-column' onClick={handleSaveColumnsSub}>Save</button>
                            </Grid>
                        </Menu>
                    </Grid>
                    <Grid item className='subheader-dropdown-item'>
                        <Select
                            className='select-style-dropdown'
                            sx={{
                                width: 125,
                                height: 35,
                                borderRadius: 2,
                                outline: 'none',
                                color: "#000000",
                                '& .MuiSelect-select': {
                                    padding: '8px 14px',
                                },
                            }}
                            value={lastDays || 'select'}
                            onChange={(e) => handleChangeDateFilter(e.target.value)}
                        >
                            <MenuItem value={'select'}>Select</MenuItem>
                            <MenuItem value={'Last 30 Days'}>Last 30 Days</MenuItem>
                            <MenuItem value={'Last 7 Days'}>Last 7 Days</MenuItem>
                            <MenuItem value={'Last 1 Days'}>Last 1 Days</MenuItem>
                        </Select>
                    </Grid>

                    <Grid item className='subheader-search-item'>
                        <Grid container className='subheader-search-container'>
                            <Grid item className='subheader-search-icon'>
                                <span><SearchIcon style={{ color: "#b1a4a3" }} /></span>
                            </Grid>
                            <Grid className='subheader-search-input-bar'>
                                <input type='text' placeholder='Search' id="searchInput" onChange={(e) => handleChange(e)} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item >
                        <div>
                            <Button
                                variant="contained"
                                className='sub-header-button-style'
                                onClick={handleClick}
                            >
                                <AddOutlinedIcon /> New
                            </Button>
                            <Menu
                                elevation={20}
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={anchorEl}
                                flagOpen={anchorEl}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={() => {
                                    handlePopup()
                                    handleClose()
                                }}>
                                    <ListItemIcon>
                                        <TableRowsOutlinedIcon style={{ color: "#303b53" }} />
                                    </ListItemIcon>
                                    <div>
                                        <Typography variant="inherit">Create a new table</Typography>
                                        <Typography variant="body2" color="textSecondary">Create a new data table with Notion.</Typography>
                                    </div>
                                </MenuItem>
                            </Menu>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </Grid >
    )
}

export default SubHeader
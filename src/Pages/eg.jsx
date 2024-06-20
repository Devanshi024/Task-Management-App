import React, { useState, useContext } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TaskContext } from './TaskContext';
import dayjs from 'dayjs';

const NewTaskForm = ({ open, handleClose }) => {
    const { addTask } = useContext(TaskContext);

    const [formData, setFormData] = useState({
        taskName: '',
        people: '',
        status: '',
        priority: '',
        startDate: null,
        endDate: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleDateChange = (name, date) => {
        setFormData({
            ...formData,
            [name]: date,
        });
    };

    const handleAddTask = () => {
        addTask({
            ...formData,
            startDate: formData.startDate ? formData.startDate.format('YYYY-MM-DD') : '',
            endDate: formData.endDate ? formData.endDate.format('YYYY-MM-DD') : '',
        });
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>New Task</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Task Name"
                    type="text"
                    fullWidth
                    name="taskName"
                    value={formData.taskName}
                    onChange={handleChange}
                />
                <FormControl fullWidth margin="dense">
                    <InputLabel>People</InputLabel>
                    <Select
                        name="people"
                        value={formData.people}
                        onChange={handleChange}
                    >
                        {/* Replace with your dynamic list of people */}
                        <MenuItem value={'Person 1'}>Person 1</MenuItem>
                        <MenuItem value={'Person 2'}>Person 2</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="dense">
                    <InputLabel>Status</InputLabel>
                    <Select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <MenuItem value={'Not Started'}>Not Started</MenuItem>
                        <MenuItem value={'In Progress'}>In Progress</MenuItem>
                        <MenuItem value={'Done'}>Done</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="dense">
                    <InputLabel>Priority</InputLabel>
                    <Select
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                    >
                        <MenuItem value={'Low'}>Low</MenuItem>
                        <MenuItem value={'Medium'}>Medium</MenuItem>
                        <MenuItem value={'High'}>High</MenuItem>
                    </Select>
                </FormControl>
                <DatePicker
                    label="Start Date"
                    value={formData.startDate}
                    onChange={(date) => handleDateChange('startDate', date)}
                    renderInput={(params) => <TextField {...params} margin="dense" fullWidth />}
                />
                <DatePicker
                    label="End Date"
                    value={formData.endDate}
                    onChange={(date) => handleDateChange('endDate', date)}
                    renderInput={(params) => <TextField {...params} margin="dense" fullWidth />}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleAddTask}>Add Task</Button>
            </DialogActions>
        </Dialog>
    );
};

export default NewTaskForm;
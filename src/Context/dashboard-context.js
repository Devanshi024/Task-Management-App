import { createContext, useReducer, useState } from "react";
export const userData = createContext();

const initialState = {
    dataTask: [{
        "id": 1,
        "task_name": "CDesign Homepage",
        "task_comment": "Initial design phase",
        "assigned_employees": [1, 2, 4, 6, 5],
        "status": 3,
        "priority": 1,
        "start_date": "2024-08-01",
        "end_date": "2024-06-15",
        "flag_show": true,
        "flag_checked": false

    },
    {
        "id": 2,
        "task_name": "Develop Backend",
        "task_comment": "",
        "assigned_employees": [3, 4],
        "status": 2,
        "priority": 2,
        "start_date": "2024-06-05",
        "end_date": "2024-07-01",
        "flag_show": true,
        "flag_checked": false
    },
    {
        "id": 3,
        "task_name": "ATest Application",
        "task_comment": "Ensure all functionalities are tested",
        "assigned_employees": [5, 6],
        "status": 1,
        "priority": 3,
        "start_date": "2024-07-02",
        "end_date": "2024-07-10",
        "flag_show": true,
        "flag_checked": false
    }],
    dataStatus: [
        {
            "id": 1,
            "status": "done"
        },
        {
            "id": 2,
            "status": "not started"
        },
        {
            "id": 3,
            "status": "in progress"
        }
    ],
    dataPriority: [
        {
            "id": 1,
            "priority": "high"
        },
        {
            "id": 2,
            "priority": "medium"
        },
        {
            "id": 3,
            "priority": "low"
        }
    ],
    dataEmployees: [
        {
            "id": 1,
            "first_name": "Alice",
            "last_name": "Smith",
            "image": "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
        },
        {
            "id": 2,
            "first_name": "Bob",
            "last_name": "Johnson",
            "image": "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHVzZXJ8ZW58MHx8MHx8fDA%3D"
        },
        {
            "id": 3,
            "first_name": "Charlie",
            "last_name": "Brown",
            "image": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHVzZXJ8ZW58MHx8MHx8fDA%3D"
        },
        {
            "id": 4,
            "first_name": "Dana",
            "last_name": "White",
            "image": "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHVzZXJ8ZW58MHx8MHx8fDA%3D"
        },
        {
            "id": 5,
            "first_name": "Eve",
            "last_name": "Davis",
            "image": "https://plus.unsplash.com/premium_photo-1669882305273-674eff6567af?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
        },
        {
            "id": 6,
            "first_name": "Frank",
            "last_name": "Miller",
            "image": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
        }
    ]

}

const reducer = (state, action) => {
    switch (action.type) {
        case "GET_ALL_DATA": {
            return {
                ...state,
                dataTask: action.payload
            }
        }
        case 'ADD_TASK': {
            const exisitingItem = state.dataTask.findIndex(item => item.id === action.payload.id)
            console.log("exisitingItem", exisitingItem)
            return {
                ...state,
                dataTask: [...state.dataTask, action.payload]
            }
        }
        default:
            return state;
    }
}
const setData = (dispatch) => (data) => {
    dispatch({
        type: "GET_ALL_DATA",
        payload: data
    })
    console.log("updatedData", data)
}
const addTask = (dispatch) => (task) => {
    dispatch({
        type: "ADD_TASK",
        payload: { ...task }
    });
}
export const UserDataProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [colNameToHide, setColNameToHide] = useState({
        'task_name': true,
        'assigned': true,
        'status': true,
        'priority': true,
        'start_date': true,
        'end_date': true
    })
    console.log("localColNameToHide from subheader dashboard", colNameToHide)
    const payload = {
        state,
        colNameToHide,
        setColNameToHide,
        setData: setData(dispatch),
        addTask: addTask(dispatch)
    };

    return (
        <userData.Provider value={payload}>
            {children}
        </userData.Provider>
    );
};

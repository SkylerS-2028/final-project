import { useState } from 'react';
import { useEffect } from 'react';
import './ToDoList.css';

function ToDoList(){
    
    // Task information
    const [tasks, setTasks] = useState(
        {
            title:["Make your first task!"],
            description:["Welcome to your very own to-do list and planner! To make your first task, fill in the information above and click add! "], 
            due:["N/A"],
            hours:[0]
        }
    );

    // New task information placeholders
    const [newTask, setNewTask] = useState ("");
    const [newDescr, setNewDescr] = useState("");
    const [newDue, setNewDue] = useState("");
    const [newHour, setNewHour] = useState(0);
    const [noTasks, setNoTasks] = useState(false) 

    // Productivity information
    const [completed, setCompleted] = useState(0);
    const [finishedHours, setFinishedHours] = useState(0);
    const [totalHours, setTotalHours] = useState(0);

    // Planner useState
    const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    const [showOptions, setShowOptions] = useState(false);
    const [scheduled, setScheduled] = useState({
        monday:[],
        tuesday:[],
        wednesday:[],
        thursday:[],
        friday:[],
        saturday:[],
        sunday:[]
    });
 
    // To-do list functions
    function changeHours(index){
        if (newHour !== "" && newHour !== 0){
            console.log(newHour);
            const updatedHours = [...tasks.hours];
            updatedHours[index] = Number(newHour);
            console.log(updatedHours);
            setTasks(prev => ({
                ...prev,
                hours: updatedHours,
            }))

            let total = finishedHours;
            for (let value of updatedHours){
            total += value;
            }
            setTotalHours(total);
            setNewHour(0)
        }
    }

    function addTask(){
        if(newTask.trim() !== "" && newDescr.trim() !== "" && newDue !== ""){

            setTasks(prev => ({
                title: [...prev.title, newTask],
                description: [...prev.description, newDescr],
                due:[...prev.due, newDue],
                hours: [...prev.hours, 0]
            }));

            setNewTask("");
            setNewDescr("");
            setNewDue("");

            /*setNoTasks(false);*/

            }
    }

    function deleteItem(index){

        const updatedTasks = tasks.title.filter((element, i) => i !== index);
        const updatedDescription = tasks.description.filter((element, i) => i !== index);
        const updatedDates = tasks.due.filter((element, i) => i !== index);
        const updatedHours = tasks.hours.filter((element, i) => i !== index);

        let updatedSchedule = {...scheduled};
        for (const day of Object.keys(updatedSchedule)){
            updatedSchedule[day] = updatedSchedule[day].filter((task) => task !== tasks.title[index]);
        }
        setScheduled(updatedSchedule)

        setTasks({
            title: updatedTasks,
            description: updatedDescription,
            due: updatedDates,
            hours: updatedHours
        });
        
        let total = finishedHours;
        for (let value of updatedHours){
            total += value;
        }
        setTotalHours(total);


        if(updatedTasks.length === 0){
            setNoTasks(true);
        }
    }

    function completeItem(index){

        const updatedTasks = tasks.title.filter((element, i) => i !== index);
        const updatedDescription = tasks.description.filter((element, i) => i !== index);
        const updatedDates = tasks.due.filter((element, i) => i !== index);
        const updatedHours = tasks.hours.filter((element, i) => i !== index);

        setFinishedHours(finishedHours + Number(tasks.hours[index]));

        let updatedSchedule = {...scheduled};
        for (const day of Object.keys(updatedSchedule)){
            updatedSchedule[day] = updatedSchedule[day].filter((task) => task !== tasks.title[index]);
        }
        setScheduled(updatedSchedule)

        setTasks({
            title: updatedTasks,
            description: updatedDescription,
            due: updatedDates,
            hours: updatedHours
        });

        setCompleted(completed + 1);
        
        if(updatedTasks.length === 0){
            setNoTasks(true);
        }
    }

    // Keeps track of task object in the console
    useEffect(() => {
        console.log(tasks);
    }, [tasks])

    // Planner functions
    function scheduleTask(day, task, checked){
        setScheduled(prev => ({
            ...prev,
            [day]: checked
                ? [...prev[day], task]
                : prev[day].filter(checked => (checked !== task))
        }))
    }
    
    

    // HTML
    return(  
        <div className = 'total-content'>
        <div className = 'list-display' >
            <div className='productivity-information'>
                <p>Completed Tasks: {completed}</p>
                <p>Total Hours: {totalHours} </p>
            </div>
            <h1>To-Do List</h1>

            <div>

                <input
                type="text"
                placeholder="Enter task title"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                />

                <input
                type="text"
                placeholder="Enter task description"
                value={newDescr}
                onChange={(e) => setNewDescr(e.target.value)}
                />

                <input
                type="date"
                placeholder="Enter due date"
                onChange={(e) => setNewDue(e.target.value)}
                />

                <button id="add-button" onClick={addTask}>Add</button>

            </div>

            <p style={{ marginTop: '40px', }}>{noTasks ? "No tasks to complete!" : ""}</p>

            <ol>
                {tasks.title.map((task, index) => 

                <li className='list-item' key={index}>
                    <div className='task-content'>
                        <p style={{ color: 'black', fontWeight: 'bold', paddingTop: '20px' }}>{task}</p>
                        <p>{tasks.description[index]}</p>
                        <p>Due: {tasks.due[index]}</p>
                        <input
                        type="number"
                        placeholder="Current hours"
                        id="hours"
                        onChange={(e) => setNewHour(e.target.value)}
                        />
                        <button onClick={() => changeHours(index)}>Update Hours</button>
                    </div>
                    <div className='remove-buttons'>
                        <button id='delete-task' onClick={() => deleteItem(index)}>✗</button>
                        <button id='complete-task' onClick={() => completeItem(index)}>✓</button>
                    </div>
                </li>
            
                )}
            </ol>
        </div>
        <div className = 'planner-display'>
            <h1>Planner</h1>
            <button onClick={() => setShowOptions(!showOptions)}>{showOptions ? "Hide Scheduling Options" : "Show Scheduling Options"}</button>
            <p style={{marginTop: '40px', }}>{noTasks ? "No tasks to schedule or complete!" : ""}</p>
                <table>
                <tr>
                    <th>Monday</th>
                    <th>Tuesday</th>
                    <th>Wednesday</th>
                    <th>Thursday</th>
                    <th>Friday</th>
                    <th>Saturday</th>
                    <th>Sunday</th>
                </tr>
                <tr className='schedule-options'>
                    {days.map((day, i) => 
                        <td key={i}>
                            {showOptions && (tasks.title.map((label, index) => 
                                <label className='task-check' key={index}>
                                    <input
                                        type="checkbox"
                                        value = {label}
                                        checked={scheduled[day].includes(label)}
                                        onChange={(e) => scheduleTask(day, label, e.target.checked)}
                                    />
                                    <span>{label}<br/></span>
                                </label>))}
                        </td>
                    )}
                </tr>
                <tr className='scheduled'>
                    {days.map((day,i) => 
                    <td index = {i}>
                        {scheduled[day].map((task, index) =>
                        <li className='scheduled-list-item' key={index}>
                            <p>{task}</p>
                        </li>
                        )}
                    </td>
                    )}
                </tr>
                </table>
        </div>
        </div>
    );
}

export default ToDoList;
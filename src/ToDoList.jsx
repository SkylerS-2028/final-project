import { useState } from 'react';
import './ToDoList.css';

/*
Features to add:
- Scheduling/ planner aspect
- Hours of productivity 
*/

function ToDoList(){
    
    // Task information
    const [tasks, setTasks] = useState(
        {
            title:["Final Project"],
            description:["This is your opportunity to showcase what you’ve learned and to stretch your creativity and problem solving skills. Your project should reflect your understanding of modern JavaScript programming and its integration into the web development ecosystem."], 
            due:["2026-7-31"],
            hours:[0]
        }
    );

    // New task information placeholders
    const [newTask, setNewTask] = useState ("");
    const [newDescr, setNewDescr] = useState("");
    const [newDue, setNewDue] = useState("");

    // Productivity information
    const [completed, setCompleted] = useState(0);
    //const [finishedHours, setFinishedHours] = useState(0);
    //const [progressHours, setProgressHours] = useState(0);
 
    // Functions
        function changeHours(){
            console.log(tasks);
            setTasks()
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

            }
        }

        function deleteItem(index){

            const updatedTasks = tasks.title.filter((element, i) => i !== index);
            const updatedDescription = tasks.description.filter((element, i) => i !== index);
            const updatedDates = tasks.due.filter((element, i) => i !== index);

            setTasks({
                title: updatedTasks,
                description: updatedDescription,
                due: updatedDates,
            });

        }

        function completeItem(index){

            const updatedTasks = tasks.title.filter((element, i) => i !== index);
            const updatedDescription = tasks.description.filter((element, i) => i !== index);
            const updatedDates = tasks.due.filter((element, i) => i !== index);

            setTasks({
                title: updatedTasks,
                description: updatedDescription,
                due: updatedDates,
            });

            setCompleted(completed + 1);
        }

    // HTML
    return(  
        <div className = 'list-display' >
            <div className='productivity-information'>
                <p>Completed Tasks: {completed}</p>
                <p>Total Hours: </p>
            </div>
            <h1>List</h1>

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
                        onChange={changeHours}
                        />
                    </div>
                    <div className='remove-buttons'>
                        <button id='delete-task' onClick={() => deleteItem(index)}>✗</button>
                        <button id='complete-task' onClick={() => completeItem(index)}>✓</button>
                    </div>
                </li>)}
            </ol>
        </div>
    );
}

export default ToDoList;
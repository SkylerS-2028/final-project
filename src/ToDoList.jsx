import { useState } from 'react';
import { useEffect } from 'react';
import './ToDoList.css';

/*
Features to add:
- Scheduling/ planner aspect
*/


function ToDoList(){
    
    // Task information
    const [tasks, setTasks] = useState(
        {
            title:["Final Project", "Sample Task"],
            description:["This is your opportunity to showcase what you’ve learned and to stretch your creativity and problem solving skills. Your project should reflect your understanding of modern JavaScript programming and its integration into the web development ecosystem.", "Sample task description"], 
            due:["2026-7-31", "2026-09-13"],
            hours:[0, 0]
        }
    );

    // New task information placeholders
    const [newTask, setNewTask] = useState ("");
    const [newDescr, setNewDescr] = useState("");
    const [newDue, setNewDue] = useState("");
    const [newHour, setNewHour] = useState(0);
    //const [noTasks, setNoTasks] = useState(false)

    // Productivity information
    const [completed, setCompleted] = useState(0);
    const [finishedHours, setFinishedHours] = useState(0);
    const [totalHours, setTotalHours] = useState(0);
 
    // Functions
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

            console.log(tasks);
            /*setNoTasks(false);*/

            }
    }

    function deleteItem(index){

        const updatedTasks = tasks.title.filter((element, i) => i !== index);
        const updatedDescription = tasks.description.filter((element, i) => i !== index);
        const updatedDates = tasks.due.filter((element, i) => i !== index);
        const updatedHours = tasks.hours.filter((element, i) => i !== index);

        setTasks({
            title: updatedTasks,
            description: updatedDescription,
            due: updatedDates,
            hours: updatedHours
        });
        
        /*if(tasks.title.length() === 0){
            setNoTasks(true);
        }*/
    }

    function completeItem(index){

        const updatedTasks = tasks.title.filter((element, i) => i !== index);
        const updatedDescription = tasks.description.filter((element, i) => i !== index);
        const updatedDates = tasks.due.filter((element, i) => i !== index);
        const updatedHours = tasks.hours.filter((element, i) => i !== index);

        setFinishedHours(finishedHours + Number(tasks.hours[index]));

        setTasks({
            title: updatedTasks,
            description: updatedDescription,
            due: updatedDates,
            hours: updatedHours
        });

        setCompleted(completed + 1);
        /*if(tasks.title.length() === 0){
            setNoTasks(true);
        }*/
    }

    useEffect(() => {
        console.log(tasks);
    }, [tasks])

    // HTML
    return(  
        <div className = 'list-display' >
            <div className='productivity-information'>
                <p>Completed Tasks: {completed}</p>
                <p>Total Hours: {totalHours} </p>
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

            <p>{/*noTasks ? "No tasks to complete!" : ""*/}</p>

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
    );
}

export default ToDoList;
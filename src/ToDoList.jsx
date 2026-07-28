import { useState } from 'react'

function ToDoList(){
    const [tasks, setTasks] = useState(
        {
            title:[],
            description:[], 
            due:[],
        }
    );

    const [newTask, setNewTask] = useState ("");
    const [newDescr, setNewDescr] = useState("");
    const [newDue, setNewDue] = useState("");

    const [completed, setCompleted] = useState(0);

        function addTask(){
            if(newTask.trim() !== "" && newDescr.trim() !== "" && newDue !== ""){

                setTasks(prev => ({
                    title: [...prev.title, newTask],
                    description: [...prev.description, newDescr],
                    due:[...prev.description, newDue]
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

    return(  
        <div>
            <p>Completed Tasks: {completed}</p>
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

                <button onClick={addTask}>Add</button>
            </div>

            <ol>
                {tasks.title.map((task, index) => 
                <li key={index}>
                    <span>{task}</span>
                    <span>{tasks.description[index]}</span>
                    <span>{tasks.due[index]}</span>
                    <button onClick={() => deleteItem(index)}>Delete</button>
                    <button onClick={() => completeItem(index)}>Complete</button>
                </li>)}
            </ol>
        </div>
    );
}

export default ToDoList;
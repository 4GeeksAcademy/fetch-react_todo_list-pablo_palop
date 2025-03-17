import React, { useState } from "react";
import { todoListService } from "../services/todoListService";

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [hover, setHover] = useState(null);
    const [userInput, setUserInput] = useState("");

    const inputChange = (e) => {
        setNewTask(e.target.value);
    };

    const enterKeyDown = (e) => {
        if (e.key === "Enter" && newTask.trim() !== "") {
            setTasks([...tasks, newTask]);
            setNewTask("");
        }
    };

    const deleteTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };


    const handleOnSubmit = async (e) => {
        e.preventDefault()
        try {
            await todoListService.createUser(userInput)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className="d-flex justify-content-center text-primary">
                <form onSubmit={handleOnSubmit}>
                    <h4>User Name</h4>
                    <input
                        className=""
                        type="text"
                        value={userInput}
                        onChange={(e) => {
                            setUserInput(prevUserInput => {
                                return { ...prevUserInput, "name": e.target.value }
                            })
                        }}
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div className="d-flex justify-content-center text-primary">
                <h1>To Do</h1>
            </div>
            <div className="card border-0">
                <div className="card-body">

                    <input
                        className="border-0"
                        type="text"
                        name="item"
                        id="todoItem"
                        value={newTask}
                        placeholder="Añadir tarea"
                        onChange={inputChange}
                        onKeyDown={enterKeyDown}
                    />

                    <ul className="list-group mt-3 border-bottom">
                        {tasks.length === 0 ? (
                            <li className="list-group-item text-muted">No hay tareas, añadir tareas</li>
                        ) : (
                            tasks.map((task, index) => (
                                <li key={index}
                                    className="list-group-item d-flex justify-content-between align-items-center border-bottom"
                                    onMouseEnter={() => setHover(index)}
                                    onMouseLeave={() => setHover(null)}
                                >
                                    {task}
                                    {hover === index && (
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => deleteTask(index)}
                                        >
                                            ❌
                                        </button>
                                    )}
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TodoList;
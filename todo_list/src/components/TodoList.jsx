import React, { useEffect, useState } from "react";
import { todoListService } from "../services/todoListService";

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [userInput, setUserInput] = useState("");
    const [formSubmitted, setFormSubmitted] = useState(false);

    useEffect(() => {
        if(formSubmitted){
            fetchTasks();
        }
    }, [formSubmitted])

    const fetchTasks = async () => {
        try{
            const data = await todoListService.getTasks(userInput);
            setTasks(data);
        }catch(error){
            console.error(error);
        }
    }

    const handleDeleteTask = async (taskId) => {
        try {
            await todoListService.deleteTask(userInput, taskId);
            setTasks(tasks.filter(task => task.id !== taskId)); // Actualización selectiva
        } catch (error) {
            console.error(error);
        }
    };

    const handleCreateTask = async () => {
        try {
            const createdTask = await todoListService.createTask(userInput, newTask);
            setTasks([...tasks, newTask]);
            setNewTask("");
        } catch (error) {
            console.log(error);
        }
    };


    const handleCreateUser = async () => {
        try {
            await todoListService.createUser(userInput);
            setFormSubmitted(true);
        } catch (error) {
            console.log(error);
            setFormSubmitted(true);
        }
    };

    const handleClearAll = async () => {
        try {
            await todoListService.clearAllTasks(userInput);
            setTasks([]);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-center text-primary">
                <form>
                    <label htmlFor="userName" className="form-label">Ingresa el nombre del usuario: </label>
                    <input
                        id="userName"
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Nombre de usuario"
                    />
                    <button type="button" onClick={handleCreateUser}>Submit</button>
                </form>
            </div>
            {formSubmitted && (
                <>
                    <div>
                        <input
                            type="text"
                            placeholder="Nueva tarea"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                        />
                        <button onClick={handleCreateTask}>Agregar Tarea</button>
                        <button onClick={handleClearAll}>Limpiar todas las tareas</button>
                    </div>
                    <ul>
                        {tasks.map((task, index) => (
                            <li key={index}>
                                {task.label}
                                <button onClick={() => handleDeleteTask(task.id)}>Eliminar</button>
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleClearAll}>Limpiar todas las tareas</button>
                </>
            )}
        </div>
    );
};

export default TodoList;
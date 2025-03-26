import React, { useEffect, useState } from "react";
import { todoListService } from "../services/todoListService";

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [userInput, setUserInput] = useState("");
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [editTask, setEditTask] = useState(null);


    useEffect(() => {
        if (formSubmitted) {
            getTasks();
        }
    }, [formSubmitted])

    const getTasks = async () => {
        try {
            const data = await todoListService.getTasks(userInput);
            setTasks(data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleDeleteTask = async (taskId) => {
        try {
            await todoListService.deleteTask(taskId);
            setTasks(tasks.filter(task => task.id !== taskId));
        } catch (error) {
            console.error(error);
        }
    };

    const handleCreateTask = async () => {
        try {
            const createdTask = await todoListService.createTask(userInput, newTask);
            setTasks([...tasks, createdTask]);
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
            getTasks();
        }
    };

    const handleClearAll = async () => {
        try {
            await Promise.all(
                tasks.map(task => todoListService.deleteTask(task.id))
            );
            setTasks([]);
        } catch (error) {
            console.error("Error eliminando todas las tareas:", error);
        }
    };


    const handleEditTask = async () => {
        try {
            const updatedTask = {
                label: newTask,
                is_done: false
            };
            await todoListService.updateTask(editTask, updatedTask);
            const updatedTasks = tasks.map(task =>
                task.id === editTask ? { ...task, label: newTask } : task
            );
            setTasks(updatedTasks);
            setEditTask(null);
            setNewTask("");
        } catch (error) {
            console.error("Error editando tarea:", error);
        }
    };

    const handleEditClick = (task) => {
        setNewTask(task.label);
        setEditTask(task.id);
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
                            placeholder="Escribe la tarea"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                        />
                        {editTask ? (
                            <button className="btn btn-warning" onClick={handleEditTask}>
                                Editar Tarea
                            </button>
                        ) : (
                            <button className="btn btn-primary" onClick={handleCreateTask}>
                                Agregar Tarea
                            </button>
                        )}
                    </div>
                    <ul>
                        {tasks.map((task, index) => (
                            <li key={index}>
                                {task.label}
                                <button className="btn btn-outline-secondary btn-sm me-2" onClick={() => handleEditClick(task)}>
                                    Editar
                                </button>
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
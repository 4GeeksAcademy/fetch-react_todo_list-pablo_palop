import React, { useState } from "react";
import { todoListService } from "../services/todoListService";

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [userInput, setUserInput] = useState("");
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [editedTaskLabel, setEditedTaskLabel] = useState("");

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
            <div>
                <input
                    type="text"
                    placeholder="Nueva tarea"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
                <button onClick={handleCreateTask}>Agregar Tarea</button>
            </div>
            <ul>
            {tasks.map((task, index) => (
                            <li key={index}>
                                {editingTask === task.id ? (
                                    <>
                                        <input
                                            type="text"
                                            value={editedTaskLabel}
                                            onChange={(e) => setEditedTaskLabel(e.target.value)}
                                        />
                                        <button onClick={() => handleUpdateTask(task.id)}>Guardar</button>
                                        <button onClick={() => setEditingTask(null)}>Cancelar</button>
                                    </>
                                ) : (
                                    <>
                                        {task.label}
                                        <button onClick={() => handleEditTask(task)}>Editar</button>
                                        <button onClick={() => handleDeleteTask(task.id)}>Eliminar</button>
                                    </>
                                )}
                            </li>
                        ))}
            </ul>
        </div>
    );
};

export default TodoList;
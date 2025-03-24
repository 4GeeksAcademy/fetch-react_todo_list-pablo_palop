const baseUrlUsers = "https://playground.4geeks.com/todo/users/"
const baseUrlTodos = "https://playground.4geeks.com/todo/todos/"

export const todoListService = {
    createUser: async (userName) => {
        try {
            const request = await fetch(`${baseUrlUsers}${userName}`, {
                method: "POST",
                headers: {
                    'accept': 'application/json',
                    "Content-Type": "application/json"
                },
                body: JSON.stringify()
            })
            if (!request.ok) throw new Error("Error creando usuario");
            const response = await request.json();
            return response

        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    getUser: async (userName) => {
        try {
            const request = await fetch(`${baseUrlUsers}${userName}`, {
                headers: {
                    'accept': 'application/json',
                    "Content-Type": "application/json"
                },
                body: JSON.stringify()
            })
            if (!request.ok) throw new Error("Error buscando el usuario");
            const response = await request.json();
            return response

        } catch (error) {
            console.log(error);
        }
    },

    createTask: async (userName, taskLabel) => {
        try {
            const newTask = {
                label: taskLabel,
                is_done: false
            };
            const request = await fetch(`${baseUrlTodos}${userName}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'accept': 'application/json'
                },
                body: JSON.stringify(newTask),
            });

            if (!request.ok) throw new Error("Error creando la tarea");

            const response = await request.json();
            return response;
        } catch (error) {
            console.error(error);
        }
    },

    getTasks: async (userName) => {
        try {
            const response = await fetch(`${baseUrlUsers}${userName}`, {
                headers: {
                    'accept': 'application/json',
                    "Content-Type": "application/json"
                }
            })
            if (!response.ok) throw new Error("Error obteniendo las tareas");
            const data = await response.json();
            return data.todos;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    updateTask: async (userName, taskId, updatedTask) => {
        try {
            const request = await fetch(`${baseUrlTodos}${taskId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'accept': 'application/json'
                },
                body: JSON.stringify(updatedTask),
            });

            if (!request.ok) throw new Error("Error actualizando la tarea");
            const response = await request.json();
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    
    deleteTask: async (taskId) => {
        try {
            const request = await fetch(`${baseUrlTodos}${taskId}`, {
                method: "DELETE",
                headers: {
                    'accept': 'application/json',
                    "Content-Type": "application/json"
                },
            });

            if (!request.ok) throw new Error("Error eliminando la tarea");
            return true;
        } catch (error) {
            console.log(error);
        }
    }
}
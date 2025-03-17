const baseUrl = "https://playground.4geeks.com/todo/users/"

export const todoListService = {
    createUser: async (userName) => {
        try {
            const request = await fetch(`${baseUrl}${userName}`, {
                method: "POST",
                headers: {
                    'accept': 'application/json'
                },
                body: JSON.stringify()
            })
            if(!request.ok) throw new Error("Error creando usuario");
            const response = await request.json();
            return response

        } catch (error) {
            console.log(error);
        }
    }
}
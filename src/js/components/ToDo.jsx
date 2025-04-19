import React, { useState, useEffect } from "react";

const ToDos = () => {

    const [input, setInput] = useState("");
    const [tareas, setTareas] = useState([]);

    const createUser = () => {
        fetch('https://playground.4geeks.com/todo/users/Elias', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        })
            .then((response) => {
                if (response.status === 400 || response.status === 409) {
                    console.warn("Usuario ya existe.");
                    return;
                }
                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Respuesta del servidor:', data);
            })
            .catch((error) => {
                console.error('Usuario Creado:', error);
            });
    };

    useEffect(() => {
        createUser();
        getToDo();
    }, []);

    const getToDo = () => {
        fetch('https://playground.4geeks.com/todo/users/Elias')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }
                return response.json();
            })
            .then((data) => {
                setTareas(data.todos)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            if (input.trim() === "" || tareas.some(t => t.label === input.trim())) { 
                alert("Estas intentando agregar una tarea existente o campo vacio.");
                return;
            }
            

            
            setInput("");

            fetch('https://playground.4geeks.com/todo/todos/Elias', {
                method: "POST",
                body: JSON.stringify({ 
                    label: input.trim(), 
                    done: false }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(resp => {
                    console.log(resp.ok);
                    console.log(resp.status);
                    return resp.json();
                })
                .then(data => {
                    getToDo()
                    console.log(data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };
    const tareaDelete = (id) => {

        setTareas(prev => prev.filter(t => t.id !== id)); //Borrar en el front de una vez

        fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(resp => {
                console.log(resp.ok);
                console.log(resp.status);
                return resp.json();
            })
            .then(data => {
                getToDo()
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const clearAllTasks = () => {
        fetch('https://playground.4geeks.com/todo/users/Elias', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify([{
                label: "Limpiar lista",
                done: true
            }])
        })
            .then(resp => {
                console.log(resp.ok);
                console.log(resp.status);
                return resp.json();
            })
            .then(data => {
                console.log("Todas las tareas han sido eliminadas:", data);
                setTareas([]);
            })
            .catch(error => {
                console.error("Error al borrar todas las tareas:", error);
            });
    };

    

    return (
        <div className="container">
            <input
                className="p-1"
                type="text"
                onChange={(e) => setInput(e.target.value)}
                placeholder="¿Qué haremos hoy?"
                value={input}
                onKeyDown={handleKeyDown}
            />
            {/* <button type="button" className="btn btn-outline-dark btn-sm m-1" onClick={handleButton}>Agregar</button> */}

            <div className="list-group mt-3">
                {tareas.length === 0 ? (
                    <h2 className="text-center">No hay tareas pendientes🎉</h2>
                ) : (
                    tareas.map((tarea) => (
                        <div className="d-flex" key={tarea.id}>
                            <a href="#" className="list-group-item list-group-item-action list-group-item-light">
                                {tarea.label}
                            </a>
                            <button
                                type="button"
                                className="btn btn-outline-danger btn-sm m-1"
                                onClick={() => tareaDelete(tarea.id)}
                            >
                                ❌
                            </button>

                        </div>
                    ))
                )}
            </div>
            {tareas.length > 0 && (
                <button
                    type="button"
                    className="btn btn-outline-danger btn-sm m-1"
                    onClick={clearAllTasks}
                >
                    Limpiar Lista
                </button>
            )}
        </div>
    );
};

export default ToDos;

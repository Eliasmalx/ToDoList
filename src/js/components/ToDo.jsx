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
                data.todos;
             setTareas(data.todos)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            if (tareas.includes(input.trim())) {
                alert("Ya esta en la lista.");
                return;
            }

            let VarTareas = { label: input.trim(), done: false };
            setInput("");

            fetch('https://playground.4geeks.com/todo/todos/Elias', {
                method: "POST",
                body: JSON.stringify(VarTareas),
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

    // const handleDelete = (delTarea) => {
    //     setTareas(tareas.filter((item) => item !== delTarea));
    // }; sirve para borrar solo en el front

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
                    tareas.map((tarea, index) => (
                        <div className="d-flex" key={index}>
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
            {/* <button onClick={getToDo}>prueba</button> */}
        </div>
    );
};

export default ToDos;

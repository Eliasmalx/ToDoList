import React, { useState } from "react";

const ToDos = () => {

    const [input, setInput] = useState("");
    const [tareas, setToDos] = useState([])

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {

            if (tareas.includes(input.trim())) {
                alert("Ya esta en la lista")
            } else {

                setToDos([...tareas, input.trim()])
                setInput("");
            }
        }
    }

    const handleDelete = (delTarea) => {
        setToDos(tareas.filter((item) => item != delTarea));
    };

    return (
        <div className="container">
            <input className="p-1" type="text" onChange={(e) => setInput(e.target.value)} placeholder=" Que haremos hoy?" value={input} onKeyDown={e => handleKeyDown(e)} />
            {/* <button type="button" className="btn btn-outline-dark btn-sm m-1" onClick={handleButton}>Agregar</button> */}

            <div className="list-group mt-3">
                {tareas.length === 0 ? (
                    <h2 className="text-center">No hay tareas pendientes🎉</h2>)
                    : (
                        tareas.map((tarea, index) => <div className="d-flex" key={index}>
                            <a href="#" className="list-group-item list-group-item-action list-group-item-light">
                                {tarea}
                            </a>
                            <button type="button" className="btn btn-outline-danger btn-sm m-1" onClick={() => handleDelete(tarea)}>
                                ❌
                            </button>
                        </div>)
                    
            )}

            </div>
        </div>

    );
};

export default ToDos;
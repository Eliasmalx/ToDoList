import React from "react";
import ToDos from "./ToDo";

const Home = () => {
	return (
		<div className=" bg-info text-center">
			<h1 className="text-white">Tareas</h1>
			<ToDos />

		</div>
	);
};

export default Home;